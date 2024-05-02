from flask import Blueprint, request, jsonify, send_file
import pandas as pd
import io
import io
import pickle
from src.utils import load_data
from src.models import implement_model

models_bp = Blueprint('models_bp', __name__)

# Avoid using global variables whenever possible
df = pd.DataFrame()
target_column_global = None
model = None

@models_bp.route('/upload_models', methods=['POST'])
def upload_file():
    global df
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        try:
            # Load data and receive column names
            df = load_data(file, df)
            columns = df.columns.tolist()
            print(df)
        except ValueError as e:
            return jsonify({'error': str(e)}), 400

        # Include column names in the response
        return jsonify({'message': 'File processed successfully', 'total_columns': columns}), 200

@models_bp.route('/target_column', methods=['POST'])
def select_target_column():
    data = request.json
    target_column = data.get("target_column")
    if not target_column:
        return jsonify({'error': 'Target column not provided'}), 400

    global target_column_global
    target_column_global = target_column

    return jsonify({'message': 'Target column set successfully.'}), 200

@models_bp.route('/model_implem', methods=['POST'])
def model_implem():
    data = request.json
    algorithm = data.get('algorithm')
    if not algorithm:
        return jsonify({'error': 'Algorithm not provided'}), 400
    
    global df, target_column_global
    if df is None:
        print("df test 1")
        return jsonify({'error': 'No data available. Upload data first.'}), 400

    if target_column_global is None:
        return jsonify({'error': 'Target column not set. Set target column first.'}), 400

    # Call a function to implement the model using the saved target column
    result = implement_model(df, target_column_global, algorithm)

    if result:
        global model
        model = result['model']
        return jsonify({'message': 'Model implemented successfully.', 'evaluation_metrics': result['metrics']}), 200
    else:
        return jsonify({'error': 'Failed to implement the model.'}), 500

@models_bp.route('/download_model', methods=['GET'])
def download_model():
    global model
    if model is None:
        return jsonify({'error': 'No model available to download.'}), 404

    # Create a BytesIO object and save the model into it
    model_io = io.BytesIO()
    pickle.dump(model, model_io)
    model_io.seek(0)

    # Send the file back to the client
    return send_file(model_io, as_attachment=True, download_name='trained_model.pkl', mimetype='application/octet-stream')

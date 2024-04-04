from flask import Blueprint, Flask, request, jsonify, send_file, after_this_request
import sys
sys.path.append('../../src')
from src.preprocess import *
from src.models import *
import pandas as pd
import pickle
import os
import io

from src.utils import load_data

models_bp = Blueprint('models_bp', __name__)

global model
model = None

df=pd.DataFrame()
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
        except ValueError as e:
            return jsonify({'error': str(e)}), 400

        # Include column names in the response
        return jsonify({'message': 'File processed successfully', 'total_columns': columns}), 200
    

@models_bp.route('/model_implem', methods=['POST'])
def model_implem():
    data = request.json
    target_column = data.get('target_column')
    algorithm = data.get('algorithm')

    if not target_column:
        return jsonify({'error': 'Target column not provided'}), 400

    if not algorithm:
        return jsonify({'error': 'Algorithm not provided'}), 400

    global df
    if df.empty:
        return jsonify({'error': 'No data available. Upload data first.'}), 400

    if target_column not in df.columns:
        return jsonify({'error': f'Target column "{target_column}" not found in the data.'}), 400
    
    # Call a function to implement the model
    result = implement_model(df, target_column, algorithm)
    global model
    if result:
        model = result['model']
        return jsonify({'message': 'Model implemented successfully.', 'evaluation_metrics':result['metrics']}), 200
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
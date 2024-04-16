from flask import Blueprint, Flask, request, jsonify, send_file
import sys
sys.path.append('../../../src')
#sys.path.insert(0, '../..')
from src.preprocess import *
import pandas as pd
import io

from src.utils import *

preprocess_bp = Blueprint('preprocess_bp', __name__)
df = pd.DataFrame()

@preprocess_bp.route('/upload_preprocess', methods=['POST'])
def upload_file():
    global df
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        try:
            # Load data and receive column names
            df = load_data(file, df)
            columns = df.columns.tolist()
        except ValueError as e:
            return jsonify({'error': str(e)})

        # Include column names in the response
        return jsonify({'message': 'File processed successfully', 'total_columns': columns})

    
@preprocess_bp.route('/preprocess', methods=['POST'])
def preprocess_data_route():
    global numerical_columns, character_columns
    data = request.json
    print("Request Data, :", data)
    preprocess_names = data.get('preprocess_names', [])
    print("PreProcess from Front-end : ", preprocess_names)
    global preprocessed_data, df
    preprocessed_data = preprocess_data(preprocess_names, df, numerical_columns, character_columns)
    print(preprocessed_data.head(15))
    return "Success"


@preprocess_bp.route('/get_preprocessed_data', methods=['GET'])
def get_preprocessed_data():
    global preprocessed_data
    if preprocessed_data is not None:
        # Save preprocessed data to a BytesIO object
        
        output = io.BytesIO()
        preprocessed_data.to_csv(output, index=False)
        output.seek(0)
        
        return send_file(output, download_name='preprocessed_data.csv', as_attachment=True, mimetype='text/csv')
    else:
        return 'Preprocessed data not available'

@preprocess_bp.route('/numerical_columns', methods=['POST'])
def post_numerical_columns_route():
    global df
    global numerical_columns
    global character_columns

    # Get numerical and character columns from request
    numerical_columns = request.json.get('numColumns', [])
    character_columns = [col for col in df.columns if col not in numerical_columns]
    print(numerical_columns)
    print(character_columns)
    # Get columns to delete
    delete_columns = request.json.get('remColumns', [])

    # Delete specified columns
    for col in delete_columns:
        if col in df.columns:
            del df[col]
            if col in numerical_columns:
                numerical_columns.remove(col)
            if col in character_columns:
                character_columns.remove(col)

    # Convert remaining columns to numeric and character types
    result_numeric = convert_to_numeric(df, numerical_columns)
    result_character = convert_to_character(df, character_columns)

    # Check for errors in conversion
    if "Error" in result_numeric:
        return jsonify({'error': result_numeric}), 400
    if "Error" in result_character:
        return jsonify({'error': result_character}), 400

    # Return updated columns
    print(df.head(10))
    return jsonify({'numerical_columns': numerical_columns, 'character_columns': character_columns}), 200


@preprocess_bp.route('/numerical_columns', methods=['GET'])
def get_numerical_columns_route():
    global numerical_columns
    return jsonify({'numerical_columns': numerical_columns})

@preprocess_bp.route('/character_columns', methods=['GET'])
def get_character_columns_route():
    global character_columns
    return jsonify({'character_columns': character_columns})


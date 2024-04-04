from flask import Flask, request, jsonify, send_file
from src.preprocess import *
import pandas as pd
import io

from sklearn.model_selection import train_test_split

def split_data(df, target_column, test_size=0.2, random_state=None):
    # Extract features (X) and target variable (y)
    X = df.drop(columns=[target_column])
    y = df[target_column]
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)
    return X_train, X_test, y_train, y_test



def load_data(file, df):
    # Assuming file.read() is where the issue originates
    content = file.read()

    if file.filename.endswith('.csv'):
        try:
        # Attempt to decode as UTF-8 if it's text data
            string_content = content.decode('utf-8')
        except UnicodeDecodeError:
            raise ValueError('File contains non-UTF-8 encoded bytes')
        df = pd.read_csv(io.StringIO(string_content))
    elif file.filename.endswith(('.xls', '.xlsx')):
        # For Excel files, this might not be necessary as they're binary format
        df = pd.read_excel(io.BytesIO(content))
    else:
        raise ValueError('Unsupported file format')
    return df
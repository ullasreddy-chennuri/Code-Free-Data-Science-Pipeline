import pandas as pd
import numpy as np

import sys
sys.path.append('../src')
from src.preprocessing import *




def preprocess_data(preprocessing_steps, df, numerical_columns, character_columns):
    print("Before PreProcessing")
    print(df.shape)
    for step in preprocessing_steps:
        if step == 'handle_invalid_data':
             print("Inside handle_invalid_data")
             df = handle_invalid_data(df, numerical_columns, character_columns)
        elif step == 'clean_strings':
             print("Inside clean_strings")
             df = clean_strings(df, character_columns)
        elif step == 'handle_null_numerical':
             print("Inside handle_null_numerical")
             df = handle_null_numerical(df, numerical_columns)
        elif step == 'handle_null_character':
             print("Inside handle_null_character")
             df = handle_null_character(df, character_columns)
        elif step == 'handling_outliers':
             print("Inside handling_outliers")
             df = handling_outliers(df, numerical_columns)
        elif step == 'normalize_data':
             print("Inside normalize_data")
             df = normalize_data(df, numerical_columns)
        elif step == 'remove_duplicate_rows':
             print("Inside remove_duplicate_rows")
             df = remove_duplicate_rows(df)
             
    print("After Preprocessing")
    print(df.shape)
    return df


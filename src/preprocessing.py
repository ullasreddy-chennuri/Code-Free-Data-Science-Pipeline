
import pandas as pd
import numpy as np


def convert_to_numeric(df, columns):
    for col in columns:
        try:
            df[col] = pd.to_numeric(df[col], errors = 'coerce')
        except ValueError:
            return f"Error: Unable to convert column '{col}' to numeric."
    return "Success"

def convert_to_character(df, columns):
    for col in columns:
        try:
            # Convert to string, preserving NaN values
            df[col] = df[col].apply(lambda x: str(x) if pd.notna(x) else np.nan)
        except ValueError:
            return f"Error: Unable to convert column '{col}' to character."
    return "Success"



#numerical columns processing
def process_numerical_columns(df, numeric_col):
    for col in numeric_col:
        df[col] = pd.to_numeric(df[col], errors = 'coerce')
    return df

#character column processing

def process_character_columns(df, char_col):
    for col in char_col:
        try:
            df[col] = df[col].apply(lambda x: str(x) if pd.notna(x) else np.nan)
        except ValueError:
            # Skip transformation if all values are numeric
            if not df[col].str.isnumeric().all():
                df[col] = df[col].apply(lambda x: np.nan if not str(x).replace('@', '').replace('_', '').replace('-', '').replace(' ', '').replace('.', '').isalnum() else x)
    return df

#handling error data or invalid data
def handle_invalid_data(df, numerical_columns, character_columns):
    print("Calling invalid handling")
    df = process_character_columns(df, character_columns)
    df = process_numerical_columns(df, numerical_columns)
    return df
    
#string consistency maintainance
def clean_strings(df, character_columns):
    print("Calling Clean Strings")
    for col in character_columns:
        df[col] = df[col].apply(lambda x: x.strip().lower() if pd.notnull(x) else x)
    return df

# Function to handle null values with mean for numerical
def handle_null_numerical(df, numerical_columns):
    print("Calling handle_null_with_mean")
    for col in numerical_columns:
        df[col] = df[col].fillna(value=df[col].mean())
    return df

# Function to handle null values with mode for character
def handle_null_character(df, character_columns):
    print("Calling handle_null_with_mode")
    for col in character_columns:
        df[col] = df[col].fillna(value=df[col].mode()[0])
    return df

#removing or replacing the data according to dataset size
def handling_outliers(df, numerical_columns):
    for column in numerical_columns:
        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)
        
        IQR = Q3 - Q1
        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR
        
        # Check the percentage of data points that are outliers
        outliers_percentage = ((df[column] < lower) | (df[column] > upper)).mean() * 100
        
        if outliers_percentage < 6:
            # Remove outliers completely if they represent less than 6% of the data
            df = df[(df[column] >= lower) & (df[column] <= upper)]
        else:
            # Replace outliers with median if they represent 6% or more of the data
            median = df[column].median()
            df[column] = np.where((df[column] < lower) | (df[column] > upper), median, df[column])
            
    return df

# Function for standardization
def normalize_data(df, numerical_columns):
    print("Calling Normalization")
    for col in numerical_columns:
        df[col] = (df[col]-df[col].min())/(df[col].max() - df[col].min())
    return df



def remove_duplicate_rows(df):
    print("Calling Remove duplicate rows")
    df = df.drop_duplicates()
    return df
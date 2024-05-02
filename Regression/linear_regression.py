import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.pipeline import Pipeline
from numpy import sqrt
import numpy as np

def linear_regression(df, target_column):
    try:
        # Validate target variable type
        if not np.issubdtype(df[target_column].dtype, np.number):
            raise ValueError("Target variable must be numeric.")

        # Drop rows with missing or invalid values
        df.dropna(inplace=True)

        # Split the data into features (X) and target variable (y)
        X = df.drop(columns=[target_column])
        y = df[target_column]

        # Identify non-numeric columns in X
        non_numeric_columns_X = X.select_dtypes(exclude=['number']).columns.tolist()

        # Create a column transformer for transforming non-numeric columns
        column_transformer = ColumnTransformer(
            [('one_hot_encoder', OneHotEncoder(sparse=False), non_numeric_columns_X)],  # Set sparse=False
            remainder='passthrough'
        )

        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Initialize a pipeline with the column transformer and linear regression model
        pipeline = Pipeline([
            ('transformer', column_transformer),
            ('regressor', LinearRegression())
        ])

        # Train the linear regression model
        pipeline.fit(X_train, y_train)
        
        # Predict on the testing set
        y_pred = pipeline.predict(X_test)
        
        # Calculate evaluation metrics
        mse = mean_squared_error(y_test, y_pred)
        rmse = sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)
        r_squared = r2_score(y_test, y_pred)
        print("MSE : ", mse)
        
        # Return the trained model and metrics 
        return {
            'model': pipeline,
            'metrics': {
                'Mean Squared Error': mse,
                'Root Mean Squared Error': rmse,
                'Mean Absolute Error': mae,
                'R Squared': r_squared
            }
        }
    except ValueError as ve:
        print(f"Validation error: {ve}")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

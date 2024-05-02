from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import pandas as pd
from numpy import sqrt
import numpy as np

def knn_regression(df, target_column):
    try:
<<<<<<< HEAD

        # Validate target variable type
        if not np.issubdtype(df[target_column].dtype, np.number):
            raise ValueError("Target variable must be numeric.")

        # Drop rows with missing or invalid values
        df.dropna(inplace=True)

=======
        # Validate target variable type
        if not np.issubdtype(df[target_column].dtype, np.number):
            raise ValueError("Target variable must be numeric.")
        
>>>>>>> b5851a3bae6df0c7dedd85b671fc49fc96b70516
        X = df.drop(columns=[target_column])
        y = df[target_column]
        
        non_numeric_columns_X = X.select_dtypes(exclude=['number']).columns.tolist()
        column_transformer = ColumnTransformer(
            [('one_hot_encoder', OneHotEncoder(sparse=False), non_numeric_columns_X)],
            remainder='passthrough'
        )
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        pipeline = Pipeline([
            ('transformer', column_transformer),
            ('regressor', KNeighborsRegressor())
        ])
        
        pipeline.fit(X_train, y_train)
        y_pred = pipeline.predict(X_test)

        print("After Model Implemetation")
        
        mse = mean_squared_error(y_test, y_pred)
        rmse = sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)
        r_squared = r2_score(y_test, y_pred)
        
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
    
    except Exception as e:
        return {
            f"An error occurred: {e}"
        }

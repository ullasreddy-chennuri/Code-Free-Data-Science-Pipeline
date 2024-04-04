from sklearn.tree import DecisionTreeRegressor
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.pipeline import Pipeline
from numpy import sqrt
import numpy as np

def decision_tree_regression(df, target_column):
    try:
        X = df.drop(columns=[target_column])
        y = df[target_column]
        
        non_numeric_columns_X = X.select_dtypes(exclude=['number']).columns.tolist()
        column_transformer = ColumnTransformer(
            [('one_hot_encoder', OneHotEncoder(), non_numeric_columns_X)],
            remainder='passthrough'
        )
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        pipeline = Pipeline([
            ('transformer', column_transformer),
            ('regressor', DecisionTreeRegressor())
        ])
        
        pipeline.fit(X_train, y_train)
        y_pred = pipeline.predict(X_test)
        
        mse = mean_squared_error(y_test, y_pred)
        rmse = sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)
        r_squared = r2_score(y_test, y_pred)
        
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
        print(f"An error occurred: {e}")

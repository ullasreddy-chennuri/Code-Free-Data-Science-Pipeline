from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import pandas as pd

def knn_regression(df, target_column):
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
            ('regressor', KNeighborsRegressor())
        ])
        
        pipeline.fit(X_train, y_train)
        y_pred = pipeline.predict(X_test)
        
        mse = mean_squared_error(y_test, y_pred)
        rmse = mse ** 0.5
        r2 = r2_score(y_test, y_pred)
        
        return {
            'model': pipeline,
            'metrics': {
                'MSE': mse,
                'RMSE': rmse,
                'R2': r2
            }
        }
    except Exception as e:
        return f"An error occurred: {e}"

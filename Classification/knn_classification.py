from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import pandas as pd

def knn_classification(df, target_column):
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
            ('classifier', KNeighborsClassifier())
        ])
        
        pipeline.fit(X_train, y_train)
        y_pred = pipeline.predict(X_test)
        
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred, average='micro')
        recall = recall_score(y_test, y_pred, average='micro')
        f1 = f1_score(y_test, y_pred, average='micro')
        
        return {
            'model': pipeline,
            'metrics': {
                'Accuracy': accuracy,
                'Precision': precision,
                'Recall': recall,
                'F1-score': f1
            }
        }
    except Exception as e:
        return f"An error occurred: {e}"

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
import pandas as pd


def logistic_regression(df, target_column):
    try:
        # Split the data into features (X) and target variable (y)
        X = df.drop(columns=[target_column])
        y = df[target_column]

        # Identify non-numeric columns in X
        non_numeric_columns_X = X.select_dtypes(exclude=['number']).columns.tolist()

        # Transform non-numeric columns in X using one-hot encoding
        column_transformer = ColumnTransformer(
            [('onehot', OneHotEncoder(), non_numeric_columns_X)],
            remainder='passthrough'
        )
        X_encoded = column_transformer.fit_transform(X)

        # Check if y needs to be encoded
        if y.dtype == 'object':
            # Encode the target label
            label_encoder = LabelEncoder()
            y_encoded = label_encoder.fit_transform(y)
        else:
            y_encoded = y

        # Split the encoded data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X_encoded, y_encoded, test_size=0.2, random_state=42)

        # Initialize and train the logistic regression model
        model = LogisticRegression()
        model.fit(X_train, y_train)
        
        # Predict on the testing set
        y_pred = model.predict(X_test)
        
        # Calculate evaluation metrics
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred, average='micro')
        recall = recall_score(y_test, y_pred, average='macro')
        f1 = f1_score(y_test, y_pred, average='micro')
        
        # You can return the trained model and metrics if needed
        return {
            'model': model,
            'metrics': {
                'accuracy': accuracy,
                'precision': precision,
                'recall': recall,
                'f1': f1
            }
        }
    except Exception as e:
        print(f"An error occurred: {e}")

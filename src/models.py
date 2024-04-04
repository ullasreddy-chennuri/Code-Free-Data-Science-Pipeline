import pandas as pd
import numpy as np
import sys
sys.path.append('Classification')
sys.path.append('Regression')

from Classification.logistic_regression import *
from Regression.linear_regression import *
from Classification.decision_tree_classification import *
from Classification.svm_classification import *
from Regression.decision_tree_regression import *
from Classification.naive_bayes_classification import *

def implement_model(df, target_column, algorithm):
    if algorithm == 'logistic_regression':
        result = logistic_regression(df, target_column)
        print("Inside the function - Logistic Regression Metrics:")
    elif algorithm == 'linear_regression':
        result = linear_regression(df, target_column)
        print("Inside the function - Linear Regression Metrics:")
    elif algorithm == 'decision_tree_classification':
        result = decision_tree_classification(df, target_column)
        print("Inside the function - Decision Tree Classification Metrics:")
    elif algorithm == 'svm_classification':
        result = svm_classification(df, target_column)
        print("Inside the function - SVM Classification Metrics:")
    elif algorithm == 'decision_tree_regression':
        result = decision_tree_regression(df, target_column)
        print("Inside the function - Decision Tree Metrics:")
    elif algorithm == 'naive_bayes_classification':
        result = naive_bayes_classification(df, target_column)
        print("Inside the function - Naive Bayes Classification")
    else:
        print(f"Algorithm '{algorithm}' is not supported.")
        return -1  # Return an error code or raise an exception
    
    # Dynamically print evaluation metrics
    for metric_name, metric_value in result['metrics'].items():
        print(f"{metric_name}: {metric_value}")
    
    return result
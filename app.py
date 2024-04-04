from flask import Flask
import pandas as pd
from flask_cors import CORS
import sys
sys.path.append('src/Routes/Preprocess')
sys.path.append('src/Routes/Models')
from src.Routes.Preprocess.preprocess_routes import preprocess_bp
from src.Routes.Models.models_routes import models_bp

# Initialize Flask app
app = Flask(__name__)
CORS(app)
# Import the Blueprints

#from column_routes import column_bp

# Register Blueprints with the app
app.register_blueprint(preprocess_bp)
app.register_blueprint(models_bp)

# Global variable to store DataFrame and column names
# Global variable to store DataFrame
global df, numerical_columns, character_columns, preprocessed_data
df = pd.DataFrame()

# Global variables to store column names
numerical_columns = []
character_columns = []
preprocessed_data = None

if __name__ == '__main__':
    app.run(debug=True)

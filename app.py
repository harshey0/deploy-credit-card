from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib


model = joblib.load('fraud_detection_model.pkl')
scaler = joblib.load('scaler.pkl')

app = Flask(__name__)
CORS(app) 

@app.route('/')
def index():
    return 'Credit Card Fraud Detection API'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    transaction_details = data['transactionDetails']

    transaction_data = np.array(transaction_details.split(',')).reshape(1, -1)
    transaction_data = scaler.transform(transaction_data)
    
    prediction = model.predict(transaction_data)
    probability = model.decision_function(transaction_data)

    return jsonify({'probability': probability[0]})

if __name__ == '__main__':
    app.run(debug=True)

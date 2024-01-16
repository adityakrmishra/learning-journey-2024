# Implementation Date: 2024-01-16
# Author: Aditya Kr. Mishra

# Complete Scikit-Learn Classification Pipeline
# Data scaling, training, and evaluation metrics

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

def train_rf_model(csv_path):
    # 1. Load data
    df = pd.read_csv(csv_path)
    X = df.drop('target', axis=1)
    y = df['target']

    # 2. Split dataset
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 3. Preprocessing (Standardization)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 4. Model Training
    clf = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    clf.fit(X_train_scaled, y_train)

    # 5. Evaluation
    predictions = clf.predict(X_test_scaled)
    print("Confusion Matrix:\n", confusion_matrix(y_test, predictions))
    print("\nClassification Report:\n", classification_report(y_test, predictions))
    
    return clf, scaler

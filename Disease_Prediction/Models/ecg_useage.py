# filepath: /Users/adiseshaogirala/Desktop/Projects/Disease_Prediction/Models/ecg_useage.py
import tensorflow as tf
import numpy as np
import pandas as pd
from scipy import stats
import csv
import matplotlib.pyplot as plt

# Load the saved model
model = tf.keras.models.load_model("ECG_final_model.h5")

# Define the classes
classes = ['N', 'S', 'V', 'F', 'Q']

def preprocess_ecg_signal(csv_file, window_size=180):
    signals = []
    with open(csv_file, 'r') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
        row_index = -1
        for row in spamreader:
            if row_index >= 0:
                signals.append(int(row[1]))
            row_index += 1

    # Normalize the signals
    signals = stats.zscore(signals)

    # Extract windows of signals
    X = []
    for pos in range(window_size, len(signals) - window_size):
        beat = signals[pos - window_size:pos + window_size]
        X.append(beat)

    X = np.array(X)
    X = X.reshape(X.shape[0], X.shape[1], 1)  # Reshape to match model input shape
    return X

def predict_ecg(csv_file):
    # Preprocess the input data
    X = preprocess_ecg_signal(csv_file)

    # Make predictions
    predictions = model.predict(X)
    predicted_classes = np.argmax(predictions, axis=1)

    return predicted_classes

def group_predictions(predicted_classes):
    grouped_predictions = []
    current_class = predicted_classes[0]
    count = 1

    for i in range(1, len(predicted_classes)):
        if predicted_classes[i] == current_class:
            count += 1
        else:
            grouped_predictions.append((current_class, count))
            current_class = predicted_classes[i]
            count = 1

    grouped_predictions.append((current_class, count))
    return grouped_predictions

def count_predictions(predicted_classes):
    counts = {cls: 0 for cls in classes}
    for pred_class in predicted_classes:
        counts[classes[pred_class]] += 1
    return counts

def print_predictions(grouped_predictions):
    for i, (pred_class, count) in enumerate(grouped_predictions):
        print(f"Group {i+1}: {classes[pred_class]} (Count: {count})")

def plot_pie_chart(counts):
    labels = counts.keys()
    sizes = counts.values()
    colors = ['#ff9999','#66b3ff','#99ff99','#ffcc99','#c2c2f0']
    explode = (0.1, 0, 0, 0, 0)  # explode the 1st slice (i.e. 'N')

    plt.figure(figsize=(8, 8))
    plt.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%',
            shadow=True, startangle=140)
    plt.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
    plt.title("ECG Prediction Counts")
    plt.show()

# Example usage
csv_file = "heart.csv"
predicted_classes = predict_ecg(csv_file)
grouped_predictions = group_predictions(predicted_classes)
# print_predictions(grouped_predictions)
counts = count_predictions(predicted_classes)
print("Total counts for each class:", counts)
plot_pie_chart(counts)
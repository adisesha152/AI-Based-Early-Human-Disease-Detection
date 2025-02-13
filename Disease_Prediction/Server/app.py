import matplotlib.pyplot as plt
import csv
import pywt
import numpy as np
from scipy import stats
from sklearn.preprocessing import MinMaxScaler
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, MaxPooling1D, Flatten, Dropout, Dense
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score, f1_score, recall_score, accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import OneHotEncoder
import seaborn as sns
from sklearn.utils import resample
import os
import pandas as pd

def denoise(signal):
    # Implement the denoise function here
    pass

def load_data(path):
    classes = ['N', 'L', 'R', 'A', 'V']
    n_classes = len(classes)
    count_classes = [0] * n_classes

    # Verify the path
    print(f"Loading data from path: {path}")

    try:
        filenames = next(os.walk(path))[2]
    except StopIteration:
        print(f"No files found in directory: {path}")
        return np.array([]), np.array([]), classes

    if not filenames:
        print(f"No files found in directory: {path}")
        return np.array([]), np.array([]), classes

    records = []
    annotations = []
    filenames.sort()

    for f in filenames:
        filename, file_extension = os.path.splitext(f)
        if file_extension == '.csv':
            records.append(os.path.join(path, filename + file_extension))
        else:
            annotations.append(os.path.join(path, filename + file_extension))

    X = []
    y = []
    window_size = 180

    for r in range(len(records)):
        signals = []
        with open(records[r], 'r') as csvfile:
            spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
            row_index = -1
            for row in spamreader:
                if row_index >= 0:
                    signals.insert(row_index, int(row[1]))
                row_index += 1

        signals = denoise(signals)
        signals = stats.zscore(signals)
        with open(annotations[r], 'r') as fileID:
            data = fileID.readlines()
            for d in range(1, len(data)):
                splitted = data[d].split(' ')
                splitted = list(filter(None, splitted))
                next(splitted)
                pos = int(next(splitted))
                arrhythmia_type = next(splitted)
                if arrhythmia_type in classes:
                    arrhythmia_index = classes.index(arrhythmia_type)
                    count_classes[arrhythmia_index] += 1
                    if window_size <= pos < (len(signals) - window_size):
                        beat = signals[pos - window_size:pos + window_size]
                        X.append(beat)
                        y.append(arrhythmia_index)

    return np.array(X), np.array(y), classes

def preprocess_data(X, y):
    X_reshaped = X.reshape(-1, 360)
    X_df = pd.DataFrame(X_reshaped)
    y_df = pd.DataFrame(y)
    X_new_df = pd.concat([X_df, y_df], axis=1)

    ax = list(range(361))
    X_new_df = X_new_df.set_axis(ax, axis='columns')

    df_0 = X_new_df[X_new_df[X_new_df.shape[1] - 1] == 0].sample(n=20000, random_state=42)
    df_1 = X_new_df[X_new_df[X_new_df.shape[1] - 1] == 1]
    df_2 = X_new_df[X_new_df[X_new_df.shape[1] - 1] == 2]
    df_3 = X_new_df[X_new_df[X_new_df.shape[1] - 1] == 3]
    df_4 = X_new_df[X_new_df[X_new_df.shape[1] - 1] == 4]

    df_1_upsample = resample(df_1, replace=True, n_samples=7000, random_state=125)
    df_2_upsample = resample(df_2, replace=True, n_samples=7000, random_state=77)
    df_3_upsample = resample(df_3, replace=True, n_samples=7000, random_state=103)
    df_4_upsample = resample(df_4, replace=True, n_samples=7000, random_state=59)

    X_new_df = pd.concat([df_0, df_1_upsample, df_2_upsample, df_3_upsample, df_4_upsample])

    return X_new_df

def split_data(X_new_df):
    train, test = train_test_split(X_new_df, test_size=0.20, random_state=7)
    target_train = train[train.shape[1] - 1]
    target_test = test[test.shape[1] - 1]
    encoder = OneHotEncoder(sparse_output=False)
    y_train = encoder.fit_transform(target_train.values.reshape(-1, 1))
    y_test = encoder.transform(target_test.values.reshape(-1, 1))

    X_train = train.iloc[:, :train.shape[1] - 1].values
    X_test = test.iloc[:, :test.shape[1] - 1].values
    X_train = X_train.reshape(len(X_train), X_train.shape[1], 1)
    X_test = X_test.reshape(len(X_test), X_test.shape[1], 1)

    return X_train, X_test, y_train, y_test

def build_model():
    model = Sequential()
    model.add(Conv1D(filters=16, kernel_size=11, strides=1, padding='same', activation='relu', input_shape=(360, 1)))
    model.add(MaxPooling1D(pool_size=5, strides=2))
    model.add(Conv1D(filters=32, kernel_size=13, strides=1, padding='same', activation='relu'))
    model.add(MaxPooling1D(pool_size=5, strides=2))
    model.add(Conv1D(filters=64, kernel_size=15, strides=1, padding='same', activation='relu'))
    model.add(MaxPooling1D(pool_size=5, strides=2))
    model.add(Conv1D(filters=128, kernel_size=17, strides=1, padding='same', activation='relu'))
    model.add(MaxPooling1D(pool_size=5, strides=2))
    model.add(Flatten())
    model.add(Dropout(0.5))
    model.add(Dense(100, activation='relu'))
    model.add(Dense(50, activation='relu'))
    model.add(Dense(5, activation='softmax'))
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

def main():
    path = 'heart'
    X, y, classes = load_data(path)
    if X.size == 0 or y.size == 0:
        print("No data to process. Exiting.")
        return
    X_new_df = preprocess_data(X, y)
    X_train, X_test, y_train, y_test = split_data(X_new_df)
    model = build_model()
    model.summary()
    history = model.fit(X_train, y_train, batch_size=36, epochs=10, verbose=1, validation_data=(X_test, y_test))
    y_true = [np.argmax(element) for element in y_test]
    prediction_proba = model.predict(X_test)
    prediction = np.argmax(prediction_proba, axis=1)
    cf = classification_report(y_true, prediction, target_names=classes, digits=4)
    print(cf)
    model.save("ECG_final_model.h5")
    print(confusion_matrix(y_true, prediction))

if __name__ == "__main__":
    main()
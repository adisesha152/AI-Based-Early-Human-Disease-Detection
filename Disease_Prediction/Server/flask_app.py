from flask import Flask, request, jsonify
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import os

app = Flask(__name__)

# Load the saved model
model = load_model("/Users/adiseshaogirala/Desktop/Projects/Disease_Prediction/Models/nero_final_model.h5")
classes = ['alzheimers_dataset', 'normal', 'parkinsons_dataset']

def preprocess_image(image_path, target_size=(150, 150)):
    img = load_img(image_path, target_size=target_size)
    img_array = img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded!'}), 400

    file = request.files['file']
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    preprocessed_image = preprocess_image(file_path)
    predictions = model.predict(preprocessed_image)
    predicted_class = np.argmax(predictions, axis=1)[0]
    predicted_label = classes[predicted_class]

    result = {
        "disease": predicted_label,
        "confidence": float(predictions[0][predicted_class]) * 100,
        "riskLevel": "Moderate"  # Example risk level, adjust based on your logic
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1000)

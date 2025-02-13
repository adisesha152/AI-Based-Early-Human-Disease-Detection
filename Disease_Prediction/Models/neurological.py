import numpy as np
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.models import load_model

def preprocess_image(image_path, target_size=(150, 150)):
    """
    Preprocess the image to match the input requirements of the model.
    
    Parameters:
    - image_path: str, path to the image file
    - target_size: tuple, target size for resizing the image
    
    Returns:
    - img_array: numpy array, preprocessed image array
    """
    # Load the image
    img = load_img(image_path, target_size=target_size)
    
    # Convert the image to array
    img_array = img_to_array(img)
    
    # Normalize the image
    img_array = img_array / 255.0
    
    # Expand dimensions to match the model input shape
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

# Load the saved model
model = load_model("nero_final_model.h5")

# Define the classes
classes = ['alzheimers_dataset', 'normal', 'parkinsons_dataset']

# Example usage
image_path = "neuro3.jpeg"
preprocessed_image = preprocess_image(image_path)

# Make predictions
predictions = model.predict(preprocessed_image)
predicted_class = np.argmax(predictions, axis=1)[0]
predicted_label = classes[predicted_class]

print(f"Predicted Class: {predicted_label}")
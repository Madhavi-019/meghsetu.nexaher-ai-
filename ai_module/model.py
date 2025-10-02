# ai_module/model.py

from PIL import Image
import torch
from torchvision import transforms
from transformers import AutoFeatureExtractor, AutoModelForImageClassification

def map_label_to_harvesting(label: str) -> str:
    mapping = {
        "harvester": "Farm pond or check dam (for open agricultural land)",
        "reaper": "Farm pond or check dam (for open agricultural land)",
        "patio": "Rooftop rainwater harvesting (best for buildings/terraces)",
        "terrace": "Rooftop rainwater harvesting (best for buildings/terraces)",
        # add more mappings if needed
    }
    return mapping.get(label.lower(), "No harvesting method mapped for this label")

# Load a pre-trained model (replace with a satellite-specific model if available)
MODEL_NAME = "google/vit-base-patch16-224"  # Vision Transformer as example
feature_extractor = AutoFeatureExtractor.from_pretrained(MODEL_NAME)
model = AutoModelForImageClassification.from_pretrained(MODEL_NAME)

# Transformation pipeline for images
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=feature_extractor.image_mean,
        std=feature_extractor.image_std
    )
])

def classify_image(image_path: str) -> str:
    """
    Classify a satellite image and return the predicted label.
    """
    try:
        # Open and preprocess the image
        image = Image.open(image_path).convert("RGB")
        img_tensor = preprocess(image).unsqueeze(0)  # Add batch dimension

        # Run the model
        with torch.no_grad():
            outputs = model(img_tensor)
            logits = outputs.logits
            predicted_idx = logits.argmax(-1).item()
            predicted_label = model.config.id2label[predicted_idx]

        return f"Prediction: {predicted_label}"
    except Exception as e:
        return f"Error: {str(e)}"

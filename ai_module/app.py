from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
##from ai_module.model import classify_image, map_label_to_harvesting  # import the mapping function
from model import classify_image, map_label_to_harvesting

app = FastAPI()

# ✅ Enable CORS (important for browser fetch requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all origins (for testing)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ai_module/app.py

@app.post("/classify/")
async def classify(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result_label = classify_image(file_path)

        if isinstance(result_label, str):
            cleaned_label = result_label.replace("Prediction:", "").strip().split(",")[0].strip()
        else:
            cleaned_label = str(result_label)

        harvesting_info = map_label_to_harvesting(cleaned_label)

        # This is the changed part: we now return 'harvesting_info'
        return {
            "filename": file.filename,
            "prediction": cleaned_label,
            "harvesting_suggestion": harvesting_info
        }

    except Exception as e:
        return {"error": str(e)}

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)
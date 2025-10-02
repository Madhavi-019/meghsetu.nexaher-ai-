from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from ai_module.model import classify_image, map_label_to_harvesting  # import the mapping function

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

@app.post("/classify/")
async def classify(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # 1️⃣ Call your model to get raw prediction
        result_label = classify_image(file_path)

        # 2️⃣ Clean up the label (remove "Prediction:" and split)
        if isinstance(result_label, str):
            cleaned_label = result_label.replace("Prediction:", "").strip()
            cleaned_label = cleaned_label.split(",")[0].strip()  # take the first label
        else:
            cleaned_label = str(result_label)

        # 3️⃣ Map the cleaned label to harvesting suggestion
        harvesting_method = map_label_to_harvesting(cleaned_label)
        
        # 4️⃣ Return both in response
        return {
            "filename": file.filename,
            "prediction": cleaned_label,
            "harvesting_suggestion": harvesting_method
        }
    
    except Exception as e:
        return {"error": str(e)}
    
    finally:
        # Delete file after processing
        if os.path.exists(file_path):
            os.remove(file_path)

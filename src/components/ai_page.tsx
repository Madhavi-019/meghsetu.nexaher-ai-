import React, { useState } from "react";
import { classifyImage } from "../ai_clients";


const AiPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const res = await classifyImage(file);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert("Failed to get prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">AI Image Classifier</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Classifying..." : "Classify Image"}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-800 rounded">
          <p><strong>File:</strong> {result.filename}</p>
          <p><strong>Prediction:</strong> {result.prediction}</p>
          <p><strong>Harvesting Suggestion:</strong> {result.harvesting_suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default AiPage;

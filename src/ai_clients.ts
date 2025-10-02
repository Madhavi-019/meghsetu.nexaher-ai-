export async function classifyImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/classify/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to classify image");
  }

  return response.json(); // returns { filename, prediction, harvesting_suggestion }
}

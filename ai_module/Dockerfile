    RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY .. /app  # copies repo root into container so ai_module is available
WORKDIR /app/ai_service

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
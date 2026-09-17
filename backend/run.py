import uvicorn

if __name__ == "__main__":
    print("Starting Vintage Beauty Salon FastAPI backend server on http://localhost:8000...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

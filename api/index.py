from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Data Mock Project
PROJECTS = [
    {
        "id": 1,
        "title": "AI Image Gen",
        "status": "Running",
        "tech": "Python, React",
        "url": "#"
    },
    {
        "id": 2,
        "title": "Data Scraper Pro",
        "status": "Stopped",
        "tech": "FastAPI, Selenium",
        "url": "#"
    }
]

@app.get("/api/projects")
async def get_projects():
    return PROJECTS

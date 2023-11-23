from fastapi import FastAPI, File, UploadFile, Body, Form, Depends, HTTPException, Header
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.requests import Request

from pydantic import BaseModel

# Import Assistant class from assistant.py
from assistant import Assistant

app = FastAPI()
assistant = Assistant()

# templates = Jinja2Templates(directory="../build")
# app.mount("/static", StaticFiles(directory="../build/static"), name="static")

# @app.get("/{rest_of_path:path}")
# def react_app(req: Request, rest_of_path: str):
#     return templates.TemplateResponse("index.html", {"request": req})

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}

class StringData(BaseModel):
    data: str


@app.post("/submit-chat")
def submit_chat(data:StringData):
    print("Data being received is ", data.data)
    response = assistant.get_response(data.data)

    print("Response from Open AI is ", response)
    return response

    # return " Here is a link: (https://www.allpointsfps.com/32-1040-center-gasket-kit/)a%E3%80%9015%E2%80%A0source%E3%80%91."

app.mount("/static", StaticFiles(directory="../build/static"), name="static")

@app.get("/{rest_of_path:path}")
def react_app(req: Request, rest_of_path: str):
    return templates.TemplateResponse("index.html", {"request": req})


origins = ["http://localhost:3000", "http://127.0.0.1:8000", "https://armada-ai-vkacker.vercel.app/", "https://armada-ai-eight.vercel.app/"]

app = CORSMiddleware(
    app=app,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

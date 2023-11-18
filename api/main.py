from fastapi import FastAPI, File, UploadFile, Body, Form, Depends, HTTPException, Header
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/submit-chat")
def submit_chat():
    return("gpt response")




origins = ["http://localhost:3000"]

app = CORSMiddleware(
    app=app,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

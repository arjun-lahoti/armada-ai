from fastapi import FastAPI, File, UploadFile, Body, Form, Depends, HTTPException, Header
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from pydantic import BaseModel

# Import Assistant class from assistant.py
from assistant import Assistant


app = FastAPI()
assistant = Assistant()


@app.get("/")
def read_root():
    return {"Hello": "World"}

class StringData(BaseModel):
    data: str


@app.post("/submit-chat")
def submit_chat(data:StringData):
    print("Data being received is ", data.data)
    response = assistant.get_response(data.data)

    print("Response from Open AI is ", response)
    return response

    # return " Here is a link: (https://www.allpointsfps.com/32-1040-center-gasket-kit/)a%E3%80%9015%E2%80%A0source%E3%80%91."




origins = ["http://localhost:3000"]

app = CORSMiddleware(
    app=app,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

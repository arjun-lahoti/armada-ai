from openai import OpenAI
import time
import os
import json
from config import OPENAI_API_KEY

class Assistant:
    def __init__(self, assistant_id="asst_SC3TrqEO2Uufo5tw7st9sX4r"):
        self.client = OpenAI(
            api_key=OPENAI_API_KEY,
        )
        self.assistant_id = assistant_id
    
    def create_file(self, file_name):
        file = self.client.files.create(
            file=open(file_name, "rb"),
            purpose='assistants'
        )

        return file

    def create_assistant(self, file_name):
        file = self.create_file(file_name)

        assistant = self.client.beta.assistants.create(
            name="Restaurant service technician assistant",
            description="You are a restaurant service technician assistant. You will search data present in .csv files and use your knowledge base to find specific parts that are relevant to the user. You will return a text summary of the part and its information. Please be precise.",
            model="gpt-4-1106-preview",
            tools=[{"type": "retrieval"}],
            file_ids=[file.id]
        )

        return assistant
    
    def get_assistant(self, assistant_id):
        assistant = self.client.beta.assistants.retrieve(assistant_id)
        return assistant

    def create_thread(self):
        thread = self.client.beta.threads.create(
            messages=[]
        )

        return thread
    
    def create_message(self, thread_id, role, content):
        message = self.client.beta.threads.messages.create(thread_id=thread_id,role=role,
            content=content
        )

        return message

    def get_response(self, prompt):
        assistant = self.get_assistant(self.assistant_id)
        thread = self.create_thread()
        message = self.create_message(thread.id, "user", prompt)
        run = self.client.beta.threads.runs.create(thread_id=thread.id,assistant_id=assistant.id)
        print(run.model_dump_json(indent=4))
        while True:
            run_status = self.client.beta.threads.runs.retrieve(thread_id=thread.id,run_id=run.id)
            print(run_status.model_dump_json(indent=4))
            time.sleep(10)
            if run_status.status == 'completed':
                messages = self.client.beta.threads.messages.list(thread_id=thread.id)
                print(messages)
                print(messages.model_dump_json(indent=4))
                print(messages.data[0].content[0].text.value)
                return messages.data[0].content[0].text.value
                break
            else:
                time.sleep(2)
        return None


# Example usage
if __name__ == "__main__":
    assistant = Assistant()
    response = assistant.get_response("I am looking for a hose. What dimensions are available?")
    print(response)
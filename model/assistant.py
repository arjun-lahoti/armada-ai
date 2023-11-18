from openai import OpenAI
import time
import os
import json

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

file = client.files.create(
  file=open("gasket_one_page.json", "rb"),
  purpose='assistants'
)

assistant = client.beta.assistants.retrieve("asst_EtXIIkftW4uif9ulMkQMf6U7")

# assistant = client.beta.assistants.create(
#   name="Restaurant service technician assistant",
#   description="You are a restaurant service technician assistant. You will search data present in .csv files and use your knowledge base to find specific parts that are relevant to the user. You will return a text summary of the part and its information. Please be precise.",
#   model="gpt-3.5-turbo-1106", # gpt-4-1106-preview
#   tools=[{"type": "retrieval"}],
#   file_ids=[file.id]
# )

thread = client.beta.threads.create(
  messages=[
    # {
    #   "role": "user",
    #   "content": "Give me the information for this product: 123456789",
    #   "file_ids": [file.id]
    # }
  ]
)

#  Create a Thread
thread = client.beta.threads.create()

# Add a Message to a Thread
message = client.beta.threads.messages.create(thread_id=thread.id,role="user",
    content="I am looking for a hose. What dimensions are available?"
)

# Run the Assistant
run = client.beta.threads.runs.create(thread_id=thread.id,assistant_id=assistant.id)
print(run.model_dump_json(indent=4))

# If run is 'completed', get messages and print
while True:
  # Retrieve the run status
  run_status = client.beta.threads.runs.retrieve(thread_id=thread.id,run_id=run.id)
  print(run_status.model_dump_json(indent=4))
  time.sleep(10)
  if run_status.status == 'completed':
    messages = client.beta.threads.messages.list(thread_id=thread.id)
    print(messages)
    print(messages.data[0].content[0].text.value)
    print(messages.model_dump_json(indent=4))
    break
  else:
    ### sleep again
    time.sleep(2)

# # Retrieve the message object
# message = client.beta.threads.messages.retrieve(
#   thread_id="...",
#   message_id="..."
# )

# # Extract the message content
# message_content = message.content[0].text
# annotations = message_content.annotations
# citations = []

# # Iterate over the annotations and add footnotes
# for index, annotation in enumerate(annotations):
#     # Replace the text with a footnote
#     message_content.value = message_content.value.replace(annotation.text, f' [{index}]')

#     # Gather citations based on annotation attributes
#     # if (file_citation := getattr(annotation, 'file_citation', None)):
#     cited_file = client.files.retrieve(file_citation.file_id)
#     citations.append(f'[{index}] {file_citation.quote} from {cited_file.filename}')
#     # elif (file_path := getattr(annotation, 'file_path', None)):
#     #     cited_file = client.files.retrieve(file_path.file_id)
#     #     citations.append(f'[{index}] Click <here> to download {cited_file.filename}')
#     #     # Note: File download functionality not implemented above for brevity

# # Add footnotes to the end of the message before displaying to user
# message_content.value += '\n' + '\n'.join(citations)

# run = client.beta.threads.runs.create(
#   thread_id=thread.id,
#   assistant_id=assistant.id
# )
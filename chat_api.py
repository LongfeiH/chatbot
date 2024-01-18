# openai_api.py
import os
import sys
import base64
from openai import OpenAI

def get_openai_completion(input_messages):
    
    send_messages = [{"role": "system", "content": "You are an algorithmic assistant who can solve and explain various algorithmic problems."},
    {"role": "user", "content": input_messages}]

    api_key = os.environ.get('OPENAI_API_KEY') 
    if api_key:
        client = OpenAI(api_key=api_key)
    else:
        print("API key not found. Please set the OPENAI_API_KEY environment variable.")
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=send_messages)
        return completion.choices[0].message
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    encoded_message = sys.argv[1]
    decoded_message = base64.b64decode(encoded_message).decode('utf-8')
    output_data = get_openai_completion(decoded_message)
    print(output_data.content) 
    
from openai import OpenAI

client = OpenAI(base_url="http://127.0.0.1:5678/v1/",
                api_key="sk-xxx")

stream = client.chat.completions.create(

    model="gpt-4",
    messages=[{"role": "user", "content": "Say this is a test"}],
    stream=True,
)
for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from dotenv import load_dotenv
import os
from groq import Groq
from typing import List
load_dotenv()
API_KEY=os.getenv("GROQ_API")


client = Groq(
    api_key=API_KEY,
)


def sentiment_analysis(messages:List):
    result_list = []
    sid = SentimentIntensityAnalyzer()

 
    for message in messages:
        chat_completion = client.chat.completions.create(
           messages=[
                {
                    "role": "user",
                    "content": f"Translate the sentence into English and print the result only in double quotes: \"{message}\"",
                }
        ],
        model="llama3-8b-8192",
        )
        translated_message = chat_completion.choices[0].message.content.strip('"')
        ps = sid.polarity_scores(translated_message)
        result_list.append({translated_message: ps})
    return result_list

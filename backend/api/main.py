from typing import Union,List
from fastapi import FastAPI
import utils.processing as imp
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello":"World"}


class Item(BaseModel):
    messages: List[str]

# POST REQUEST: FRONTEND WILL SEND LIST OF SMS AND API WILL RETURN RESPONSES
@app.post("/sentiment")
async def generate_sentiment(item: Item):
    res = imp.sentiment_analysis(item.messages)       
    return res 



@app.get("/items/{item_id}")
def read_item(item_id:int, q:Union[str, None] = None):
    return {"item_id":item_id, "q":q}

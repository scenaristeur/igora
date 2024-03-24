#  ChatDev

```
git clone https://github.com/OpenBMB/ChatDev.git
cd ChatDev
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```


add a .env file with 

```
OPENAI_API_KEY="You are beautiful but this is not needed with igora"
OPENAI_API_BASE='http://localhost:5678/v1' # url of Igora openAi endpoint
OPENAI_MODEL_NAME="dolphin-2.2.1-mistral-7b.Q2_K.gguf" # the model running in Igora
```

# add dotenv file
```
pip install -U setuptools
pip install python-dotenv
```
and add this two lines in top of ChatDev run.py

```
from dotenv import load_dotenv
load_dotenv()
```




# run 
```
python run.py --task "[description_of_your_idea]" --name "[project_name]"

python run.py --task "design a 2048 game" --name "2048"  --org "Igora.games" --config "Default"
```

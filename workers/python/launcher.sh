#!/usr/bin/env bash

install_path="$HOME/dev/igora-reloaded/"
cd $install_path 
# cd /var/log
pwd
source .venv/bin/activate
cd backEndTest
python3 -m llama_cpp.server --model ./models/dolphin-2.2.1-mistral-7b.Q2_K.gguf 

echo $$

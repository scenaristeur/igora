
# bootsrap peer
python -m petals.cli.run_dht --host_maddrs /ip4/0.0.0.0/tcp/31337 --identity_path bootstrap1.id 



# api
cd chat.petals.dev

flask run --host=0.0.0.0 --port=5000

curl -X POST "http://127.0.0.1:5000/api/v1/generate" -d "model=petals-team/StableBeluga2" -d "inputs=Qui est le président de la France?" -d "max_new_tokens=20"

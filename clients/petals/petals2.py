from transformers import AutoTokenizer
from petals import AutoDistributedModelForCausalLM


INITIAL_PEERS = [
    # "/ip4/10.1.2.3/tcp/31234/p2p/QmcXhze98AcgGQDDYna23s4Jho96n8wkwLJv78vxtFNq44",
    # "/ip4/10.1.2.4/tcp/31245/p2p/12D3KooWNPaCDFTKMKBkQazoznq2dkdD3jWkXnYCTJH8PFpggNM6",
    "/ip4/192.168.0.30/tcp/31337/p2p/QmduMnnKsVfYytZqrzuqQkKYbbTkN7c9zyxT5VCoSAXaiX",
    #"/ip4/127.0.0.1/tcp/31337/p2p/QmduMnnKsVfYytZqrzuqQkKYbbTkN7c9zyxT5VCoSAXaiX"
]


# Choose any model available at https://health.petals.dev
# model_name = "petals-team/StableBeluga2"  # This one is fine-tuned Llama 2 (70B)
#model_name = "petals-team/falcon-rw-1b"
model_name = "petals-team/bloom"

# Connect to a distributed network hosting model layers
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoDistributedModelForCausalLM.from_pretrained(
    model_name, initial_peers=INITIAL_PEERS)

# Run the model as if it were on your computer
inputs = tokenizer("A cat sat", return_tensors="pt")["input_ids"]
outputs = model.generate(inputs, max_new_tokens=5)
print(tokenizer.decode(outputs[0]))  # A cat sat on a mat...

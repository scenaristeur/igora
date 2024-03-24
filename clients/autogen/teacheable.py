# https://github.com/microsoft/autogen/blob/212722cd45ac528f232d6e41b2112b040aa1844a/notebook/agentchat_teachability.ipynb#L12


import autogen
from autogen import ConversableAgent, UserProxyAgent
from autogen.agentchat.contrib.capabilities.teachability import Teachability

# config_list = autogen.config_list_from_json(
#     env_or_file="OAI_CONFIG_LIST",
#     file_location=".",
#     filter_dict={
#         "model": ["gpt-4", "gpt-4-1106-preview", "gpt4", "gpt-4-32k"],
#     },
# )
config_list = autogen.config_list_from_json(env_or_file="OAI_CONFIG_LIST")

# print(config_list[0]["model"])



# Start by instantiating any agent that inherits from ConversableAgent.
teachable_agent = ConversableAgent(
    name="teachable_agent",  # The name is flexible, but should not contain spaces to work in group chat.
    llm_config={"config_list": config_list, "timeout": 120, "cache_seed": None},  # Disable caching.
)

# Instantiate the Teachability capability. Its parameters are all optional.
teachability = Teachability(
    verbosity=0,  # 0 for basic info, 1 to add memory operations, 2 for analyzer messages, 3 for memo lists.
    reset_db=True,
    path_to_db_dir="./tmp/notebook/teachability_db",
    recall_threshold=1.5,  # Higher numbers allow more (but less relevant) memos to be recalled.
)

# Now add the Teachability capability to the agent.
teachability.add_to_agent(teachable_agent)

# Instantiate a UserProxyAgent to represent the user. But in this notebook, all user input will be simulated.
user = UserProxyAgent(
    name="user",
    human_input_mode="NEVER",
    is_termination_msg=lambda x: True if "TERMINATE" in x.get("content") else False,
    max_consecutive_auto_reply=0,
    code_execution_config={
        "use_docker": False
    },  # Please set use_docker=True if docker is available to run the generated code. Using docker is safer than running the generated code directly.
)

text = "Qu'est-ce que le modèle Vicuna ?"
user.initiate_chat(teachable_agent, message=text, clear_history=True)

text = "Vicuna est un modèle de langage 13B développé par Meta."
user.initiate_chat(teachable_agent, message=text, clear_history=False)

text = "Qu'est-ce que le modèle Orca?"
user.initiate_chat(teachable_agent, message=text, clear_history=False)

text = "Orca est un modele de langage 13B developé par Microsoft. Il est plus performant que Vicuna sur la plupart des tâches."
user.initiate_chat(teachable_agent, message=text, clear_history=False)

text = "Peux tu comparer Vicuna et Orca?"
user.initiate_chat(teachable_agent, message=text, clear_history=True)


# text = "What is the Vicuna model?"
# user.initiate_chat(teachable_agent, message=text, clear_history=True)

# text = "Vicuna is a 13B-parameter language model released by Meta."
# user.initiate_chat(teachable_agent, message=text, clear_history=False)

# text = "What is the Orca model?"
# user.initiate_chat(teachable_agent, message=text, clear_history=False)

# text = "Orca is a 13B-parameter language model developed by Microsoft. It outperforms Vicuna on most tasks."
# user.initiate_chat(teachable_agent, message=text, clear_history=False)

# text = "How does the Vicuna model compare to the Orca model?"
# user.initiate_chat(teachable_agent, message=text, clear_history=True)
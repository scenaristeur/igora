from autogen import AssistantAgent, UserProxyAgent, config_list_from_json
from autogen.coding import LocalCommandLineCodeExecutor

import os
from pathlib import Path

# llm_config = {
#     "config_list": [{"model": "gpt-4", "api_key": os.environ["OPENAI_API_KEY"]}],
# }
llm_config = {
    "config_list": config_list_from_json(env_or_file="OAI_CONFIG_LIST")
}


work_dir = Path("coding")
work_dir.mkdir(exist_ok=True)

assistant = AssistantAgent("assistant", llm_config=llm_config)

code_executor = LocalCommandLineCodeExecutor(work_dir=work_dir)
user_proxy = UserProxyAgent(
    "user_proxy", code_execution_config={"executor": code_executor}
)

# Start the chat
user_proxy.initiate_chat(
    assistant,
    message="Plot a chart of NVDA and TESLA stock price change YTD.",
)
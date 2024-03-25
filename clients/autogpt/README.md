
# modif 

[text](autogpts/autogpt/autogpt/core/resource/model_providers/openai.py)

        response_args = {
            "model_info": OPEN_AI_CHAT_MODELS[model_name],
            "prompt_tokens_used": 0, #response.usage.prompt_tokens,
            "completion_tokens_used": 0, #response.usage.completion_tokens,
        }


# comment if tool_calls_compat_mode:

        #if tool_calls_compat_mode:
        response_message["tool_calls"] = _tool_calls_compat_extract_calls(
                response_message["content"]
        )

# ligne 720

        block = re.search(r"```(?:tool_calls)?\n(.*)\n```\s*$", response, re.DOTALL)
        if not block:
            print("Could not find tool calls block in response")
            tool_calls = []
        else: 
            tool_calls: list[AssistantToolCallDict] = json.loads(block.group(1))
            
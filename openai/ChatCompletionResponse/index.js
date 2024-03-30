import { v4 as uuidv4 } from "uuid";
export class ChatCompletionResponse {
    constructor(options = {}) {
        this.id = "chatcmpl-" + uuidv4()
        this.object = options.stream ?  "chat.completion.chunk" : "chat.completion" 
        this.created= Date.now() / 1000
        this.model= options.model
        this.system_fingerprint= "fp_"+uuidv4(),
        this.choices= [
            {
                index: 0,
                delta: {
                    role: "assistant",
                    content: "ONE Hello "+Date.now()/1000,
                },
                logprobs: null,
                finish_reason: null,
            }
        ]
        this.usage= {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0,
        }
    }

    updateContent(content) {
        this.choices[0].delta.content = content
    }
    finish(reason) {
        this.choices[0].finish_reason = reason
    }
    toString() {
        return JSON.stringify(this)
    }
}
import {ConversationChain } from "langchain/chains";
import {config} from "dotenv"
config()


import { agentExecutor } from "./agentChain.js";
const input = "how many tutorials are listed?"

const agent_scratchpad:string =""
const result = await agentExecutor.invoke({
    input:input,
    agent_scratchpad:agent_scratchpad
})
console.log(result.output,agent_scratchpad)
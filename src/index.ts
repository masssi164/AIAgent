import {ConversationChain } from "langchain/chains";
import {config} from "dotenv"
config()


import { agentExecutor } from "./agentChain.js";
const input = "how long is the word sentence: Unser ach so freier Geist tanzt auf der Nase unseres Seins"

const result = await agentExecutor.invoke({
    input:input,

})
console.log(result)
import { createOpenAPIChain, ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";
import {config} from "dotenv"
config()
// Initialize the chat model
const chatModel = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0,
});

const chain = new ConversationChain({
    llm:chatModel,
    outputKey:"output",
});

const enterChain = async (userQuery:string,calback:(result:string) => void) => {
    // Create an OpenAPI chain
    // Run the chain with a specific query
    const result = await chain.invoke({
        input:userQuery
    })
    calback(result.output)
}

enterChain("write a letter to my wife",(result) => {
    console.log(`${result}`)
})
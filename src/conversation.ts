import { chatModel } from "./ChatModel.js";
import { ConversationChain } from "langchain/chains";
const chain = new ConversationChain({
    llm:chatModel,
    outputKey:"output",
});

export const enterChain = async (userQuery:string,calback:(result:string) => void) => {
    // Create an OpenAPI chain
    // Run the chain with a specific query
    const result = await chain.invoke({
        input:userQuery
    })
    calback(result.output)
}

import {config} from "dotenv"
config()


import {openapiAgent } from "./agentChain.js";
const input = "how many tutorials are listed?"

const agent_scratchpad:string =""
const result = await openapiAgent.invoke({
    input:input,
    agent_scratchpad:agent_scratchpad
})
console.log(`Got output ${result.output}`);

console.log(
  `Got intermediate steps ${JSON.stringify(
    result.intermediateSteps,
    null,
    2
  )}`
);
console.log(result.output,agent_scratchpad)
import {config} from "dotenv"
config()


import {invoke, openapiAgent} from "./agentChain.js";
const input = `Create a new tutorial with example values about a interesting topic
BaseUrl: http://0.0.0.0:8080/api in dem fall +/tutorials und benötigt für post werden title und description beides strings sofort PostRequest
`

const agent_scratchpad:string =""
const result = await invoke(input,agent_scratchpad)
if(result) {
  console.log("intermediatesteps",result.intermediateSteps)
  console.log(`output: ${result.output}`)
}

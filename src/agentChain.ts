import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';
import { BufferMemory } from 'langchain/memory';
import { OpenApiToolkit, createOpenApiAgent } from 'langchain/agents';
import { JsonSpec} from 'langchain/tools';

import { chatModel } from './ChatModel.js';
import { getJsonSpec } from './YamlLoader.js';

const fileName:string = "data/apispec.yaml"

// Initialize OpenApiToolkit

const setUpExecutor = async (filename:string):Promise<AgentExecutor> => {
  const openApiToolKit = new OpenApiToolkit(new JsonSpec(await getJsonSpec(fileName)),chatModel,{
    "content-type":"application/json"
  })
  return createOpenApiAgent(chatModel,openApiToolKit)
}

export const openapiAgent = await setUpExecutor(fileName);

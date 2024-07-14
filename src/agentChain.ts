import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';
import { BufferMemory } from 'langchain/memory';
import { OpenApiToolkit, createOpenApiAgent } from 'langchain/agents';
import { JsonSpec} from 'langchain/tools';

import { chatModel } from './ChatModel.js';
import { getJsonSpec } from './YamlLoader.js';
import { ChainValues } from '@langchain/core/utils/types';

const fileName: string = "data/apispec.yaml";

// Initialize OpenApiToolkit
const setUpExecutor = async (filename: string): Promise<AgentExecutor> => {
  const openApiToolKit = new OpenApiToolkit(
    new JsonSpec(await getJsonSpec(fileName)),
    chatModel,
    {
      "content-type": "application/json"
    }
  );

  const predefinedPrefix = `You are an agent designed to answer questions by making web requests to an API given the openapi spec.
If the question does not seem related to the API, return I don't know. Do not make up an answer.
However, if the question relates to the api, don't give an output before you made get, post, put or delete request. You need base url, endpoint and properties, as soon as you got everything execute request`;

  const predefinedSuffix = `Begin!
Question: {input}
Thought: I should explore the spec to find the base server url for the API in the servers node.
{agent_scratchpad}`;

  const agent = await createOpenApiAgent(chatModel, openApiToolKit, {
    inputVariables: ["input", "agent_scratchpad"],
  })

  agent.handleParsingErrors = true;
  return agent;
};

export const openapiAgent = await setUpExecutor(fileName);

export const invoke = async (input: string, agentScratchpad: string): Promise<ChainValues | undefined> => {
  try {
    return await openapiAgent.invoke({
      input: input,
      agent_scratchpad: agentScratchpad
    });
  } catch (e) {
    console.log(e);
  }
  return;
};
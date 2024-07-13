import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';
import { ChatOpenAI } from '@langchain/openai';
import { BufferMemory } from 'langchain/memory';
import { OpenApiToolkit } from 'langchain/agents';
import { JsonSpec } from 'langchain/tools';
import { chatModel } from './ChatModel.js';
import { getJsonSpec } from './YamlLoader.js';
const fileName:string = "/data/openapiSpec.yaml"
// Load OpenAPI spec from file
let openApiSpec:any;
await getJsonSpec(fileName,(err,yaml) => {
  if(yaml) {
    openApiSpec = yaml
  }
})


// Initialize OpenApiToolkit
const toolkit = new OpenApiToolkit(new JsonSpec(openApiSpec),chatModel,{
  "content-type":"application/json"
});

// Create tools array including custom and OpenAPI tools
const tools = [ ...toolkit.getTools()];
const toolNames = tools.map(tool => tool.name).join(" ");

// Create the prompt template
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant. Make sure to use your given tools " + toolNames + " as much as possible. Report each step as you use a tool."],
  ["human", "{input}"],
  new MessagesPlaceholder("agent_scratchpad"),
]);

// Create the agent
const agent = await createToolCallingAgent({ llm: chatModel, tools, prompt });

// Initialize the agent executor
export const agentExecutor = new AgentExecutor({
  agent,
  tools,
  handleParsingErrors: true,
});

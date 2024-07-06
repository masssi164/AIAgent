import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { createToolCallingAgent, AgentExecutor } from 'langchain/agents';
import { chatModel } from "./ChatModel.js";
import { DynamicTool } from '@langchain/core/tools';

// Definieren eines einfachen Werkzeugs
const customTool = new DynamicTool({
  name: "get_word_length",
  description: "Returns the length of a word.",
  func: async (input: string) => input.length.toString(),
});

const tools = [customTool];

// Erstellen der Eingabeaufforderungsvorlage
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant. Make sure, to use your given tools if its possible "],
  ["human", "{input}"],
  new MessagesPlaceholder("agent_scratchpad"),
]);

// Erstellen des Agenten
const agent = await createToolCallingAgent({ llm: chatModel, tools, prompt })

// Initialisieren des Agenten-Executors
export const agentExecutor = new AgentExecutor({
  agent,
  tools,
});

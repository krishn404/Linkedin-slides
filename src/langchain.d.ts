declare module 'langchain/schema' {
  export class HumanMessage {
    constructor(content: string);
  }
  export class SystemMessage {
    constructor(content: string);
  }
  // Add other exports as needed
}

declare module 'gemini-client' {
  interface GeminiClientOptions {
    apiKey: string;
    // Add other options as needed
  }

  export default class GeminiClient {
    constructor(options: GeminiClientOptions);
    bind(config: { functions: any[]; function_call: { name: string } }): this;
    invoke(messages: any[]): Promise<any>;
  }
}

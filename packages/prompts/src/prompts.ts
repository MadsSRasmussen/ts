import { Prompt } from "./prompt/index.ts";

export class Prompts {
  private _apiKey: string;

  constructor(settings: { apiKey: string }) {
    this._apiKey = settings.apiKey;
  }

  async getPrompt<T extends string[]>(
    id: string,
  ): Promise<Prompt<T>> {
    console.log(`Prompt with id ${id} requested.`);
    await Promise.resolve();
    return new Prompt(
      `
      You are a chatbot supposed to do the following:
      {{prompt}}
      Provide your answer in the following language: {{language}}
      `,
      ["prompt", "language"] as T,
    );
  }

  logApiKey(): void {
    console.log(this._apiKey);
  }
}

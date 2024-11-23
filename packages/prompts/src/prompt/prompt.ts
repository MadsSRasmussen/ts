import { PromptResponse } from "../types/server-response.ts";

export class Prompt<T extends readonly string[] = []> {
  public body: string;
  public inputKeys: T;

  constructor(body: string, inputKeys: T = [] as unknown as T) {
    this.body = body;
    this.inputKeys = inputKeys;
  }

  assemble(assemblyInputs: Partial<Record<T[number], string>> = {}): string {
    return this.inputKeys.reduce((acc: string, key) => {
      const regex = new RegExp(`{{${String(key)}}}`, "g");
      return acc.replace(
        regex,
        assemblyInputs[key as keyof typeof assemblyInputs] ?? "",
      );
    }, this.body);
  }

  static fromServerResponse<T extends string[]>(
    response: PromptResponse,
  ): Prompt<T> {
    const sortedUnits = response.units.toSorted((a, b) => a.index - b.index);

    const body = sortedUnits.reduce((acc: string, unit) => {
      switch (unit.type) {
        case "text":
          acc += (unit.display === "block" && unit.index !== 0)
            ? `\n${unit.content}`
            : ` ${unit.content}`;
          break;
        case "replace":
          acc += (unit.display === "block" && unit.index !== 0)
            ? `\n{{${unit.key}}}`
            : ` {{${unit.key}}}`;
          break;
      }

      return acc;
    }, "");

    const inputKeys = response.units.filter((unit) => unit.type === "replace")
      .map((unit) => unit.key) as T;

    return new Prompt<T>(body.trim(), inputKeys);
  }
}

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
}

import { Prompts } from "@msr/prompts";

const client = new Prompts({
  apiKey: "G4t3x6DRldnkkKscsMhH",
  organisation: "MCuwVv7PdrrOXmhdg6Y0",
});

const prompt = await client.getPrompt<["language", "instruction"]>(
  "first_prompt",
);

console.log(prompt.assemble({
  language: "Danish",
  instruction:
    "You are a quiz generating bot, generating quizzes for the user.",
}));

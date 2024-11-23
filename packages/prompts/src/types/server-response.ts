export type PromptResponse = {
  id: string;
  name: string;
  frozen: boolean;
  units: PromptResponseUnit[];
};

type PromptResponseUnit = {
  index: number;
  display: "block" | "inline";
} & (PromptResponseTextUnit | PromptResponseReplaceUnit);

type PromptResponseTextUnit = {
  type: "text";
  content: string;
};

type PromptResponseReplaceUnit = {
  type: "replace";
  key: string;
};

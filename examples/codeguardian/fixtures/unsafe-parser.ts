export type Result = {
  ok: boolean;
  value: string;
};

export function parseResult(input: string): Result {
  return JSON.parse(input) as Result;
}

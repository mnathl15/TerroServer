import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod.mjs";
import { StimuliDataSchemaLLM } from "../../schema/openai.js";

import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.CHAT_GPT_API_KEY });

interface callGetStimuliLLMProps {
  address: string;
  quantity: string;
  todays_date: string;
  date_limit: string;
}
export const callGetStimuliLLM = async ({
  address,
  quantity,
  todays_date,
  date_limit,
}: callGetStimuliLLMProps) => {
  const response = await client.responses.parse({
    model: "gpt-4o",
    tools: [{ type: "web_search" }],

    text: {
      format: zodTextFormat(StimuliDataSchemaLLM, "stim"),
    },
    prompt: {
      id: process.env.MARKET_RESPONSE_ID!,
      variables: {
        address,
        quantity,
        todays_date,
        date_limit,
      },
    },
  });

  return response;
};

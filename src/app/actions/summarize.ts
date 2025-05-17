"use server";

import { z } from "zod";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { type Lang, langsMap } from "@/lib/lang";

const summarizationSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
});

export type SummarizationResult = z.infer<typeof summarizationSchema>;
export type SummarizationGeneration = {
  summary: SummarizationResult;
  url: string;
};

const systemPrompt = `
You are a helpful assistant that summarizes web pages.
You will be given a URL and you will need to summarize the page.
You will need to return the title, content, and tags of the page.
The title should be a single sentence that captures the main idea of the page. No more than 10 words.
The content should be a summary of the page that is no more than 200 words, concise and to the point.
The content should be in markdown format, bold the most important words.
Do not include lists in the content.
The tags should be a list of up to 3 keywords that are relevant to the page.
`;

export async function summarize(
  url: string,
  lang: Lang = "en"
): Promise<SummarizationGeneration> {
  "use server";

  const { object: summary } = await generateObject({
    model: google("gemini-2.0-flash"),
    system: systemPrompt,
    prompt: `Summarize the following page: ${url}. The summary must be in the language ${langsMap[lang]}.`,
    schema: summarizationSchema,
    temperature: 0.3,
    maxTokens: 1000,
  });

  return { summary, url };
}

import { Configuration, OpenAIApi } from "openai";
import randomWords from "random-words";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const configuration = new Configuration({
  apiKey: env.OPEN_AI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatGptRouter = createTRPCRouter({
  eli5: publicProcedure
    .input(
      z.object({
        text: z.string().optional(),
        showRandomTopic: z.boolean().optional(),
      })
    )
    .query(async ({ input }) => {
      const randomTopic = input.showRandomTopic
        ? (randomWords(1)[0] as string)
        : "artificial intelligence";

      const completion = await openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content:
                !input.text || input.showRandomTopic
                  ? `Imagine I am a 5 year-old, try answer this question: ${randomTopic}. Try to keep your response in 200 words or shorter`
                  : `Imagine I am a 5 year-old, try answer this question: ${input.text}. Try to keep your response in 200 words or shorter`,
            },
          ],
        })
        .catch((err) => {
          console.log("err", err);
        });

      console.log(completion?.data?.choices?.[0]?.message);

      return {
        answer:
          completion?.data?.choices?.[0]?.message?.content ??
          "Sorry. Try again later.",
        topic: input.text ?? randomTopic ?? "",
      };
    }),
});

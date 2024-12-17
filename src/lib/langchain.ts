import axios from "axios";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  MultiSlideSchema,
  UnstyledMultiSlideSchema,
} from "@/lib/validation/slide-schema"; // TODO: Keep only the slides for some prompt
import { UnstyledDocumentSchema } from "@/lib/validation/document-schema";
import {
  UnstyledTitleSchema,
  UnstyledDescriptionSchema,
  UnstyledSubtitleSchema,
} from "@/lib/validation/text-schema";

const carouselFunctionSchema = {
  name: "carouselCreator",
  description: "Creates a carousel with multiple slides for a given topic.",
  parameters: zodToJsonSchema(UnstyledDocumentSchema, {
    definitions: {
      UnstyledTitleSchema,
      UnstyledSubtitleSchema,
      UnstyledDescriptionSchema,
    },
  }),
};

export async function generateCarouselSlides(
  topicPrompt: string,
  apiKey: string
): Promise<z.infer<typeof MultiSlideSchema> | null> {
  const result = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
    {
      contents: [
        {
          parts: [
            {
              text: `
              Create a Carousel of slides following these rules

              Arguments Schema Instructions:
               - Respect the argument schema and only use the allowed values for element type, which are 'Title', 'Subtitle' and 'Description'.
               - Each slide can use multiple elements and they can be of different types or not.
               - Respect the 'maxLength' value which is the maximum number of characters in a given field. Write less than 70% of that number.

              Guidelines:
               - Create 8-15 slides.
               - Each slide has 2-3 different elements. E.g. [Title, Description], or [Title, Subtitle], or [Subtitle, Description].
               - Ensure all elements in that slide are related to the topic provided in the prompt.
               - Adapt, reorganize, and rephrase the content to fit the slides format.
               - Add Emojis to the text in Title, Subtitle, and Description.
               - Don't add slide numbers.
               - Description element text should be short.
              `,
            },
            {
              text: topicPrompt,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const jsonParsed = result.data;

  const unstyledDocumentParseResult =
    UnstyledDocumentSchema.safeParse(jsonParsed);
  if (unstyledDocumentParseResult.success) {
    return MultiSlideSchema.parse(unstyledDocumentParseResult.data.slides);
  } else {
    console.log("Error in carousel generation schema");
    console.error(unstyledDocumentParseResult.error);
    console.log(jsonParsed);
    return null;
  }
}

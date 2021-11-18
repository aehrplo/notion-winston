import dotenv from "dotenv";
import { Client } from "@notionhq/client";
import { logger } from "./logger";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
dotenv.config();

export const notionLogger = async (
  level: any,
  message: string,
  timestamp: string
) => {
  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_ID as string },
      properties: {
        Level: {
          select: {
            name: level,
          },
        },
        Message: {
          title: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
        Time: {
          date: {
            start: timestamp,
          },
        },
      },
    });
  } catch (e) {
    logger.error(e);
  }
};

"use server";

import { getDbConnection } from "@/lib/db";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ FIXED import
import { CHAT_SYSTEM_PROMPT } from "@/utils/prompts";


// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || ""); // ✅ FIXED constructor

export async function askQuestionAction(summaryId: string, question: string) {
  if (!summaryId || !question) {
    return { success: false, error: "Invalid input." };
  }

  try {
    // 1. Generate an embedding for the user's question
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "embedding-001",
      apiKey: process.env.GEMINI_API_KEY,
    });
    const questionEmbedding = await embeddings.embedQuery(question);

    const sql = await getDbConnection();

    // 2. Find the most relevant document chunks
    const vectorString = `[${questionEmbedding.join(",")}]`;
    const relevantChunks = await sql`
      SELECT chunk_text
      FROM pdf_chunks
      WHERE summary_id = ${summaryId}
      ORDER BY embedding <=> ${vectorString}::vector
      LIMIT 5
    `;

    console.log(`Found ${relevantChunks.length} relevant chunks.`);

    if (relevantChunks.length === 0) {
      return {
        success: false,
        error: "Could not find relevant information in the document.",
      };
    }

    const contextText = relevantChunks
      .map((chunk: any) => chunk.chunk_text)
      .join("\n\n---\n\n");

    // 3. Construct the prompt
    const prompt = `${CHAT_SYSTEM_PROMPT}\n\nContext from the document:\n${contextText}\n\nUser's Question:\n${question}`;

    // 4. Generate response from Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ FIXED
    const result = await model.generateContent([prompt]); // ✅ pass as array
    const response = result.response;
    const answer = response.text();

    return { success: true, answer };
  } catch (error) {
    console.error("Error in askQuestionAction:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      success: false,
      error: `An error occurred while getting the answer: ${errorMessage}`,
    };
  }
}

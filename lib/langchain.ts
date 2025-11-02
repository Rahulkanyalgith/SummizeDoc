import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();

  const arrayBuffer = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([arrayBuffer]));

  const docs = await loader.load();
  //combine all pages
  return docs.map((doc) => doc.pageContent).join("\n");
}

export async function splitTextIntoChunks(text: string) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000, // The maximum size of each chunk
    chunkOverlap: 100, // The number of characters to overlap between chunks
  });

  const chunks = await splitter.splitText(text);
  return chunks;
}

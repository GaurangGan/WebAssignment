"use server";

import { statementParserFlow } from "@/ai/flows/parser";
import type { StatementData } from "./types";

export async function parseStatement(
  prevState: any,
  formData: FormData
): Promise<{ data: StatementData | null; error: string | null }> {
  const file = formData.get("pdf") as File;

  if (!file || file.size === 0) {
    return { data: null, error: "Please select a PDF file to upload." };
  }

  if (file.type !== "application/pdf") {
    return { data: null, error: "Please upload a valid PDF file." };
  }
  
  // Optional: Add file size limit
  const fileSizeLimit = 10 * 1024 * 1024; // 10 MB
  if (file.size > fileSizeLimit) {
    return { data: null, error: `File size exceeds the limit of ${fileSizeLimit / (1024*1024)} MB.` };
  }

  try {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    
    const result = await statementParserFlow(base64);

    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during parsing.";
    return { data: null, error: `Failed to parse statement. Please try another file.` };
  }
}

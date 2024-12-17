"use client";

import { DocumentProvider } from "@/lib/providers/document-provider";
import Editor from "@/components/editor";

export default function Home() {
  return (
    <main className="flex-1 h-full min-h-full flex flex-col justify-stretch">
      <DocumentProvider>
        <Editor />
      </DocumentProvider>
    </main>
  );
}

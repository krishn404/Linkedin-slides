"use client";

import LandingPage from "@/app/LandingPage"; // Adjust the import based on your file structure
import { DocumentProvider } from "@/lib/providers/document-provider";

export default function App() {
  return (
    <DocumentProvider>
      <LandingPage />
    </DocumentProvider>
  );
} 
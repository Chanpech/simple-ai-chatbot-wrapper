"use client"

import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY }); // Make sure to expose this securely in client env

export default function GeminiAIGen() {
  const model = "gemini-2.0-flash";
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const result = await ai.models.generateContent({
        model,
        contents: question,
      });

      setResponse(result.text || "No response from AI.");
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("An error occurred while generating the response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">Ask Gemini AI</h2>
      <p className="text-center text-gray-600 mb-6">Model: <span className="font-semibold">{model}</span></p>

      <textarea
        rows={4}
        placeholder="Type your question here..."
        className="w-full p-4 text-gray-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-700 mb-2">AI Response:</h3>
          <p className="bg-gray-100 p-4 rounded-xl text-gray-800 whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
}

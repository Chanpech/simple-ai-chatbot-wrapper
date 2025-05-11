import Image from "next/image";
import OpenAIGen from "./components/openai";
import GeminiAIGen from "./components/geminiai";


export default async function Home() {
  return (
    <div className="">
      <main className="">
        <GeminiAIGen />
      </main>
      <footer className="">
        
      </footer>
    </div>
  );
}


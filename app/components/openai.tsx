import OpenAI from 'openai';

export default async function  OpenAIGen(){
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
      });
      
      const response = await client.responses.create({
        model: 'gpt-4o',
        instructions: 'You are a coding assistant that talks like a pirate',
        input: 'Are semicolons optional in JavaScript?',
      });
      
    console.log(response.output_text);
    
    return (
        <div>
            {response.output_text}
        </div>
    )

}

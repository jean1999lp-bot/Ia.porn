import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const prompt = formData.get('prompt') as string;

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: "a9758cb4b8154f5c9d163e2e2613528ec7da4a0c0d927a8a10a3d2a1d437f9a3",  // Stable Diffusion 1.5 uncensored (sem filter NSFW)
      input: { 
        prompt,
        num_outputs: 1,
        guidance_scale: 7.5,
        num_inference_steps: 50,
        safety_checker: null  // Remove filter pra permitir +18
      }
    })
  });

  const data = await response.json();
  return NextResponse.json(data);
}

import { NextResponse } from 'next/server';

export async function POST(request) {
  const formData = await request.formData();
  const prompt = formData.get('prompt');

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: "a9758cb4b8154f5c9d163e2e2613528ec7da4a0c0d927a8a10a3d2a1d437f9a3",
      input: { 
        prompt,
        num_outputs: 1,
        guidance_scale: 7.5,
        num_inference_steps: 50
      }
    })
  });

  const data = await response.json();
  return NextResponse.json(data);
}

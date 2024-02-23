import { NextApiRequest, NextApiResponse } from "next";

export default async function generateTestimonial(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  const body = JSON.stringify({
    model: "gpt-3.5-turbo-0125",
    messages: [{ role: "user", content: prompt }],
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });
    const data = await response.json();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

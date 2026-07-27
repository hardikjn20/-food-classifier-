const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

/**
 * Route.js API call se pehle isko check karta hai
 */
export function isApiKeyConfigured() {
  return Boolean(OPENROUTER_API_KEY && !OPENROUTER_API_KEY.includes('your_'));
}

/**
 * Helper: Strip markdown backticks from JSON response
 */
function cleanJsonResponse(text) {
  return text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
}

const PROMPT = `You are an expert Food Quality Inspector and Nutrition Advisor. Visually inspect the provided food image.
Step 1: Verify if the image contains food. If NOT, set status to 'Invalid'.
Step 2: If food, classify as 'Good' (fresh, appealing, cooked properly) or 'Bad' (burnt, spoiled, moldy, rotten, unappealing).
Step 3: Provide a concise 1-2 sentence visual explanation (the "reason").
Step 4: Provide a slightly longer 2-3 sentence "description" covering visual details (color, texture, ingredients visible, cooking level).
Step 5: Provide a short "health_notes" field: a 1-2 sentence opinion on whether this food looks healthy or unhealthy to eat, and why (e.g., "Looks deep-fried and high in oil, better as an occasional treat" or "Fresh vegetables with balanced portions, a healthy choice").
Return strictly a JSON object, with no markdown formatting:
{
  "status": "Good" | "Bad" | "Invalid",
  "food_item": "String",
  "confidence": "High" | "Medium" | "Low",
  "reason": "String",
  "description": "String",
  "health_notes": "String"
}`;

/**
 * DIRECT REST API CALL TO OPENROUTER (Free Vision Model)
 */
export async function analyzeFoodImage(imageBase64, mimeType) {
  if (!isApiKeyConfigured()) {
    throw new Error('OPENROUTER_API_KEY is missing or invalid in .env.local file.');
  }

  try {
    console.log('Sending REST request to OpenRouter API...');

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-nano-12b-v2-vl:free',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: PROMPT },
              {
                type: 'image_url',
                image_url: { url: `data:${mimeType};base64,${imageBase64}` },
              },
            ],
          },
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter raw error response:', JSON.stringify(errorData, null, 2));
      const detail = errorData.error?.metadata?.raw || errorData.error?.message || `HTTP Error ${response.status}`;
      throw new Error(detail);
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content;

    if (!responseText) {
      throw new Error('No analysis text received from OpenRouter API.');
    }

    const cleanedJson = cleanJsonResponse(responseText);
    console.log('✅ OpenRouter Analysis Successful!');
    return JSON.parse(cleanedJson);

  } catch (error) {
    console.error('❌ OpenRouter REST API Error:', error.message);
    throw new Error(`AI Analysis Failed: ${error.message}`);
  }
}
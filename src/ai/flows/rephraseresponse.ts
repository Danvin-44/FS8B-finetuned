export async function rephraseResponse(rawText: string): Promise<string> {
  // Remove junk tags like [REF]...[/REF] and trim excess newlines
  const cleanedText = rawText
    .replace(/\[REF\](.*?)\[\/REF\]/gs, '')  // remove [REF] blocks
    .replace(/\n{2,}/g, '\n')               // collapse multiple newlines
    .trim();

  // Call your rephrase API endpoint (ensure this exists in /api/rephrase/route.ts)
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ text: cleanedText }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  return data.output;
}

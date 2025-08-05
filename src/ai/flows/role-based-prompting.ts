// src/ai/flows/role-based-prompting.ts
import { z } from 'zod';

export const RoleBasedPromptingInputSchema = z.object({
  role: z.string(),
  prompt: z.string().min(3),
});

export type RoleBasedPromptingInput = z.infer<typeof RoleBasedPromptingInputSchema>;

const API_ENDPOINT = 'https://8e23970b6b45.ngrok-free.app/generate'; // ✅ Use latest ngrok URL

export async function roleBasedPrompting(prompt: string, role: string) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, role }),
    });

    const data = await response.json();

    console.log('🔥 Response from backend:', data);

    if (data?.response) {
      return data.response;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('❌ Error in roleBasedPrompting:', error);
    throw error;
  }
}
 
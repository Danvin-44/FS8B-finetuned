import { NextRequest, NextResponse } from 'next/server';
import { roleBasedPrompting, RoleBasedPromptingInputSchema } from '@/ai/flows/role-based-prompting';
import { ROLE_PERMISSIONS } from '@/constants/rbac';

function isPromptAllowed(prompt: string, allowedTopics: string[]): boolean {
  const lcPrompt = prompt.toLowerCase();
  return allowedTopics.some((topic) => lcPrompt.includes(topic.toLowerCase()));
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const input = RoleBasedPromptingInputSchema.parse(json);
    const { prompt, role } = input;

    if (role !== 'Admin') {
      const allowedTopics = ROLE_PERMISSIONS[role] || [];

      if (!isPromptAllowed(prompt, allowedTopics)) {
        return NextResponse.json({
          output: `🚫 Access denied: You are not authorized to ask this type of question as a ${role}.`,
        });
      }
    }

    // This returns { response: '...' } from Flask

    
    try {
      const flaskResponse = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, role }),
      });

      const data = await flaskResponse.json();

      return NextResponse.json({ output: data.response });
    } catch (error) {
      console.error("API error:", error);
      return NextResponse.json(
        { output: "⚠️ Error: Could not connect to the model backend." },
        { status: 500 }
      );
    }


  } catch (error: unknown) {
    console.error('Prompt API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}



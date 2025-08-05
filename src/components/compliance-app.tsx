'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/auth-context';
import { getAuth, signOut } from 'firebase/auth';

export function ComplianceApp() {
  const { user, role } = useAuth();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const auth = getAuth();
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      toast('Logout Failed');
    }
  };

  const handleGetAnswer = async () => {
    if (!question.trim()) {
      toast('Please enter a valid question.');
      return;
    }

    setIsLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/role-based', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, prompt: question }),
      });

      const result = await res.json();

      if (res.ok) {
        if (result.response) {
          setResponse(result.response); // from Flask
        } else if (result.output) {
          setResponse(result.output); // from Genkit or others
        } else {
          setResponse('⚠️ No valid response returned.');
        }
      } else if (result?.error) {
        setResponse(`❌ Error: ${result.error}`);
      } else {
        setResponse('⚠️ Unexpected error occurred.');
      }
     
    } catch (error) {
      console.error('Error fetching response:', error);
      toast('An error occurred while fetching the response.');
      setResponse('⚠️ Error connecting to server.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7] py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">FS8B</h1>
        <p className="text-center text-gray-600 mb-8">
          Your assistant for security and compliance questions.
        </p>

        {/* Input Box */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-900">Ask a Question</h2>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="!bg-transparent !text-gray-500 hover:!bg-gray-100 p-2"
              style={{ minWidth: 0 }}
            >
              <LogOut />
              <span className="sr-only">Logout</span>
            </Button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Your role: <span className="font-medium">{role || 'User'}</span>
          </p>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full h-24 p-3 border border-gray-300 rounded-md mb-4 bg-white"
            placeholder="e.g., What are the key steps in the NIST identify function?"
          />

          <Button
            onClick={handleGetAnswer}
            disabled={!question || isLoading}
            className="w-full bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 rounded-md transition"
          >
            {isLoading ? 'Getting Answer...' : 'Get Answer'}
          </Button>
        </div>

        {/* Output Box */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">AI Response</h2>
          <p className="text-sm text-gray-600 mb-4">
            Tailored to role: <span className="font-medium">{role || 'User'}</span>
          </p>
          <pre className="text-gray-800 whitespace-pre-wrap min-h-[60px]">{response || (isLoading ? 'Analyzing...' : '(AI response will appear here)')}</pre>
        </div>
      </div>
    </main>
  );
}

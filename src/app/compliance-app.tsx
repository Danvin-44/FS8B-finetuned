'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/auth-context'; // adjust if needed

export default function ComplianceApp() {
  const { user } = useAuth(); // ✅ role fetched here
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/role-based', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: user?.role || 'Default User',
          prompt: input,
          temperature: 0.5,
        }),
      });

      const data = await res.json();
      console.log('✅ Raw API response:', data);

      const result = data.rephrasedResponse || data.response;
      console.log('✅ Final Result from API:', result);
 
      if (res.ok && result) {
        setResponse(result);
      } else {
        setError('⚠️ No valid response returned.');
      } 
    } catch (err) {
      console.error('❌ Error calling backend:', err);
      setError('❌ Error calling backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">NIST Compliance Assistant</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          className="border p-2 rounded-md dark:bg-gray-800 dark:text-white"
          placeholder="Enter your compliance-related question..."
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Submit'}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 border rounded bg-green-50 dark:bg-green-900 dark:text-green-100">
          <h2 className="font-semibold mb-2">Response:</h2>
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 border rounded bg-red-50 dark:bg-red-900 dark:text-red-100">
          <strong>{error}</strong>
        </div>
      )}
    </div>
  );
}

"use client";
import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">About</h1>
        <p className="text-center text-gray-600 mb-8">
          This app provides AI-powered compliance and security assistance with a modern, consistent UI.
        </p>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Features</h2>
          <ul className="text-sm text-gray-600 mb-4 list-disc pl-5">
            <li>Google Authentication</li>
            <li>Role-based AI Q&A</li>
            <li>Consistent, light UI theme</li>
            <li>Reusable card layouts</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

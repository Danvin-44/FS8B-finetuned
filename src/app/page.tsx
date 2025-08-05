"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { ComplianceApp } from "../components/compliance-app";

const Page = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f7f7f7] py-10 px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Compliance AI</h1>
            <p className="text-gray-600 mb-4">You must be logged in to view this page.</p>
          </div>
        </div>
      </main>
    );
  }

  return <ComplianceApp />;
};

export default Page;

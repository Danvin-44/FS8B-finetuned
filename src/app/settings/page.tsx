"use client";
import React from "react";
import { useAuth } from "../../contexts/auth-context";

export default function SettingsPage() {
  const { user, role } = useAuth();
  if (!user) {
    return (
      <main className="min-h-screen bg-[#f7f7f7] py-10 px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-gray-600 mb-4">You must be logged in to view this page.</p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#f7f7f7] py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Settings
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Manage your preferences and account settings.
        </p>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">User Info</h2>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Name:</span> {user?.displayName || "-"}
            <br />
            <span className="font-medium">Email:</span> {user?.email || "-"}
            <br />
            <span className="font-medium">Role:</span> {role || "-"}
          </p>
        </div>
      </div>
    </main>
  );
}

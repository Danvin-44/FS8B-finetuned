"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/auth-context";

const Navbar = () => {
  const { user, role, googleSignIn, logOut } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <nav className="w-full bg-[#f7f7f7] border-b border-gray-200 mb-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-bold text-gray-900 hover:text-blue-700 transition"
          >
            FS8B
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-800 hover:text-blue-700 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className="text-gray-800 hover:text-blue-700 transition"
          >
            About
          </Link>
          <Link
            href="/settings"
            className="text-gray-800 hover:text-blue-700 transition"
          >
            Settings
          </Link>
          {user && (
            <button
              className="text-gray-800 hover:text-blue-700 transition"
              onClick={() => {
                if (role === "Admin") {
                  window.location.href = "/admin";
                } else {
                  alert("You must be an admin to access this page.");
                }
              }}
            >
              Admin
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          {loading ? null : !user ? (
            <>
              <button
                onClick={handleSignIn}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Login
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-medium">
                {user.displayName}
              </span>
              <span className="text-xs text-gray-800 bg-gray-100 px-2 py-1 rounded" title="Your UID">
                {user.uid}
              </span>
              {/* Expose user role to window for admin button logic */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.__FS8B_USER_ROLE__ = ${JSON.stringify(window?.__FS8B_USER_ROLE__ ?? (typeof role !== 'undefined' ? role : null))};`
                }}
              />
              <button
                onClick={handleSignOut}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md font-semibold transition"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

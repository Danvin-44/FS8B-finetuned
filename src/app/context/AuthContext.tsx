// src/contexts/auth-context.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulated login from Firestore or Google Auth
  useEffect(() => {
    const fakeUser = {
      id: "abc123",
      email: "user@example.com",
      role: "Security Engineer", // 🔄 Change role to test RBAC
    };
    setUser(fakeUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}; 

export const useAuth = () => useContext(AuthContext);

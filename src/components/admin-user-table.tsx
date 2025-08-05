"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { saveUserToFirestore } from "../services/user";
import { useToast } from "../hooks/use-toast";
import { fetchAllEmpUsers } from "../services/emp";
import { doc, getDoc } from "firebase/firestore";
import { firestore as db } from "../firebase/firebase";
import { useAuth } from "../contexts/auth-context";

const REGULAR_ROLES = [
  "Security Analyst",
  "Security Engineer",
  "Security Architect",
  "Security Administrator",
  "Threat Intelligence",
  "Reverse Engineer",
  "Security Consultant",
];

export type UserWithRole = {
  uid: string;
  Email: string;
  Name: string;
  role?: string;
};

export default function AdminUserTable() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [roles, setRoles] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchAllEmpUsers().then((empUsers) => {
      setUsers(empUsers);
      const initialRoles: Record<string, string> = {};
      empUsers.forEach((u) => {
        if (u.role) initialRoles[u.uid] = u.role;
      });
      setRoles(initialRoles);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const fetchCurrentUserRole = async () => {
      if (!user) return;
      const ref = doc(db, "emp", user.uid);
      const snap = await getDoc(ref);
      const role = snap.exists() ? snap.data().role : "Default User";
      setCurrentUserRole(role);
    };

    fetchCurrentUserRole();
  }, [user]);

  const handleRoleChange = async (uid: string, newRole: string) => {
    setSaving(uid);
    try {
      await saveUserToFirestore(uid, { role: newRole });
      setRoles((prev) => ({ ...prev, [uid]: newRole }));
      toast(`Role updated to: ${newRole}`);
    } catch (e) {
      toast("❌ Failed to update role");
    } finally {
      setSaving(null);
    }
  };

  if (loading || !currentUserRole) return <div className="p-8 text-center">Loading...</div>;

  const roleOptions =
    currentUserRole === "Admin" ? [...REGULAR_ROLES, "Admin"] : REGULAR_ROLES;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs text-gray-500">Name</th>
            <th className="px-4 py-2 text-left text-xs text-gray-500">Email</th>
            <th className="px-4 py-2 text-left text-xs text-gray-500">UID</th>
            <th className="px-4 py-2 text-left text-xs text-gray-500">Role</th>
            <th className="px-4 py-2 text-xs text-gray-500">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((empUser) => (
            <tr key={empUser.uid} className="border-t">
              <td className="px-4 py-2 text-xs text-gray-500 whitespace-nowrap w-auto">{empUser.Name}</td>
              <td className="px-4 py-2 text-xs text-gray-500">{empUser.Email}</td>
              <td className="px-4 py-2 text-xs text-gray-500">{empUser.uid}</td>
              <td className="px-4 py-2 text-xs text-gray-500">
                <select
                  className="border rounded px-2 py-1"
                  value={roles[empUser.uid] || empUser.role || "Default User"}
                  onChange={(e) => handleRoleChange(empUser.uid, e.target.value)}
                  disabled={saving === empUser.uid}
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2">
                {saving === empUser.uid ? (
                  <span className="text-gray-500">Saving...</span>
                ) : (
                  <Button
                    onClick={() =>
                      handleRoleChange(
                        empUser.uid,
                        roles[empUser.uid] || empUser.role || "Default User"
                      )
                    }
                    className="px-2 py-1 text-xs text-gray-500"
                  >
                    Save
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
//d
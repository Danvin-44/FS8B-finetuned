// src/components/lib/rolePermissions.ts

export const rolePermissions = {
  "Security Analyst": ["Identify", "Detect"],
  "Security Engineer": ["Identify", "Protect", "Detect"],
  "Threat Intelligence": ["Detect", "Respond"],
  "Security Administrator": ["Protect", "Respond", "Recover"],
  "Reverse Engineer": ["Detect", "Respond"],
  "Security Consultant": ["Govern", "Protect", "Recover"],
  "Security Architect": ["Govern", "Identify", "Protect", "Recover"],
  "Admin": ["Govern", "Identify", "Protect", "Detect", "Respond", "Recover"]
};

export const hasAccess = (role: string, func: string) => {
  if (!role) return false;
  if (role === "Admin") return true;
  return rolePermissions[role]?.includes(func);
};

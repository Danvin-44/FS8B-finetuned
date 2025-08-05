import { firestore } from "../../firebase/firebase";
import { doc, getDoc, setDoc, Firestore } from "firebase/firestore";

/**
 * Retrieves the role for a given user UID.
 * This function fetches the user's role from the 'users' collection in Firestore.
 * @param uid The user's unique ID from Firebase Authentication.
 * @returns The user's role as a string, or 'Default User' if not found.
 */
export const getRoleForUser = async (uid: string): Promise<string> => {
  if (!uid) {
    return 'Default User';
  }
  try {
    const userDocRef = doc(firestore as Firestore, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData?.role || 'Default User';
    } else {
      return 'Default User';
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'Default User';
  }
};

/**
 * Saves user data to Firestore.
 * @param uid The user's unique ID from Firebase Authentication.
 * @param userData The data to save for the user (e.g., email, role).
 */
export const saveUserToFirestore = async (
  uid: string,
  userData: { email?: string; role?: string }
) => {
  const userDocRef = doc(firestore as Firestore, 'users', uid);
  await setDoc(userDocRef, { ...userData, createdAt: new Date() }, { merge: true });
};

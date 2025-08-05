import { firestore } from "../firebase/firebase";
import { doc, getDocFromServer, setDoc, Firestore } from "firebase/firestore";

export const getRoleForUser = async (uid: string): Promise<string> => {
  if (!uid) {
    return 'Default User';
  }
  try {
    const userDocRef = doc(firestore as Firestore, 'emp', uid);
    // Force fetch from server, not cache
    const userDocSnap = await getDocFromServer(userDocRef);
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

export const saveUserToFirestore = async (
  uid: string,
  userData: { email?: string; role?: string }
) => {
  const userDocRef = doc(firestore as Firestore, 'emp', uid);
  await setDoc(userDocRef, { ...userData, createdAt: new Date() }, { merge: true });
};

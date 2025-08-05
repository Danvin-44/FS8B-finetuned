import { getDoc, setDoc, doc, collection, getDocs } from "firebase/firestore"; 
import { firestore } from "../firebase/firebase";
import { User as FirebaseUser } from "firebase/auth";

const ADMIN_UID = "LW7ccg7w9ZVB7PFrpwoGy3hNbRF3"; // Replace with real admin UID

export const saveUserToEmpCollection = async (user: FirebaseUser) => {
  if (!user) return;

  try {
    const empRef = doc(firestore, "emp", user.uid);
    const snapshot = await getDoc(empRef);

    if (!snapshot.exists()) {
      const role = user.uid === ADMIN_UID ? "Admin" : "Default User";
      const userData = {
        uid: user.uid,
        Name: user.displayName || "No Name",
        Email: user.email || "No Email",
        role,
        createdAt: new Date().toISOString(),
      };

      await setDoc(empRef, userData);
      console.log("🟢 User created in Firestore 'emp' collection");
    } else {
      const existingData = snapshot.data();
      const updates: Record<string, any> = {};

      if (!existingData.Name && user.displayName) updates.Name = user.displayName;
      if (!existingData.Email && user.email) updates.Email = user.email;

      if (user.uid === ADMIN_UID && existingData.role !== "Admin") {
        updates.role = "Admin";
      }

      if (Object.keys(updates).length > 0) {
        await setDoc(empRef, updates, { merge: true });
        console.log("🟡 User metadata updated in Firestore 'emp'");
      } else {
        console.log("🟡 User exists with valid role and info");
      }
    }
  } catch (error) {
    console.error("❌ Error saving user to Firestore:", error);
  }
};

export const fetchAllEmpUsers = async () => {
  try {
    const empCol = collection(firestore, "emp");
    const snapshot = await getDocs(empCol);
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("❌ Failed to fetch emp users:", error);
    return [];
  }
};

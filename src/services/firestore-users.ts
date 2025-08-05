import { collection, getDocs, Firestore } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { UserWithRole } from "../components/admin-user-table";

export async function fetchAllUsersFromFirestore(): Promise<UserWithRole[]> {
  const usersCol = collection(firestore as Firestore, "emp");
  const usersSnap = await getDocs(usersCol);
  return usersSnap.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  })) as UserWithRole[];
}

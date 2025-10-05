'use client';

import { Auth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * This function is for DEVELOPMENT ONLY.
 * It ensures a default admin user exists in Firebase Auth and Firestore.
 * It is designed to be safe to run multiple times.
 */
export async function seedAuthUsers(auth: Auth): Promise<void> {
  // Only run this in development
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Use a flag on the window object to ensure this only runs once per page load,
  // preventing issues with React Strict Mode or hot-reloading.
  if ((window as any).__authUsersSeeded) {
    return;
  }

  const db = getFirestore(auth.app);

  const adminUser = {
    id: 'admin-user',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    displayName: 'Admin User',
  };

  try {
    // 1. Attempt to create the user in Firebase Authentication.
    // This is the most reliable way to check for existence and create if needed.
    const userCredential = await createUserWithEmailAndPassword(auth, adminUser.email, adminUser.password);
    console.log(`✅ Created development auth user for '${adminUser.email}'.`);

    // 2. If creation is successful, create the corresponding Firestore document.
    // This ensures the DB record is only made if the auth user exists.
    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, {
      id: userCredential.user.uid,
      email: adminUser.email,
      role: adminUser.role,
      displayName: adminUser.displayName,
      photoURL: '',
      skills: [],
      headline: '',
      location: '',
      availability: '',
    }, { merge: true });
    console.log(`✅ Created Firestore profile for '${adminUser.email}' with role '${adminUser.role}'.`);

  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      // This is an expected and good state. It means the user already exists in Auth.
      console.log(`✅ Development auth user '${adminUser.email}' already exists.`);
    } else {
      // Log any other unexpected errors during seeding.
      console.error(`Error creating dev auth user '${adminUser.email}':`, error);
    }
  }
  
  // Set the flag to prevent re-running.
  (window as any).__authUsersSeeded = true;
}

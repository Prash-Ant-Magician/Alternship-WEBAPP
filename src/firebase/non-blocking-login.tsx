'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

interface UserProfileData {
  displayName?: string;
  photoURL?: string;
}

/** Initiate email/password sign-up (non-blocking). Defaults role to 'user'. */
export function initiateEmailSignUp(
  authInstance: Auth,
  email: string,
  password: string,
  profileData?: UserProfileData
): void {
  createUserWithEmailAndPassword(authInstance, email, password)
    .then(async (userCredential) => {
      // After user is created, update their profile
      if (userCredential.user) {
        if (profileData) {
            await updateProfile(userCredential.user, profileData);
        }
        
        // Also create a user profile document in Firestore
        const db = getFirestore(authInstance.app);
        const userRef = doc(db, 'users', userCredential.user.uid);
        await setDoc(userRef, {
            email: userCredential.user.email,
            role: 'user', // Always default to 'user'
            id: userCredential.user.uid,
            displayName: profileData?.displayName || userCredential.user.email,
            photoURL: profileData?.photoURL || userCredential.user.photoURL || '',
            skills: [],
            headline: '',
            location: '',
            availability: '',
        }, { merge: true });
      }
    })
    .catch((error) => {
      // Errors are handled by onAuthStateChanged listener, but you can log them here if needed
      if (error.code === 'auth/email-already-in-use') {
         toast({
            variant: 'destructive',
            title: 'Sign Up Failed',
            description: 'An account with this email already exists.',
        });
      } else {
        console.error('Sign up error:', error);
        toast({
            variant: 'destructive',
            title: 'Sign Up Error',
            description: 'An unexpected error occurred. Please try again.',
        });
      }
    });
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(
  authInstance: Auth,
  email: string,
  password: string
): void {
  signInWithEmailAndPassword(authInstance, email, password)
    .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: 'The email or password you entered is incorrect.',
            });
        } else {
            console.error('Sign in error:', error);
             toast({
                variant: 'destructive',
                title: 'Login Error',
                description: 'An unexpected error occurred. Please try again.',
            });
        }
    });
}

/** Initiate password reset email (non-blocking). */
export function initiatePasswordReset(
  authInstance: Auth,
  email: string
): Promise<void> {
  return sendPasswordResetEmail(authInstance, email);
}

/**
 * Initiates Google sign-in (non-blocking). If it's a new user, creates a
 * corresponding user profile in Firestore with a default 'user' role.
 * Preserves existing user roles on subsequent logins.
 */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authInstance, provider)
    .then(async (result) => {
      const user = result.user;
      const db = getFirestore(authInstance.app);
      const userRef = doc(db, 'users', user.uid);

      // Check if the user document already exists
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // New user: Create their profile in Firestore with a default 'user' role
        await setDoc(userRef, {
            email: user.email,
            role: 'user', // Default role for all new Google sign-ins
            id: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            skills: [],
            headline: '',
            location: '',
            availability: '',
        });
        toast({
          title: "Account Created",
          description: "Welcome! Your new account has been successfully created.",
        });
      }
      // If user exists, do nothing. Their existing profile (and role) is preserved.
      // The onAuthStateChanged listener will handle the redirect.
    })
    .catch((error) => {
      console.error('Google sign-in error:', error);
      toast({
          variant: 'destructive',
          title: 'Google Sign-In Failed',
          description: error.message || 'Could not sign in with Google. Please try again.',
      });
    });
}

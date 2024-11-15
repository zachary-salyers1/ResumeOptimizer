import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider, type UserProfile } from '../lib/firebase';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    set({ user: userDoc.data() as UserProfile });
  },

  signUp: async (email: string, password: string, fullName: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    const profile: UserProfile = {
      id: user.uid,
      email,
      fullName,
      preferences: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(doc(db, 'users', user.uid), profile);
    set({ user: profile });
  },

  signInWithGoogle: async () => {
    const { user } = await signInWithPopup(auth, googleProvider);
    
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      const profile: UserProfile = {
        id: user.uid,
        email: user.email!,
        fullName: user.displayName || undefined,
        preferences: {},
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(doc(db, 'users', user.uid), profile);
      set({ user: profile });
    } else {
      set({ user: userDoc.data() as UserProfile });
    }
  },

  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null });
  },

  updateProfile: async (updates) => {
    if (!auth.currentUser) throw new Error('No user logged in');

    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, { ...updates, updatedAt: new Date() });

    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },
}));
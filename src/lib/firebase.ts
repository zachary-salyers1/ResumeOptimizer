import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Database types
export interface Resume {
  id: string;
  userId: string;
  title: string;
  content: string;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface Analysis {
  id: string;
  resumeId: string;
  jobDescription: string;
  score: number;
  keywords: string[];
  suggestions: {
    type: 'missing' | 'improvement' | 'keyword';
    text: string;
    section?: string;
  }[];
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  preferences: {
    defaultTemplate?: string;
    emailNotifications?: boolean;
    theme?: 'light' | 'dark';
  };
  createdAt: Date;
  updatedAt: Date;
}
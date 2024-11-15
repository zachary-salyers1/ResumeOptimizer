import { create } from 'zustand';
import { 
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, type Resume, type Analysis } from '../lib/firebase';
import { auth } from '../lib/firebase';

interface ResumeState {
  resumes: Resume[];
  analyses: Analysis[];
  loading: boolean;
  createResume: (title: string, content: string, file?: File) => Promise<Resume>;
  updateResume: (id: string, updates: Partial<Resume>) => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
  createAnalysis: (resumeId: string, jobDescription: string, results: Omit<Analysis, 'id' | 'resumeId' | 'createdAt'>) => Promise<Analysis>;
  fetchResumes: () => Promise<void>;
  fetchAnalyses: (resumeId: string) => Promise<void>;
}

export const useResumeStore = create<ResumeState>((set, get) => ({
  resumes: [],
  analyses: [],
  loading: false,

  createResume: async (title, content, file) => {
    if (!auth.currentUser) throw new Error('No user logged in');
    set({ loading: true });

    try {
      let fileUrl;
      if (file) {
        const storageRef = ref(storage, `resumes/${auth.currentUser.uid}/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(storageRef);
      }

      const resumeData = {
        userId: auth.currentUser.uid,
        title,
        content,
        fileUrl,
        version: 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'resumes'), resumeData);
      const resume = { id: docRef.id, ...resumeData } as Resume;

      set((state) => ({
        resumes: [...state.resumes, resume],
        loading: false
      }));

      return resume;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateResume: async (id, updates) => {
    set({ loading: true });

    try {
      const resumeRef = doc(db, 'resumes', id);
      await updateDoc(resumeRef, {
        ...updates,
        version: get().resumes.find(r => r.id === id)?.version ?? 1 + 1,
        updatedAt: serverTimestamp()
      });

      set((state) => ({
        resumes: state.resumes.map((resume) =>
          resume.id === id ? { ...resume, ...updates } : resume
        ),
        loading: false
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteResume: async (id) => {
    set({ loading: true });

    try {
      await deleteDoc(doc(db, 'resumes', id));

      set((state) => ({
        resumes: state.resumes.filter((resume) => resume.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  createAnalysis: async (resumeId, jobDescription, results) => {
    set({ loading: true });

    try {
      const analysisData = {
        resumeId,
        jobDescription,
        ...results,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'analyses'), analysisData);
      const analysis = { id: docRef.id, ...analysisData } as Analysis;

      set((state) => ({
        analyses: [...state.analyses, analysis],
        loading: false
      }));

      return analysis;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  fetchResumes: async () => {
    if (!auth.currentUser) throw new Error('No user logged in');
    set({ loading: true });

    try {
      const q = query(
        collection(db, 'resumes'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const resumes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resume[];

      set({ resumes, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  fetchAnalyses: async (resumeId) => {
    set({ loading: true });

    try {
      const q = query(
        collection(db, 'analyses'),
        where('resumeId', '==', resumeId),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const analyses = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Analysis[];

      set({ analyses, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));
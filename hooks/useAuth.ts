// hooks/useAuth.ts

'use client';

import { useState, useEffect } from 'react';
// This is the new, correct way to import our Firebase instances
import { getFirebase } from '@/lib/firebase';

// Using a generic type for the Firebase user object from the CDN
type FirebaseUser = any; 

// The complete UserData interface with the 'grade' field
interface UserData {
  uid: string;
  role: 'student' | 'teacher';
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
  grade: string; // Grade is included
  createdAt: string;
  lastLogin: string;
  avatar?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We get the Firebase instances safely inside useEffect
    const { auth, db } = getFirebase();

    // If Firebase isn't ready for any reason, we stop loading and exit.
    if (!auth || !db) {
      setLoading(false);
      return;
    }
    
    // This listener now safely uses the initialized 'auth' object
    const unsubscribe = auth.onAuthStateChanged(async (user: FirebaseUser) => {
      if (user) {
        setUser(user);
        const userDocRef = db.collection('users').doc(user.uid);
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
          const data = userDoc.data() as UserData;
          setUserData(data);
          // Update last login time
          await userDocRef.update({ lastLogin: new Date().toISOString() });
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // Get instances inside the function to ensure they are ready
    const { auth, db } = getFirebase();
    if (!auth || !db) throw new Error("Firebase is not available.");

    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    const userDocRef = db.collection('users').doc(user.uid);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) throw new Error('User data not found');
    
    const userData = userDoc.data() as UserData;
    await userDocRef.update({ lastLogin: new Date().toISOString() });
    setUserData(userData);
    
    return { user, userData };
  };

  const signup = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    phone: string,
    grade: string // The grade parameter is included
  ) => {
    const { auth, db } = getFirebase();
    if (!auth || !db) throw new Error("Firebase is not available.");

    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    const userData: UserData = {
      uid: user.uid,
      role: 'student',
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phone,
      email,
      grade, // The grade is saved here
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    await db.collection('users').doc(user.uid).set(userData);
    setUserData(userData);
    
    return { user, userData };
  };
  
  const updateUserProfile = async (profileData: { firstName: string, lastName: string, phone: string }) => {
    const { db } = getFirebase();
    if (!db || !user) throw new Error("User not authenticated or Firebase unavailable.");

    const userDocRef = db.collection('users').doc(user.uid);
    await userDocRef.update({
        ...profileData,
        fullName: `${profileData.firstName} ${profileData.lastName}`,
    });
    // Optimistically update local state
    setUserData(prev => prev ? { ...prev, ...profileData, fullName: `${profileData.firstName} ${profileData.lastName}` } : null);
  };


  const logout = async () => {
    const { auth } = getFirebase();
    if (!auth) throw new Error("Firebase is not available.");

    await auth.signOut();
    setUser(null);
    setUserData(null);
  };

  return { user, userData, loading, login, signup, logout, updateUserProfile };
};
// lib/firebase.ts

// Extend the Window interface to include Firebase
declare global {
  interface Window {
    firebase: any;
  }
}

// We keep these outside the function so they act like a singleton.
// This ensures Firebase is only initialized ONCE.
let app: any;
let auth: any;
let db: any;
let storage: any;

// Add a flag to track if Firebase is currently being initialized
let isInitializing = false;

/**
 * A robust function to get the initialized Firebase instances.
 * It waits for the CDN script to load and initializes Firebase only once.
 */
export const getFirebase = () => {
  // If we've already initialized, just return the existing instances.
  if (app) {
    return { app, auth, db, storage };
  }

  // This check is crucial. It only runs on the client-side.
  if (typeof window !== 'undefined') {
    // Check if the global 'firebase' object from the CDN is available.
    if (window.firebase && !isInitializing) {
      isInitializing = true;
      
      try {
        const firebaseConfig = {
          apiKey: "AIzaSyBfN0ci74w2zpeFcglQMSSvgKZ-zq2VK0w",
          authDomain: "edumathghana-817d5.firebaseapp.com",
          projectId: "edumathghana-817d5",
          storageBucket: "edumathghana-817d5.firebasestorage.app",
          messagingSenderId: "602430791823",
          appId: "1:602430791823:web:b2b2122fd43ec646b2d0fa",
          measurementId: "G-2TJ8FNDQS6"
        };
        
        // Initialize Firebase and store the instances
        app = window.firebase.initializeApp(firebaseConfig);
        auth = window.firebase.auth();
        db = window.firebase.firestore();
        storage = window.firebase.storage();

        isInitializing = false;
        return { app, auth, db, storage };

      } catch (error) {
        console.error("Error initializing Firebase:", error);
        isInitializing = false;
        return { app: null, auth: null, db: null, storage: null };
      }

    } else if (!window.firebase) {
      // This case handles the race condition if a component tries to get Firebase
      // before the CDN script has loaded. It shouldn't happen if components
      // use it inside useEffect or event handlers, but it's a safe fallback.
      console.warn("Firebase CDN script has not loaded yet. Make sure Firebase scripts are loaded before using Firebase.");
      return { app: null, auth: null, db: null, storage: null };
    }
  }

  // Return nulls if on the server
  return { app: null, auth: null, db: null, storage: null };
};

// Add a helper function to check if Firebase is ready
export const isFirebaseReady = (): boolean => {
  return typeof window !== 'undefined' && !!window.firebase && !!app;
};

// Add a helper function to wait for Firebase to be ready
export const waitForFirebase = (timeout = 5000): Promise<boolean> => {
  return new Promise((resolve) => {
    if (isFirebaseReady()) {
      resolve(true);
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isFirebaseReady()) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        console.warn("Firebase failed to load within timeout period");
        resolve(false);
      }
    }, 100);
  });
};
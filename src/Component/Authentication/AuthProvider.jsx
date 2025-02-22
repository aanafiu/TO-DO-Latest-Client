import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "./firebase.config";
import Loading from "../Loading";
export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [myDetails, setMyDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // User Loader All Time
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("i am on userff", currentUser);
      setMyDetails(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // PhonePass Register
  const registerNewAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Google Login or Signup User
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    // //console.log("i am here");

    return signInWithPopup(auth, provider);
  };

  //   Login With email and password
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

    //   Update Information
    const updateDetails = (name) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
        });
      };

  // Sign Out
  const logOutUser = () => {
    return signOut(auth);
  };

  // Pass Information
  const userInfo = {
    myDetails,
    updateDetails,
    registerNewAccount,
    loginWithGoogle,
    loginUser,
    logOutUser,
    loading,
    setLoading
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState } from "react";
// import PropTypes from 'prop-types'
import {
  FacebookAuthProvider,
  updateProfile,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// import auth from "../../Firebase/firebase.config";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { auth } from "../../firebase/firebase.config";
export const AuthContext = createContext<any>({});
type AuthProps = {
  children: React.ReactNode;
};
export default function AuthProvider({ children }: AuthProps) {
  // const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [showText, setShowText] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // facebook login
  const facebookLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };
  // Update Profile:
  const handleUpdateProfile = (lastName: string, image: string , firstName : string) => {
    const currentUser = auth.currentUser;
    if (currentUser !== null) {
      return updateProfile(currentUser!, {
        displayName:firstName+" "+lastName,
        photoURL: image,
      });
    } else {
      return Promise.reject("User is not logged in.");
    }
  };

  // const updateUserProfile = (name : string) => {
  //     return updateProfile(auth.currentUser , {
  //         displayName: name,
  //         //  photoURL: image
  //     })
  // }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    googleLogin,
    githubLogin,
    facebookLogin,
    handleUpdateProfile,
    searchText,
    setSearchText,
    setShowText,
    showText,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

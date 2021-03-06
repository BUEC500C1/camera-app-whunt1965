//Source: https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/
import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});//provide Auth context for the app

//Handle Login, logout and register
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            try {
              await auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
            }
          },
          register: async (email, password) => {
            try {
              await auth().createUserWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
            }
          },
          logout: async () => {
            try {
              await auth().signOut();
            } catch (e) {
              console.error(e);
            }
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
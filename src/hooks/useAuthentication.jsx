import { auth } from "../firebase/config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // clean up
  // deal with memory leaks
  const [cancelled, setCancelled] = useState(false);

  //const auth = getAuth(app);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // register
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.displayName });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "Senha deve conter no mínimo 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro tente mais tarde";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  // logout - signout
  const logout = async () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  // login - signin
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("auth/user-not-found")) {
        systemErrorMessage = "Usuário não cadastrado";
      } else if (error.message.includes("auth/wrong-password")) {
        systemErrorMessage = "Senha incorreta";
      } else if (error.message.includes("auth/invalid-email")) {
        systemErrorMessage = "E-mail inválido";
      } else if (error.message.includes("auth/invalid-credential")) {
        systemErrorMessage =
          "Credenciais inválidas. Verifique seu e-mail e senha.";
      } else {
        systemErrorMessage = "Ocorreu um erro. Tente mais tarde.";
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};

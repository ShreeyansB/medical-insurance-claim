import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState();

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(event);
        console.log();
        setEvent(event);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    update: (data) => supabase.auth.update(data),
    signOut: () => supabase.auth.signOut(),
    user,
    event,
    emitEvent: (data) => setEvent(data),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

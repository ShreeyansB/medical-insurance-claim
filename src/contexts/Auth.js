import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState();
  const [role, setRole] = useState("...");
  const [name, setName] = useState("...");

  const getRole = async () => {
    if (supabase.auth.user()) {
      const { data, error } = await supabase.from("users").select().match({
        id: supabase.auth.user().id,
      });
      if (error) {
        console.log(error);
        return;
      }
      setName(data[0].name);
      setRole(data[0].type);
    }
  };

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    getRole();
    setLoading(false);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(event);
        console.log();
        setEvent(event);
        setUser(session?.user ?? null);
        getRole();
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
    name,
    role,
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

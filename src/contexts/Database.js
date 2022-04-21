import { SHA256 } from "crypto-js";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { supabase } from "./../supabaseClient";

const DBContext = React.createContext();

export function DBProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [reloadCtr, setReloadCtr] = useState(0);
  const [tokenData, setTokenData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("typesecrets").select();
      setTokenData(data);
      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, [reloadCtr]);

  const value = {
    userData: userData,
    tokenData: tokenData,
    setUserDataOnSignUp: async (user, formData) => {
      const { error } = await supabase.from("users").insert([
        {
          id: user.id,
          name: formData.name,
          email: formData.email,
          type: formData.accountType,
        },
      ]);
    },
    reset: () => {
      setUserData([]);
      setReloadCtr((prev) => prev + 1);
    },
  };

  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
}

export function useDB() {
  return useContext(DBContext);
}

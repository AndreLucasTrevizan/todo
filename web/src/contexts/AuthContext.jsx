import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [signed, setSigned] = useState(null);
  const [dateFilter, setDateFilter] = useState();

  useEffect(() => {
    function checkSigned() {
      const storage = localStorage.getItem('signed');

      if (storage) {
        setSigned(JSON.parse(storage));
      }
    }

    checkSigned();
  }, []);

  return (
    <AuthContext.Provider value={{
      setSigned,
      signed,
      dateFilter,
      setDateFilter
    }}>
      {children}
    </AuthContext.Provider>
  );
}

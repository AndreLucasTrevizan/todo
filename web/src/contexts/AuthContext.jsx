import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [signed, setSigned] = useState(null);

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
      signed,
      setSigned
    }}>
      {children}
    </AuthContext.Provider>
  );
}

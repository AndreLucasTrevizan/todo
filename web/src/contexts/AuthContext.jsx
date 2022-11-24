import React, { useState, useEffect, createContext, useContext } from 'react';

export const AuthContext = createContext({});

export const useDate = () => {
  const { filterDate, handleFilterDate } = useContext(AuthContext);

  return { filterDate, handleFilterDate };
};

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
      setSigned,
      signed,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

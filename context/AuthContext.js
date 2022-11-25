import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import _ from 'lodash';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const router = useRouter();
  const [cookies, setCookies] = useCookies(['user']);

  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const { userData } = cookies;

    if (_.isEmpty(userData)) {
      router.push({ pathname: '/login' });
    } else setLogin(true);
  }, []);

  function logout(event) {
    event.preventDefault();

    try {
      console.log('Logging out...');
      setCookies('userData', {}, { expires: new Date(0) });
      router.push({ pathname: '/login' });
    } catch (err) {
      console.log('Logout error:', err);
      showLogoutErrorModal(true);
    }
  }

  return (
    <AuthContext.Provider value={{ logout }}>
      {isLogin ? children : null}
    </AuthContext.Provider>
  );
}

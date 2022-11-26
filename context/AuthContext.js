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
    const { employeeId } = cookies;

    if (_.isNull(employeeId) || _.isEmpty(employeeId) || _.isUndefined(employeeId)) {
      router.push({ pathname: '/login' });
    } else setLogin(true);
  }, []);

  function logout() {
    try {
      console.log('Logging out...');
      setCookies('employeeId', '', { expires: new Date(0) });
      router.push({ pathname: '/login' });
    } catch (err) {
      console.log('Logout error:', err);
    }
  }

  return (
    <AuthContext.Provider value={{ logout }}>
      {isLogin ? children : null}
    </AuthContext.Provider>
  );
}

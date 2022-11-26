import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import _ from 'lodash';
import { useCookies } from 'react-cookie';

export const AdminAuthContext = createContext({});

export function AdminAuthProvider({ children }) {
  const router = useRouter();
  const [cookies, setCookies] = useCookies();

  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const { adminId } = cookies;

    console.log(cookies);
    if (_.isNull(adminId) || _.isEmpty(adminId) || _.isUndefined(adminId)) {
      router.push({ pathname: '/admin/login' });
    } else setLogin(true);
  }, []);

  function logout() {
    try {
      console.log('Admin logging out...');
      setCookies('adminId', '', { expires: new Date(0) });
      router.push({ pathname: '/admin/login' });
    } catch (err) {
      console.log('Admin logout error:', err);
    }
  }

  return (
    <AdminAuthContext.Provider value={{ logout }}>
      {isLogin ? children : null}
    </AdminAuthContext.Provider>
  );
}

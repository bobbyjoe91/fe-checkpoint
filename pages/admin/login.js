import React, { useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import axios from 'axios';
import dayjs from 'dayjs';
import { Button, Form } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

import Footer from '../../components/Footer';

export default function Login() {
  const router = useRouter();

  const [cookies, setCookies] = useCookies();
  const [loginError, setLoginError] = useState('');

  function onAdminLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    axios.post('http://localhost:8000/auth/admin/login', { email, password })
      .then((response) => {
        setCookies(
          'adminId',
          response.data.data.employee_id,
          { expires: dayjs().add(4, 'hour').toDate() }
        );
        router.push({ pathname: '/admin' });
      })
      .catch((error) => {
        console.error(error);

        if (error.response.status === 403) {
          setLoginError(error.response.data.data);
        } else {
          setLoginError('Terjadi kesalahan. Silakan coba lagi');
        }
      });
  }

  return (
    <>
      <Head>
        <title>CheckPoint | Admin Login</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <div className="container">
        <main className="main d-flex justify-content-center align-items-center">
          <div>
            <div id="main-form">
              <h1 className="text-center">CheckPoint | Admin</h1>
              <Form onSubmit={onAdminLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control id="email" name="email" placeholder="employee@company.com" type="email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control id="password" name="password" type="password" />
                </Form.Group>

                {loginError ? <p id="error">{loginError}</p> : null}

                <div className="clearfix">
                  <Button type="submit" className="float-end" variant="dark">
                    Log in
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
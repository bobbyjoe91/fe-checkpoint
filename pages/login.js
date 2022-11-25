import React, { useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

import Footer from '../components/Footer';

export default function Login() {
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  function onLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    axios.post('http://localhost:8000/auth/login', { email, password })
      .then((response) => {
        console.log(response);
        router.push({ pathname: '/' });
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
        <title>CheckPoint | Login</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <div className="container">
        <main className="main d-flex justify-content-center align-items-center">
          <div>
            <div id="main-form">
              <h1 className="text-center">CheckPoint</h1>
              <Form onSubmit={onLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control id="email" name="email" placeholder="employee@company.com" type="email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control id="password" name="password" type="password" />
                </Form.Group>

                <div className="login-register">
                  <p className="cta-redirect">
                    Belum punya akun? {' '}
                    <Link href="/register" className="register">Daftar</Link>
                  </p>
                  <Button type="submit" variant="dark">
                    Log in
                  </Button>
                </div>
              </Form>

              { loginError ? <p id="error">{loginError}</p> : null }
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
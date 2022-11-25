import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Form } from 'react-bootstrap';

import Footer from '../components/Footer';

export default function Login() {
  const router = useRouter();

  function toIndex() {
    router.push({ pathname: '/' });
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
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control placeholder="employee@company.com" type="email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>

                <div className="login-register">
                  <p>
                    Belum punya akun? {' '}
                    <Link href="/register" className="register">Daftar</Link>
                  </p>
                  <Button variant="dark" onClick={toIndex}>
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
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Form } from 'react-bootstrap';

import Footer from '../components/Footer';

export default function Login() {
  const router = useRouter();

  function toLogin() {
    router.push({ pathname: '/login' });
  }

  return (
    <>
      <Head>
        <title>CheckPoint | Login</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <div className="container">
        <main className="main d-flex justify-content-center align-items-center pt-5 pb-5">
          <div id="main-form">
            <h1 className="text-center">Mendaftar ke CheckPoint</h1>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control placeholder="Nama karyawan" type="text" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nomor ponsel</Form.Label>
                <Form.Control placeholder="087888990023" type="tel" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="employee@company.com" type="email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Konfirmasi password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload foto profil</Form.Label>
                <Form.Control type="file" name="profile-pic" accep="image/*" />
              </Form.Group>

              <div className="login-register">
                <p className="cta-redirect">
                  Sudah punya akun? {' '}
                  <Link href="/login" className="register">Masuk</Link>
                </p>
                <Button variant="dark" onClick={toLogin}>
                  Daftar
                </Button>
              </div>
            </Form>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
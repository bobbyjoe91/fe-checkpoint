import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Form } from 'react-bootstrap';

import Footer from '../../components/Footer';
import TopNavbar from '../../components/TopNavbar';

export default function CreateEmployee() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>CheckPoint | Buat karyawan</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <TopNavbar title="CheckPoint | Admin" isAdmin />
      <div className="container">
        <main className="main d-flex justify-content-center align-items-center pt-5 pb-5">
          <div id="main-form">
            <h1 className="text-center">Membuat karyawan baru</h1>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control placeholder="Nama karyawan baru" type="text" />
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
                <Form.Label>Password sementara</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Konfirmasi password sementara</Form.Label>
                <Form.Control type="password" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload foto profil</Form.Label>
                <Form.Control type="file" name="profile-pic" accep="image/*" />
              </Form.Group>

              <div className="clearfix">
                <Button className="float-end" variant="success">
                  Daftarkan
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
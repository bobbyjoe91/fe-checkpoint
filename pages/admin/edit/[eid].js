import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button, Form } from 'react-bootstrap';

import Footer from '../../../components/Footer';
import ProfilePicture from '../../../components/ProfilePicture';
import TopNavbar from '../../../components/TopNavbar';

export default function CreateEmployee() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>CheckPoint | Edit karyawan</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <TopNavbar title="CheckPoint | Admin" isAdmin />
      <div className="container">
        <main className="main d-flex justify-content-center align-items-center pt-5 pb-5">
          <div id="main-form">
            <h2>Edit karyawan</h2>
            <Form>
              <div className="d-flex justify-content-center mb-3">
                <ProfilePicture
                  src={null}
                  alt="John Doe's Profile Picture"
                />
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Ubah foto profil</Form.Label>
                <Form.Control type="file" name="profile-pic" accep="image/*" />
              </Form.Group>
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

              <div className="clearfix">
                <Button className="float-end" variant="success">
                  Ubah karyawan
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
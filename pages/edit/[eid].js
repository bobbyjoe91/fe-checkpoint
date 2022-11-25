import Head from "next/head";
import { useRouter } from "next/router";

import { Button, Form } from "react-bootstrap";

import Footer from '../../components/Footer';
import ProfilePicture from "../../components/ProfilePicture";
import TopNavbar from "../../components/TopNavbar";

export default function Edit() {
  const router = useRouter();
  const { eid } = router.query;

  function onChangePassword(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('passwordConfirmation').value;

    // TODO: put password to http://localhost:8000/auth/reset-password
  }

  function onChangePersonalData() {

  }

  return (
    <>
      <Head>
        <title>CheckPoint | Edit profil</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <TopNavbar employeeId={1} />
      <div className="container">
        <main className="main d-flex justify-content-center align-items-center pt-5 pb-5">
          <div>
            <div id="main-form" className="mb-5">
              <h2>Ubah foto dan nomor ponsel</h2>
              <Form>
                <ProfilePicture
                  src={null}
                  alt="John Doe's Profile Picture"
                />
                <Form.Group className="mb-3">
                  <Form.Label>Upload foto profil</Form.Label>
                  <Form.Control type="file" name="profile-pic" accep="image/*" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nomor ponsel</Form.Label>
                  <Form.Control placeholder="087888990023" type="tel" />
                </Form.Group>
              </Form>

              <div className="clearfix">
                <Button variant="success" className="float-end" onClick={onChangePersonalData}>
                  Ubah
                </Button>
              </div>
            </div>

            <div id="main-form">
              <h2>Ubah password</h2>
              <Form onSubmit={onChangePassword}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Konfirmasi password</Form.Label>
                  <Form.Control
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                  />
                </Form.Group>

                <div className="clearfix">
                  <Button type="submit" className="float-end" variant="warning">
                    Ubah password
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

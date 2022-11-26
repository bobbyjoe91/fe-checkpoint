import React, { useState } from 'react';

import Head from "next/head";
import { useRouter } from "next/router";

import axios from 'axios';
import { Button, Form } from "react-bootstrap";
import { useCookies } from 'react-cookie';

import { AuthProvider } from '../../context/AuthContext';

import Footer from '../../components/Footer';
import ProfilePicture from "../../components/ProfilePicture";
import TopNavbar from "../../components/TopNavbar";

export default function Edit() {
  const router = useRouter();
  const { eid } = router.query;

  const [cookies, setCookies] = useCookies();

  const [changePassSuccess, setChangePassSuccess] = useState(false);
  const [changePassError, setChangePassError] = useState('');

  function onChangePassword(event) {
    event.preventDefault();
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const newPasswordConfirmation = document.getElementById('newPasswordConfirmation').value;

    if (newPassword !== newPasswordConfirmation) {
      setChangePassError('Password tidak cocok');
      setChangePassSuccess(false);
    } else {
      axios.put(
        'http://localhost:8000/auth/reset-password',
        {
          employeeId: cookies.employeeId,
          oldPassword,
          newPassword,
        }
      )
        .then(() => {
          setChangePassSuccess(true);
          setChangePassError('');
        })
        .catch((error) => {
          console.error(error);
          setChangePassError(error.response.data.data);
          setChangePassSuccess(false);
        });
    }
  }

  function onChangePersonalData() {

  }

  return (
    <AuthProvider>
      <Head>
        <title>CheckPoint | Edit profil</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <TopNavbar employeeId={eid} />
      <div className="container">
        <main className="main d-flex justify-content-center align-items-center pt-5 pb-5">
          <div>
            <div id="main-form" className="mb-5">
              <h2>Ubah foto dan nomor ponsel</h2>
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
                  <Form.Label>Password lama</Form.Label>
                  <Form.Control type="password" id="oldPassword" name="oldPassword" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password baru</Form.Label>
                  <Form.Control type="password" id="newPassword" name="newPassword" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Konfirmasi password baru</Form.Label>
                  <Form.Control
                    type="password"
                    id="newPasswordConfirmation"
                    name="newPasswordConfirmation"
                  />
                </Form.Group>

                {changePassError ? <p id="error">{changePassError}</p> : null}
                {
                  changePassSuccess
                    ? <p className="text-success">Password berhasil diubah</p>
                    : null
                }

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
    </AuthProvider>
  );
}

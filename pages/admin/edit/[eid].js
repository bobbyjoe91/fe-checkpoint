import React, { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import axios from 'axios';
import _ from 'lodash';
import { Button, Form } from 'react-bootstrap';

import { AdminAuthProvider } from '../../../context/AdminAuthContext';
import { DIVISIONS, POSITIONS } from '../../../utils/constant';

import Footer from '../../../components/Footer';
import ProfilePicture from '../../../components/ProfilePicture';
import TopNavbar from '../../../components/TopNavbar';

export default function EditEmployee({ swrUserData }) {
  const router = useRouter();
  const { eid } = router.query;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!_.isEmpty(swrUserData)) {
      setUserData({ ...swrUserData });
    }
  }, [swrUserData]);

  function onEditEmployee(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const positionId = document.getElementById('positionId').value;
    const divisionId = document.getElementById('divisionId').value;
    const profilePic = document.getElementById('profilePic').files;

    let formData = new FormData();

    if (profilePic.length) {
      formData.append('profilePic', profilePic[0]);
    }

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('positionId', Number(positionId));
    formData.append('divisionId', Number(divisionId));

    axios.put(`http://localhost:8000/admin/employee/edit/${eid}`, formData)
      .then(() => router.push({ pathname: '/admin' }))
      .catch((error) => {
        console.error(error);
      });
  }

  function onChangeForm(event, key) {
    event.preventDefault();
    const newUserData = { ...userData };
    newUserData[key] = event.target.value;

    setUserData({ ...newUserData });
  }

  return (
    <AdminAuthProvider>
      <Head>
        <title>CheckPoint | Edit karyawan</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <TopNavbar title="CheckPoint | Admin" isAdmin />
      <div className="container">
        <main className="main d-flex justify-content-center align-items-center pt-5 pb-5">
          <div id="main-form">
            <h2>Edit karyawan</h2>
            <Form onSubmit={onEditEmployee}>
              <div className="d-flex justify-content-center mb-3">
                <ProfilePicture
                  src={userData.photo_url}
                  alt={`${userData.name}'s Profile Picture`}
                />
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Ubah foto profil</Form.Label>
                <Form.Control id="profilePic" type="file" name="profile-pic" accep="image/*" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  id="name"
                  placeholder="Nama karyawan"
                  type="text"
                  value={userData.name}
                  onChange={(event) => onChangeForm(event, "name")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nomor ponsel</Form.Label>
                <Form.Control
                  id="phoneNumber"
                  placeholder="087888990023"
                  type="tel"
                  value={userData.phone_number}
                  onChange={(event) => onChangeForm(event, "phone_number")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  id="email"
                  placeholder="employee@company.com"
                  type="email"
                  value={userData.email}
                  onChange={(event) => onChangeForm(event, "email")}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Jabatan</Form.Label>
                <Form.Select
                  id="positionId"
                  aria-label="Jabatan"
                  value={userData.position_id}
                  onChange={(event) => onChangeForm(event, "position_id")}
                >
                  <option hidden>Pilih jabatan</option>
                  {
                    Object.keys(POSITIONS).map(positionId => (
                      <option
                        key={POSITIONS[positionId] + positionId}
                        value={positionId}
                      >
                        {POSITIONS[positionId]}
                      </option>
                    ))
                  }
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Divisi</Form.Label>
                <Form.Select
                  id="divisionId"
                  aria-label="Divisi"
                  value={userData.division_id}
                  onChange={(event) => onChangeForm(event, "division_id")}
                >
                  <option hidden>Pilih divisi</option>
                  {
                    Object.keys(DIVISIONS).map(divisionId => (
                      <option
                        key={DIVISIONS[divisionId] + divisionId}
                        value={divisionId}
                      >
                        {DIVISIONS[divisionId]}
                      </option>
                    ))
                  }
                </Form.Select>
              </Form.Group>

              <div className="clearfix">
                <Button type="submit" className="float-end" variant="success">
                  Ubah karyawan
                </Button>
              </div>
            </Form>
          </div>
        </main>
      </div>

      <Footer />
    </AdminAuthProvider>
  );
}

export async function getServerSideProps(context) {
  const response = await axios.get(`http://localhost:8000/employee/${context.query.eid}`);

  return ({
    props: { swrUserData: response.data.data[0] }
  });
}
import Head from 'next/head';
import Image from 'next/image';

import { Button, Pagination, Table } from 'react-bootstrap';

import Footer from '../components/Footer';
import styles from '../styles/custom/Index.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>CheckPoint | Home</title>
        <meta name="description" content="CheckPoint" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <div className="d-none d-md-flex align-items-md-center">
            <Image
              src="/assets/blank.png"
              width={100}
              height={100}
              className="profile-pic"
              alt="John Doe's Profile Picture"
            />

            <div id="profile-data" className="d-none d-md-flex flex-column justify-content-md-evenly">
              <h1 className={styles.title}>John Doe</h1>
              <p>Human Resource Development | Staff</p>
            </div>
          </div>

          <div className="d-block d-sm-block d-md-none">
            <div id="profile">
              <Image
                src="/assets/blank.png"
                width={100}
                height={100}
                className="profile-pic"
                alt="John Doe's Profile Picture"
              />
              <h1 className={styles.title}>John Doe</h1>
              <p className="department">Human Resource Development</p>
              <p>Staff</p>
            </div>
          </div>

          <div id="clock-in-out">
            <Button varian="primary" style={{ marginRight: '10px' }}>Clock In</Button>
            <Button variant="warning" disabled>Clock Out</Button>
          </div>

          {/* daterange filter */}
          <div
            style={{ margin: '10px 0' }}
            className="d-none d-md-flex flex-row justify-content-md-between"
          >
            <p>Filter berdasarkan tanggal</p>
            <div id='filter'>
              <div>
                <label className='filter-label'>Dari:</label>
                <input type="date" />
              </div>
              <div style={{ width: '10px' }}/>
              <div>
                <label className='filter-label'>Hingga:</label>
                <input type="date" />
              </div>
            </div>
          </div>

          <div className="d-block d-sm-block d-md-none">
            <div style={{ height: '20px' }}/>
            <p>Filter berdasarkan tanggal</p>
            <div style={{ height: '10px' }} />
            <div
              style={{ marginBottom: '10px' }}
              className="d-flex flex-row justify-content-between justify-content-between flex-wrap"
            >
              <div>
                <label className='filter-label'>Dari:</label>
                <input type="date" />

                <div className="d-block d-sm-none" style={{ height: '10px' }} />
              </div>
              <div>
                <label className='filter-label'>Hingga:</label>
                <input type="date" />
              </div>
            </div>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Clock In</th>
                <th>Clock Out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2022-10-10</td>
                <td>07:30:00</td>
                <td>18:00:05</td>
              </tr>
              <tr>
                <td>2022-10-10</td>
                <td>07:30:00</td>
                <td>18:00:05</td>
              </tr>
              <tr>
                <td>2022-10-10</td>
                <td>07:30:00</td>
                <td>18:00:05</td>
              </tr>
              <tr>
                <td>2022-10-10</td>
                <td>07:30:00</td>
                <td>18:00:05</td>
              </tr>
            </tbody>
          </Table>

          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

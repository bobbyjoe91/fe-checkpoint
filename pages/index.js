import Head from 'next/head';
import Image from 'next/image';

import { Pagination, Table } from 'react-bootstrap';

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
          <Image
            src="/assets/blank.png"
            width={128}
            height={128}
            alt="John Doe's Profile Picture"
          />
          <h1 className={styles.title}>John Doe</h1>
          <p>Human Resource Development | Staff</p>

          {/* daterange filter */}
          <div id="date-range-filter">
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

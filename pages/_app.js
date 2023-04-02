/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Akezhan Kaliyev Student ID: 1255988212 Date: 19.03.2023
*
*
********************************************************************************/ 
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../components/Layout'
import { SWRConfig } from 'swr'
import { SSRProvider } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <SSRProvider>
    <Layout>
      <SWRConfig value={{
        fetcher:
          async url => {
            const res = await fetch(url)

            if (!res.ok) {
              const error = new Error('An error occurred while fetching the data.')
              error.info = await res.json()
              error.status = res.status
              throw error
            }
            return res.json()
          }
      }}>

        <Component {...pageProps} />
      </SWRConfig>
      </Layout>
    </SSRProvider>
    </>
  );
}

export default MyApp

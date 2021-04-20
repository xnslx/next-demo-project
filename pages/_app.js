import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import Notification from '../components/ui/notification';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Component {...pageProps }/>
            <Notification title="Test" message="This is a test" status="pending"/>
        </Layout>
    )
}

export default MyApp
import type { NextPage } from 'next';
import Head from 'next/head';
import { Form } from '../components/Form';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>URL Shortener</title>
                <meta name="description" content="Get on Aimlab" />
            </Head>

            <main className="container mx-auto flex items-center justify-center min-h-screen p-4">
                <Form />
            </main>
        </>
    );
};

export default Home;

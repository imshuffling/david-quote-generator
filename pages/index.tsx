import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Quote {
  text: string;
  author: string;
}

function getRandomQuote(quotes: string | any[]) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

const Home: NextPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState<Quote>({ text: '', author: '' });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://type.fit/api/quotes');
      const json = await res.json();
      setQuotes(json);
      setQuote(json[0]);
    }
    fetchData();
  }, []);

  function getNewQuote() {
    setQuote(getRandomQuote(quotes));
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>Davids Quote generator</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900'
          rel='stylesheet'
          type='text/css'
        />
      </Head>

      <main className='flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-12 text-center'>
        <h1 className='text-4xl font-bold'>Quote Generator</h1>
        <section>
          <h3 className='text-6xl font-bold'>
            <span>"</span>
            {quote?.text}
            <span>"</span>
          </h3>
          <p className='mt-4 text-2xl'>- {quote?.author}</p>
          <button
            className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-6 py-3.5 text-center mt-10'
            onClick={getNewQuote}
          >
            New Quote? Click me
          </button>
        </section>
      </main>

      <footer className='flex h-24 w-full items-center justify-center border-t text-white'>
        <a
          className='flex items-center justify-center gap-2'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;

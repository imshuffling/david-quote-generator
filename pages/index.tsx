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
          {!quote?.text && (
            <div className='text-center'>
              <div role='status'>
                <svg
                  aria-hidden='true'
                  className='inline w-8 h-8 text-gray-400 animate-spin dark:text-gray-600 fill-white'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}

          {quote?.text && (
            <>
              <h3 className='text-6xl font-bold'>
                <span>"</span>
                {quote?.text}
                <span>"</span>
              </h3>
              <p className='mt-4 text-2xl'>- {quote?.author}</p>
            </>
          )}
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

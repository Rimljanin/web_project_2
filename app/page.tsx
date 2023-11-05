'use client'
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';

const Home: NextPage = () => {

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Napredni web <span className="text-blue-600">Drugi projekt</span> 
        </h1>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <Link href="/xss" passHref>
            <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600 cursor-pointer">
              <h3 className="text-2xl font-bold">XSS Ranjivost &rarr;</h3>
              <p className="mt-4 text-xl">
                Demonstracija cross-site scripting (XSS) ranjivosti.
              </p>
            </div>
          </Link>

          <Link href="/bac" passHref>
            <div className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600 cursor-pointer">
              <h3 className="text-2xl font-bold">Loša kontrola pristupa &rarr;</h3>
              <p className="mt-4 text-xl">
              Loša kontrola pristupa (Broken Access Control)
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

const IndexPage = () => {
  const [username, setUsername] = useState('');
  const [isVulnerable, setIsVulnerable] = useState(false);
  const [role, setRole] = useState('user');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentRole, setCurrentRole] = useState('user');


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    const storedVulnerability = localStorage.getItem('isVulnerable');

    if (storedUser) {
      setUsername(storedUser);
      setCurrentUsername(storedUser);
      setIsLoggedIn(true);
    }

    if (storedRole) {
      setRole(storedRole);
      setCurrentRole(storedRole);
    }

    if (storedVulnerability) {
      setIsVulnerable(storedVulnerability === 'true');
    }

    const handleRouteChange = (url: string) => {
      if (url === '/') {
        handleReset();
      }
    };

    Router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const router=useRouter();
  const homeFunction=()=>{
    router.push("/");
  }

  const handleLogin = () => {
    localStorage.setItem('user', username);
    localStorage.setItem('role', role);
    setIsLoggedIn(true);
    setCurrentUsername(username); 
    setCurrentRole(role);
  };

  const toggleVulnerability = () => {
    setIsVulnerable(!isVulnerable);
    localStorage.setItem('isVulnerable', (!isVulnerable).toString());
  };

  const handleReset = () => {
    localStorage.clear();
    setUsername('');
    setRole('user');
    setIsVulnerable(false);
    setIsLoggedIn(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Loša kontrola pristupa</h1>
      <div className="flex justify-between items-center">
      
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
        <p className="font-bold">Upute za testiranje</p>
        <p className="text-sm mt-2">
  Funkcionalnost se testira na sljedeći način: ako je ranjivost isključena, osoba sa 
  ulogom &quot;user&quot; može pristupiti samo svojemu resursu, a osoba sa ulogom &quot;admin&quot; samo 
  svojemu resursu. Ako je ranjivost uključena, korisnici s bilo kojom ulogom ili cak i bez prijave mogu pristupiti 
  bilo kojem resursu.
</p>
      </div>
      <button
    onClick={homeFunction}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
>
    Početna
</button>

      </div>
      <h1 className="text-2xl mb-4">Prijava</h1>
      <div>
        <input
          type="text"
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          placeholder="Unesite korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select
          className="border-2 border-gray-300 bg-white h-10 pl-5 pr-10 rounded-lg text-sm focus:outline-none"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleLogin}
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Prijava
        </button>
      </div>

      <div className="my-6">
        <label htmlFor="vulnerability-toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input 
              id="vulnerability-toggle" 
              type="checkbox" 
              className="sr-only" 
              checked={isVulnerable} 
              onChange={toggleVulnerability} 
            />
            <div className={`block bg-gray-300 w-14 h-8 rounded-full ${isVulnerable && 'bg-green-500'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${isVulnerable ? 'translate-x-full border-green-500' : 'border-gray-300'}`}></div>
          </div>
          <span className="ml-3 text-sm font-medium text-gray-700">{isVulnerable ? 'Ranjivost uključena' : 'Ranjivost isključena'}</span>
        </label>
      </div>

      {isLoggedIn && (
        <div className="mb-4">
          <p>Prijavljeni ste kao <strong>{currentUsername}</strong> sa ulogom <strong>{currentRole}</strong>.</p>
          <button
            onClick={handleReset}
            className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded focus:outline-none focus:ring-4 focus:ring-yellow-300"
          >
            Resetiraj
          </button>
        </div>
      )}

      <div className="flex space-x-4">
        <Link href="/bac/user" className="bg-green-500 hover:bg-green-600 text-white p-2 rounded focus:outline-none focus:ring-4 focus:ring-green-300">User Stranica</Link>
        <Link href="/bac/admin" className="bg-red-500 hover:bg-red-600 text-white p-2 rounded focus:outline-none focus:ring-4 focus:ring-red-300">Admin Stranica</Link>
      </div>
    </div>
  );
};

export default IndexPage;

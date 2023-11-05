'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

const XssDemo = () => {
  const [isVulnerable, setIsVulnerable] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');

  const toggleVulnerability = () => {
    setIsVulnerable(!isVulnerable);
    setOutput(''); 
  };

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const executableCode = userInput.replace(/<script>|<\/script>/gi, '');
    if (isVulnerable) {
      try {
        eval(executableCode);
      } catch (error) {
        console.error('Error executing script:', error);
      }
    } else {
      setOutput(escapeHtml(executableCode));
    }
    setUserInput('');
  };

  function escapeHtml(unsafe: string) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const router=useRouter();
  const homeFunction=()=>{
    router.push("/");
  }

  return (
    <div>
      <Head>
        <title>XSS Demo</title>
      </Head>
      <div className="container mx-auto my-8 p-4">
        <h1 className="text-3xl font-bold mb-4">XSS Ranjivost Demo</h1>
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
        <p className="font-bold">Upute za testiranje</p>
        <p className="text-sm mt-2">
  Kad je ranjivost uključena, bilo koji JavaScript kod koji unesete izvršit će se. 
  Kad je isključena, uneseni tekst će se sigurno prikazati ispod.
  <br />
  Testni podaci: probajte upisati <code>&lt;script&gt;alert(&apos;NAPAD NA APLIKACIJU&apos;)&lt;/script&gt;</code> kad je ranjivost uključena 
  ili <code>&lt;script&gt;window.location.href = &apos;http://www.fer.hr&apos;;&lt;/script&gt;</code>.
</p>

      </div>


        <label htmlFor="vulnerability-toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input 
              id="vulnerability-toggle" 
              type="checkbox" 
              className="sr-only" 
              checked={isVulnerable} 
              onChange={toggleVulnerability} 
            />
            <div className={`block w-14 h-8 rounded-full ${isVulnerable ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isVulnerable ? 'transform translate-x-6' : ''}`}></div>
          </div>
          <span className={`ml-3 font-medium ${isVulnerable ? 'text-green-500' : 'text-gray-700'}`}>
            {isVulnerable ? 'Isključi ranjivost' : 'Uključi ranjivost'}
          </span>
        </label>
        <br></br>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleUserInput}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Unesite HTML ili JavaScript"
          />
          <button 
            type="submit" 
            className="ml-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Izvedi 
          </button>
        </form>
        <div className="mt-4 p-4 border rounded">
          {isVulnerable ? (
            <div dangerouslySetInnerHTML={{ __html: output }} />
          ) : (
            <div>{output}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default XssDemo;

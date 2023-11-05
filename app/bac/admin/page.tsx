'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const AdminPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const isVulnerable = localStorage.getItem('isVulnerable') === 'true';
    const role = localStorage.getItem('role');
    const storedUsername = localStorage.getItem('user');

    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (role === 'admin' || isVulnerable) {
      setIsAllowed(true);
    } else {
      Swal.fire({
          title: 'Pristup odbijen',
          text: 'Nedostaju potrebne ovlasti.',
          icon: 'error',
          confirmButtonText: 'Ok',
          willClose: () => {
            router.push('/bac');
          }
        });
  }
}, [router]);

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Privatna Stranica</h1>
        <p className="text-lg text-gray-600 mb-8">
          Ova stranica je namijenjena isključivo korisnicima s ulogom <span className="text-indigo-600">&quot;admin&quot;</span>.
        </p>
        <div className="bg-indigo-50 p-4 rounded-md">
          <p className="text-indigo-700 font-semibold">Dobrodošli, {username}.</p>
          <p className="text-indigo-900 font-semibold">Osijetljivi podatci...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;




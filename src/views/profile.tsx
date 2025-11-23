

import React, { useState, useEffect } from 'react';


interface UserProfile {
  name: string;
  email: string;
}

const Profile: React.FC = () => {

  const [profileData, setProfileData] = useState<UserProfile>({ name: '', email: '' });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
   
    setTimeout(() => {
      setProfileData({ name: 'Juan Pérez', email: 'juan.perez@colegio.edu' });
      setLoading(false);
    }, 1000);
  }, []);


  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guardando nuevos datos:', profileData);
    
    alert('¡Perfil actualizado!');
  };

  if (loading) {
    return <div className="text-center p-8">Cargando perfil...</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
        Mi Perfil de Usuario
      </h1>
      
      <form onSubmit={handleSave} className="space-y-6">
        {/* Campo de Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        
        {/* Campo de Correo Electrónico */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={profileData.email}
            readOnly 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-50"
          />
        </div>
        
        {/* Botón de Guardar */}
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default Profile;
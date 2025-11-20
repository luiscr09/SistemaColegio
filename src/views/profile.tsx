// src/views/Profile.tsx

import React, { useState, useEffect } from 'react';

// Define una interfaz para la estructura de datos del usuario
interface UserProfile {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  // Estado para guardar los datos del usuario
  const [profileData, setProfileData] = useState<UserProfile>({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  // 1. Lógica para cargar los datos del usuario al montar el componente
  useEffect(() => {
    // Simular carga de datos (reemplazar con tu llamada a la API)
    setTimeout(() => {
      setProfileData({ name: 'Juan Pérez', email: 'juan.perez@colegio.edu' });
      setLoading(false);
    }, 1000);
  }, []);

  // 2. Manejador para actualizar el perfil
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guardando nuevos datos:', profileData);
    // Aquí iría la llamada a la API para actualizar los datos
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
            readOnly // El email a menudo no se permite cambiar fácilmente
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
'use client';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';
import Loader from '../components/Loader';
import Swal from 'sweetalert2';
import { User } from '../types/types';
import UserItem from '../components/UserItem';

export default function UserList() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { setSelectedUser } = useUserStore();

  // ✅ Limpiar resultados al borrar el input
  useEffect(() => {
    if (!search) {
      setUsers([]);
    }
  }, [search]);

  const handleSearch = async () => {
    if (!search) return Swal.fire('', 'Debes ingresar el nombre de algun usuario', 'info');
    setLoading(true);
    setUsers([]);
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${search}`);
      const data = await res.json();
      if (data.items.length === 0) {
        Swal.fire('Sin resultados', 'No se encontraron usuarios con ese nombre', 'info');
      }
      setUsers(data.items);
    } catch (error) {
      console.error(error);
      Swal.fire('Ooops', 'Error al buscar usuarios', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <div className="p-4  max-w-4xl bg-white rounded-xl mx-auto lg:px-6">
        {/* TÍTULO */}
        <div className="mb-4">
          <h1 className="text-center text-gray-700 font-bold text-2xl">Github</h1>
        </div>

        {/* INPUT DE BÚSQUEDA */}
        <div className="flex gap-2 mb-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar usuarios..."
            className="search-input"
          />
          <button
            onClick={handleSearch}
            className="search-button"
          >
            Buscar
          </button>
        </div>

        {/* LOADER */}
        {loading && <Loader />}

        {/* LISTADO DE USUARIOS ENCONTRADOS */}
        <ul>
          {users.map((user) => (
            <UserItem
              key={user.login}
              user={user}
              onSelect={setSelectedUser} // Ya debería estar correcto
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

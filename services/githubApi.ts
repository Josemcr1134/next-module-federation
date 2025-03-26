// src/services/githubApi.ts
import Swal from 'sweetalert2';

export const fetchUsers = async (search: string) => {
  if (!search) return [];

  try {
    const res = await fetch(`https://api.github.com/search/users?q=${search}`);
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return data.items;
  } catch (error) {
    console.error(error);
    Swal.fire('Ooops', 'Error al buscar usuarios', 'error');
    return [];
  }
};

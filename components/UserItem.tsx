'use client';
import { User } from '../types/types';
import Image from 'next/image';
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

interface Props {
  user: User;
  onSelect: (username: string) => void;
}

import { useRouter } from 'next/navigation';

export default function UserItem({ user, onSelect }: Props) {
  const router = useRouter();

  const handleRedirect = () => {
    onSelect(user.login); // 👈 Guarda el usuario en el store
    router.push('/userDetail'); // 👈 Redirige internamente a la página
  };

  return (
    <li
      className="result-item transition cursor-pointer"
      onClick={handleRedirect} // 👈 Redirige al hacer click en toda la tarjeta
    >
      {/* Avatar */}
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={32}
        height={32}
        className="rounded-full mr-2"
        priority
      />
      {/* Nombre de usuario */}
      <p className="text-lg font-medium text-gray-500">{user.login}</p>
      {/* Icono de perfil */}
      <button className="ml-auto text-blue-500 hover:underline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>
    </li>
  );
}

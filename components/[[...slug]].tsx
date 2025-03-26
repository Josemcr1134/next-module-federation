import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { loadRemote } from '../utils/loadRemote';

const FollowersPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { slug } = router.query as { slug?: string };

  useEffect(() => {
    async function loadComponent() {
      try {
        const FollowersComponent = await loadRemote(
          'http://localhost:4201/remoteEntry.js', // Ruta del archivo remoto
          'followers', // Nombre definido en Webpack
          './Component' // Ruta del módulo expuesto
        );

        // Inicializa el componente Angular
        FollowersComponent.prototype.ngDoBootstrap = () => {};
        const element = document.createElement('user-detail');

        // Si ya hay un componente montado, lo reemplazamos para evitar conflictos
        if (ref.current) {
          ref.current.innerHTML = '';
          ref.current.appendChild(element);
        }
      } catch (error) {
        console.error('Error loading remote component:', error);
      }
    }

    if (slug) {
      loadComponent();
    }
  }, [slug]); // Se vuelve a cargar si el slug cambia

  return (
    <div>
      <h1>GitHub Followers</h1>
      <div ref={ref}></div>
    </div>
  );
};

export default FollowersPage;

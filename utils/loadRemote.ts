declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loadRemote(url: string, scope: string, module: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.async = true;

      script.onload = async () => {
        try {
          // Inicializa el container remoto si aún no está inicializado
          const container = window[scope];
          await container.init({
            react: { eager: true },
          });

          const factory = await container.get(module);
          resolve(factory());
        } catch (error) {
          reject(error);
        }
      };

      script.onerror = () => reject(new Error(`Error loading remote module: ${url}`));
      document.head.appendChild(script);
    } else {
      // Si el script ya fue cargado, intenta recuperar el módulo directamente
      const container = window[scope];
      container
        .get(module)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((factory: () => any) => resolve(factory()))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => reject(error));
    }
  });
}

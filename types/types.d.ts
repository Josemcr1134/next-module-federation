// types.d.ts
declare module 'angularRemote/Module' {
  const component: React.ComponentType;
  export default component;
}

declare module 'http://localhost:4201/remoteEntry.js' {
  const content: string;
  export default content;
}
import dynamic from 'next/dynamic';

const loadRemoteModule = async () => {
  return await import('angularRemote/Module');
};

const AngularModuleLoader = dynamic(() => loadRemoteModule(), { ssr: false });

export default function UserDetailPage() {
  return (
    <div>
      <h1>Detalle de Usuario</h1>
      <AngularModuleLoader />
      {/* O, si el custom element ya se registró, directamente:
      <user-detail-element username="octocat"></user-detail-element> */}
    </div>
  );
}
import { Header } from '@/components';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto p-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

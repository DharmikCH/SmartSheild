import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';

export default function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Topbar onMenuToggle={() => setMobileNavOpen(!mobileNavOpen)} />

      <main className="max-w-[1360px] mx-auto px-5 lg:px-10 py-6 lg:py-8">
        <Outlet />
      </main>
    </div>
  );
}

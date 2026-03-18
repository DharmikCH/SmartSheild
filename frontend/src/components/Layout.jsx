import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';

export default function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#e8eaed] py-6 lg:py-8">
      <Topbar onMenuToggle={() => setMobileNavOpen(!mobileNavOpen)} />

      <div className="max-w-[1360px] mx-auto px-4 lg:px-8 py-8 rounded-3xl bg-white shadow-lg">
        <main className="px-2 lg:px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

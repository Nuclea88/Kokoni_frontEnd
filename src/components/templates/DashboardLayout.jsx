import { Outlet } from 'react-router';
import  TopNavbar  from '../organisms/TopNavbar';
import  BottomNavbar  from '../organisms/BottomNavbar';

 function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col relative   w-full max-w-[100vw] overflow-x-hidden overflow-y-auto">
      <TopNavbar />
      <main className="flex-1 pt-20 pb-28 px-6">
        <Outlet />
      </main>
      <BottomNavbar />
    </div>
  );
}
export default DashboardLayout;
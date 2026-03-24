import { Outlet } from 'react-router';
import  TopNavbar  from '../organisms/TopNavbar';
import  BottomNavbar  from '../organisms/BottomNavbar';
 function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col relative">
      <TopNavbar />
      <main className="flex-1 pt-20 pb-28 px-6 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNavbar />
    </div>
  );
}
export default DashboardLayout;
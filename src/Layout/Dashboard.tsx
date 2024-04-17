import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Dashboard/Sidebar/Sidebar";



const Dashboard = () => {
    return (
        <div className='relative max-h-screen md:flex'>
        {/* Sidebar Component */}
        <div className="">
        <Sidebar></Sidebar>
        </div>
        <div className='flex-1  md:ml-72'>
          <div className='p-5'>
            {/* Outlet for dynamic contents */}
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
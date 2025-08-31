import logo from '../../public/vertX-logo-bold.svg'
import { useState, useEffect } from 'react';

import { Overview } from '../components/Overview.jsx';
import { ProductsPage as Products } from '../components/Products.jsx';
import { OrdersPage as Orders } from '../components/Orders.jsx';
import { CoursesPage as Courses } from '../components/Courses-creation.jsx';
import { CourseOverviewPage as CoursesOverview } from '../components/Courses-overview.jsx';
import { UsersPage as Users } from '../components/Users.jsx';
import { CustomizationsPage as Customizations } from '../components/Customization.jsx';
import { AnalyticsPage as Analytics } from '../components/Analytics.jsx';

export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [isMounted, setIsMounted] = useState(false);
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const renderContent = () => {
        switch(activeTab) {
            case 'Overview': return <Overview />   
            case 'Products': return <Products />
            case 'Orders': return <Orders />
            case 'Courses Creation': return <Courses />
            case 'Courses Overview': return <CoursesOverview />
            case 'Users': return <Users />
            case 'Customizations': return <Customizations />
            case 'Analytics': return <Analytics />
            default:
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                            <p className="text-gray-700">Welcome to vertX Dashboard</p>
                        </div>
                    </div>
                );
        }
    };

    return (
    <main className="bg-[#ebeff1] text-white font-f2 min-h-screen flex flex-col">
      <title>vertX - Dashboard</title>
      <nav className="topbar left-0 w-screen bg-[#292a37] h-16 p-4 fixed overflow-hidden z-10 flex items-center justify-between border-b border-[#3a3b4d]">
        <div className="flex items-center">
          <img src={logo} alt="vertX Logo" className="w-10 h-10" />
          <span className="ml-3 text-xl font-bold">vertX.</span>
        </div>
        <div className="flex items-center space-x-4 mr-10">
          <button className="p-2 rounded-lg hover:bg-[#3a3b4d] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black font-semibold">
              A
            </div>
          </div>
        </div>
      </nav>
      <div className="sidebar left-0 h-screen bg-[#292a37] w-64 p-4 fixed overflow-x-hidden overflow-y-auto z-0 pt-16 border-r border-[#3a3b4d]">
        <nav className="flex flex-col space-y-1 mt-8">
          {[
            { name: 'Overview', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
            { name: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { name: 'Orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
            { 
              name: 'Courses', 
              icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253',
              submenu: [
                { name: 'Courses Creation', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253' },
                { name: 'Courses Overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
              ]
            },
            { name: 'Users', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            { name: 'Customizations', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-2.572 1.065c-.94 1.543-3.31.826-2.37 2.37a1.724 1.724 0 00-1.066 2.573c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.572-1.065c-1.543.94-3.31.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 002.572-1.065c.94-1.543 3.31-.826 2.37-2.37a1.724 1.724 0 001.066-2.572z' },
            { name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-2.572 1.065c-.94 1.543-3.31.826-2.37 2.37a1.724 1.724 0 00-1.066 2.573c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.572-1.065c-1.543.94-3.31.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 002.572-1.065c.94-1.543 3.31-.826 2.37-2.37a1.724 1.724 0 001.066-2.572z' }
          ].map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setIsCoursesOpen(!isCoursesOpen);
                    }}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors group cursor-pointer ${
                      activeTab === item.name || isCoursesOpen
                        ? 'bg-[#3a3b4d] text-white' 
                        : 'hover:bg-[#3a3b4d] text-gray-300'
                    }`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className="font-medium">{item.name}</span>
                    <svg 
                      className={`ml-auto w-4 h-4 transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                  {isCoursesOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <a 
                          key={subIndex} 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab(subItem.name);
                          }}
                          className={`flex items-center px-4 py-2 rounded-lg transition-colors group text-sm ${
                            activeTab === subItem.name 
                              ? 'bg-[#3a3b4d] text-white' 
                              : 'hover:bg-[#3a3b4d] text-gray-300'
                          }`}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={subItem.icon} />
                          </svg>
                          <span>{subItem.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a 
                  key={index} 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.name);
                  }}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${
                    activeTab === item.name 
                      ? 'bg-[#3a3b4d] text-white' 
                      : 'hover:bg-[#3a3b4d] text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className="font-medium">{item.name}</span>
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="ml-64 mt-16 min-h-screen">
        {renderContent()}
      </div>
    </main>
    )
}
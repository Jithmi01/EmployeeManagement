import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faDatabase, faWrench } from '@fortawesome/free-solid-svg-icons';
import { HiUser, HiChartPie } from 'react-icons/hi';

export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const [showSubPackages, setShowSubPackages] = useState(false);

  const toggleSubPackages = () => {
    setShowSubPackages(!showSubPackages);
  };

  return (
    <div className="hidden flex-col flex-shrink-0 p-3 bg-black w-55 h-[600px] lg:block">
      <ul className="flex flex-col space-y-1 mb-auto">
        {currentUser && currentUser && (
          <li className="nav-item">
            <Link to="/profile" className={`block py-2 px-4 rounded-lg hover:bg-yellow-300 hover:text-black bg-opacity-20 text-white `}>
              <HiChartPie className="inline-block w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link to="/sign-up" className={`block py-2 px-4 rounded-lg text-white hover:bg-yellow-300 hover:text-black `}>
            <HiUser className="inline-block w-5 h-5 mr-2" />
            Register
          </Link>
        </li>
        <li className="">
          <Link to="/view" className={`block py-2 px-4 rounded-lg text-white hover:bg-yellow-300 hover:text-black `}>
            <HiUser className="inline-block w-5 h-5 mr-2" />
            All Employees
          </Link>
        </li>
        <li className="">
          <Link to="/absent" className={`block py-2 px-4 rounded-lg text-white hover:bg-yellow-300 hover:text-black `}>
            <FontAwesomeIcon icon={faCalendarAlt} className="inline-block w-5 h-5 mr-2" />
            Leave
          </Link>
        </li>
        <li className="relative" onClick={toggleSubPackages}>
          <Link to="" className={`block py-2 px-4 rounded-lg text-white hover:bg-yellow-300 hover:text-black `}>
            <FontAwesomeIcon icon={faDatabase} className="inline-block w-5 h-5 mr-2" />
            Packages
          </Link>
          {showSubPackages && (
            <ul className="absolute left-0 mt-2 bg-blue-300 shadow-md rounded-lg text-white divide-y divide-white">
              <li>
                <Link to="/sub-package-1" className="block py-2 px-4 text-gray-800 hover:bg-yellow-300">
                  Add Package
                </Link>
              </li>
              <li>
                <Link to="/sub-package-2" className="block py-2 px-4 text-gray-800 hover:bg-yellow-300">
                  Add Promotional Package
                </Link>
              </li>
              <li>
                <Link to="/sub-package-3" className="block py-2 px-4 text-gray-800 hover:bg-yellow-300">
                  View Package
                </Link>
              </li>
              <li>
                <Link to="/sub-package-4" className="block py-2 px-4 text-gray-800 hover:bg-yellow-300">
                  View Promotional Package
                </Link>
              </li>
              <li>
                <Link to="/sub-package-5" className="block py-2 px-4 text-gray-800 hover:bg-yellow-300">
                  View Order
                </Link>
              </li>
              <li>
                <Link to="/sub-package-6" className="block py-2 px-4 text-gray-800 hover:bg-yellow-300">
                  View Promotional Order
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="">
          <Link to="/" className={`block py-2 px-4 rounded-lg text-white hover:bg-yellow-300 hover:text-black `}>
            <FontAwesomeIcon icon={faWrench} className="inline-block w-5 h-5 mr-2" />
            Maintenance
          </Link>
        </li>
      </ul>
      <hr className="my-2 border-gray-300" />
    </div>
  );
}

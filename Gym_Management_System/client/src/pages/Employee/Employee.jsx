import { useState } from "react";
import { Link } from "react-router-dom";
import Cat from "./fff.jpg";
import Mark from "../../components/Mark";

export default function Schedul() {

    const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);

    const handleClosePopup = () => {
        setShowCheckoutPopup(false);
      };

  return (
    <div className="h-[600px] relative"> {/* Added relative class */}
        <img src={Cat} alt="" className="w-full h-full object-cover" /> {/* Added object-cover class */}
        
       


      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-[-100px]">
     

          <button  onClick={() => setShowCheckoutPopup(true)}  
          className=" hover:text-black bg-green-700  border border-white text-3xl shadow-lg shadow-black  
          text-white font-serif py-8 px-10 mt-4 ml-10 rounded-lg h-40 w-[200px] hover:bg-yellow-500">
            Mark Attendance</button> 
            

        
          <div>
          <Link to="/empview">
          <button  className="hover:text-black bg-red-600  border border-white text-3xl shadow-lg shadow-black 
          text-white font-serif py-8 px-10 mt-4 ml-10 rounded-lg h-40 w-[200px] hover:bg-yellow-500">Leave Request</button> 
          </Link>

      </div>
          
        
      </div>
      
     
      {showCheckoutPopup && <Mark onClose={handleClosePopup} />}
    </div>
  );
}

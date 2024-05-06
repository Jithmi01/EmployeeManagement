import "react-circular-progressbar/dist/styles.css";
//import { signoutSuccess } from "../redux/user/userSilce";
//import { useDispatch } from "react-redux";
//import { Link } from "react-router-dom";
import Dash from "./sideDash";
import Cat from "../img/fff.jpg";
import { useState, useEffect } from 'react';


export default function DashProfile() {


  const [Empp, setEmpp] = useState([]);
  const [ABsnt, setABsnt] = useState([]);

  useEffect(() => {
    const fetchEmploy = async () => {
      try {
        const res = await fetch(`http://localhost:3000/employe/getabsent`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setABsnt(data.ABsnt);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEmploy();
  }, []);


  useEffect(() => {
    const fetchEmploy = async () => {
      try {
        const res = await fetch(`http://localhost:3000/employe/getEmploye`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setEmpp(data.Empp);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEmploy();
  }, []);




  
  return (
    <div>
      <div className="h-[600px] relative"> {/* Added relative class */}
        <img src={Cat} alt="" className="w-full h-full object-cover" /> 
        <div className="absolute top-0 left-0">   {/* Positioned Dash component here */}
              <Dash />
            </div> {/* Added object-cover class */}

          
        

        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
        <div className="max-w-lg mx-auto p-3 w-full relative"> {/* Added relative class */}
              
  <div className="flex justify-center items-center gap-14 mt-5">
  <div className="bg-red-500 mt-4 ml-10 rounded-lg h-40 w-[200px] bg-opacity-80 grid place-items-center border border-red-700 border-x-4 shadow-lg">
    <h1 className="text-white text-lg font-times font-bold text-center">Approved Leave Requests</h1>
    <p className="text-4xl text-white">{ABsnt.length}</p>
  </div>
  <div className="bg-green-500 mt-4 ml-10 rounded-lg h-40 w-[200px] bg-opacity-70 grid place-items-center border border-green-700 border-x-4 shadow-lg">
    <h1 className="text-white text-lg font-times font-bold text-center">All Employee</h1>
    <p className="text-4xl text-white">{Empp.length}</p>
  </div>
</div>

              

            
              
              
          </div>
        </div>
      </div>
    </div>
  );
}

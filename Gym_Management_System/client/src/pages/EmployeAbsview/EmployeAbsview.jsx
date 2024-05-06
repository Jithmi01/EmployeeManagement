import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cat from "./fff.jpg";

export default function Absent() {
  const { currentUser } = useSelector((state) => state.user);
  const [ABsnt, setABsnt] = useState([]);
  const currentuserId = currentUser ? currentUser._id : null;

  

  //get employee
  useEffect(() => {
    const fetchEmploy = async () => {
      try {
        const res = await fetch(`http://localhost:3000/employe/getaBsent/${currentuserId}`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setABsnt(data.absent);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEmploy();
  }, [currentuserId]);

  return (

    <div>

    <div className="h-[600px] relative"> {/* Added relative class */}
            <img src={Cat} alt="" className="w-full h-full object-cover" /> 
           
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
              <div className="w-[1000px] h-[400px] mt-[-100px] rounded-lg bg-navy-blue border border-white bg-slate-100">
              <div className="max-h-96 overflow-y-auto">
              <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <>
        <table className="w-full divide-y divide-gray-200 shadow-md">
        <thead className="bg-yellow-400 bg-opacity-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Description
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {ABsnt.map((Employe) => (
              <tr
                key={Employe._id}
                className="bg-black bg-opacity-50 text-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-6 py-4 whitespace-nowrap">{Employe.Email}</td>

                <td className="px-6 py-4 whitespace-nowrap">{Employe.Phone}</td>
                <td className="px-6 py-4 whitespace-normal w-52 break-all  ">
                  {Employe.desc}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <button className="w-28 rounded-xl bg-green-950 text-white font-serif border border-white"
                      
                      
                    >
                      {Employe.status}
                    </button>
                  </td>

                
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
                 </div>
              </div>
    
            </div>
          </div>
    
    
    
    
    
    
        
    
        </div>
    
  );
}


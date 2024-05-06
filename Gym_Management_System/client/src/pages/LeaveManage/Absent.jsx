import  { useEffect, useState } from "react";
//import { useSelector } from "react-redux";
import Dash from "../../components/sideDash";
import Cat from "./fff.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Absent() {
  //const { currentUser } = useSelector((state) => state.user);
  const [ABsnt, setABsnt] = useState([]);
  const [AbsentId, setAbsentIdToDelete] = useState("");

  // get employee
  useEffect(() => {
    const fetchAbsent = async () => {
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
    fetchAbsent();
  }, []);

  const handleStatusChange = async (absentId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "Processing" ? "Approval" : "Processing";
      const res = await fetch(`http://localhost:3000/employe/absent/${absentId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setABsnt((prevState) =>
          prevState.map((employe) => {
            if (employe._id === absentId) {
              return { ...employe, status: newStatus };
            }
            return employe;
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/employe/deletempp/${AbsentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setABsnt((prevState) =>
          prevState.filter((employe) => employe._id !== AbsentId)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="h-[600px] relative">
        <img src={Cat} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0">
          <Dash />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
          <div className="w-[1000px] h-[400px] mt-[-100px] rounded-lg bg-navy-blue border border-white bg-slate-100">
            <div className="max-h-96 overflow-y-auto">
              <div>
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {ABsnt.map((employe) => (
                          <tr
                            key={employe._id}
                            className="bg-black bg-opacity-50 text-white dark:border-gray-700 dark:bg-gray-800"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {employe.Email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {employe.Phone}
                            </td>
                            <td className="px-6 py-4 whitespace-normal w-52 break-all">
                              {employe.desc}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    employe._id,
                                    employe.status
                                  )
                                }
                                className="hover:underline w-24 h-8 rounded-lg hover:opacity-90 bg-blue-500 border border-white font-serif text-white"
                              >
                                {employe.status}
                              </button>
                            </td>
                            
                            <td className="px-9 py-4 whitespace-nowrap">
                              <span
                                onClick={() => {
                                  setAbsentIdToDelete(employe._id);
                                  handleDeleteUser();
                                }}
                                className="text-red-600 hover:underline cursor-pointer hover:text-yellow-200"
                                >
                                   <FontAwesomeIcon icon={faTrash} /> 

                              </span>
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
    </div>
  );
}

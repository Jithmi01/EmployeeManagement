import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Dash from "../../components/sideDash";
import Cat from "./fff.jpg";
import jsPDF from "jspdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


export default function DashUsers() {

  const [Empp, setEmpp] = useState([]);
  console.log(Empp);
  const [EmpId, setEmpId] = useState("");
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [EmpIdToDelete, setempIdToDelete] = useState("");
  const [Employe, setEmploye] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  //total salary
  useEffect(() => {
    let sum = 0;
    Employe.forEach((detail, index) => {
      sum += detail.price;
      if (
        (index >= 29 && (index - 29) % 30 === 0) ||
        index === Employe.length - 1
      ) {
        // Display total price every 30th index or at the end of the array
        console.log(`Total price for ${index + 1} details: ${sum}`);
      }
    });
    setTotalPrice(sum);
  }, [Employe]);

  //get salary
  const EmployeId = EmpId ? EmpId : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employe/getEmp/${EmployeId}`);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setEmploye(data.Employe);
        } else {
          setEmploye([]);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [EmployeId]);

  //get employee
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

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/employe/deletemp/${EmpIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setEmpp((prev) =>
          prev.filter((Employe) => Employe._id !== EmpIdToDelete)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //add popup window
  const handleCheckout = (id) => {
    setShowCheckoutPopup((prev) => ({
      ...prev,
      [id]: true,
    }));
    setEmpId(id);
  };

  // popup close
  const handleClosePopup = () => {
    setShowCheckoutPopup(false);
  };



  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Empp]);
    } else {
      // If there's a query, filter the data
      const filteredData = Empp.filter(
        (Employe) =>
        Employe.email && Employe.email.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Empp]);


  //report
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;
    let pageHeight = doc.internal.pageSize.height;
    let monthCounter = 1;
    let totalForMonth = 0;

    // Add employee details to PDF
    doc.setFontSize(16);
    doc.text(20, yPos, "Monthly Salary Report On Arrival");
    yPos += 10;

    Employe.forEach((detail, index) => {
        doc.setFontSize(12);
        doc.text(20, yPos, `Date: ${moment(detail.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`);
        doc.text(20, yPos + 5, `DayPrice: ${detail.price}`);

        // Add dayPrice to the totalForMonth
        totalForMonth += detail.price;

        // Check if adding this content will exceed the page height
        if ((yPos + 20) > pageHeight) {
            // Add new page
            doc.addPage();
            yPos = 10; // Reset yPos for new page
            // Add header on new page if needed
            doc.setFontSize(16);
            doc.text(20, yPos, `Monthly Salary Report On Arrival (Page ${doc.internal.getNumberOfPages() + 1})`);
            yPos += 10;
        }

        // Check if it's the last day of the month and add total price for the month
        if ((index + 1) % 30 === 0 || index === Employe.length - 1) {
            doc.text(20, yPos + 10, `Total for Month ${monthCounter}: ${totalForMonth}`);
            yPos += 20; // Adjust yPos for the total price
            monthCounter++;
            totalForMonth = 0; // Reset totalForMonth for the next month
        }

        yPos += 20; // Adjust vertical position for the next employee
    });

    // Save the PDF
    doc.save("employee_details.pdf");
};




return (
     
  <div>

<div className="h-[600px] relative"> {/* Added relative class */}
       <img src={Cat} alt="" className="w-full h-full object-cover" /> 
       <div className="absolute top-0 left-0">   {/* Positioned Dash component here */}
             <Dash />
           </div> {/* Added object-cover class */}

       <form className="absolute top-0 right-0 mt-4 mr-4">
         <input
           type="text"
           placeholder="Search... "
           className=" w-[300px] h-8 rounded-full shadow-xl"
           onChange={(e) => setQuery(e.target.value)}
         />
       </form>


       
       <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 flex  items-center gap-14 mt-4">
   
         <div className="w-[1150px] h-[500px] mt-[-10px] rounded-lg bg-navy-blue border border-white ">
         <div className="max-h-96 overflow-y-auto">
           <div>

           <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
     <>
       <table className="w-full divide-y divide-gray-200 shadow-md">
         <thead className="bg-yellow-400 bg-opacity-50">
           <tr>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
               Image
             </th>

             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
               Name
             </th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
               Email
             </th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
               Password
             </th>

             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
               Show Attendance
             </th>

             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
             BirthDate
             </th>

             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
               Gender
             </th>

             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
               Address
             </th>

             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
               Contact
             </th>

             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
               Position
             </th>


             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
               Edit
             </th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
               Delete
             </th>
           </tr>
         </thead>
         <tbody className="  divide-y divide-gray-300">

         {filter && filter.length > 0 ? (
           <>
           {filter.map((Employe) => (
             <tr
               key={Employe._id}
               className="bg-black bg-opacity-50 text-white dark:border-gray-700 dark:bg-gray-800"
             >
               <td className="px-6 py-4 whitespace-nowrap">
                 <img
                   src={Employe.profilePicture}
                   className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                 />
               </td>
               <td className="px-6 py-4 whitespace-nowrap">{Employe.FirstName} {Employe.LastName}</td>

               <td className="px-6 py-4 whitespace-nowrap">{Employe.email}</td>
               <td className="px-6 py-4 whitespace-nowrap">
                 {Employe.password}
               </td>

               <td className="px-6 py-4 whitespace-nowrap">
                 <button
                   className="px-6 py-2 bg-green-500 bg-opacity-50 font-serif border hover:bg-yellow-600 border-white rounded-full whitespace-nowrap"
                   onClick={() => handleCheckout(Employe._id)}
                 >
                    Attendanse
                 </button>
               </td>

               <td className="px-6 py-4 whitespace-nowrap">{Employe.BirthDate}</td>
               <td className="px-6 py-4 whitespace-nowrap">{Employe.Gender}</td>
               <td className="px-6 py-4 whitespace-nowrap">{Employe.Address}</td>
               <td className="px-6 py-4 whitespace-nowrap">{Employe.Contact}</td>
               <td className="px-6 py-4 whitespace-nowrap">{Employe.Position}</td>




               <td className="px-7 py-5 whitespace-nowrap">
                 <Link
                   to={`/update-emp/${Employe._id}`}
                   className="text-green-300 hover:underline cursor-pointer hover:text-yellow-200"
                   >
                       <FontAwesomeIcon icon={faPencilAlt} /> 

                 </Link>
               </td>
               <td className="px-6 py-4 whitespace-nowrap">
 <span
   onClick={() => {
     setempIdToDelete(Employe._id);
     handleDeleteUser();
   }}
   className="text-red-600 hover:underline cursor-pointer hover:text-yellow-200"
 >
   <FontAwesomeIcon icon={faTrash} /> 
 </span>
</td>

             </tr>
           ))}
           </>
            ) : (
             <p>You have no employee yet</p>
           )}
         </tbody>
       </table>
     </>

     {showCheckoutPopup && (
       <div>
         <div className="fixed top-0 left-0 w-full h-full bg-gray-900  z-40"></div>
         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 shadow-lg rounded-lg p-4 text-white z-50">
           <div className="overflow-y-auto max-h-[350px] w-[600px] ">
             {/* Popup window content */}
             {Employe.map((detail, index) => (
               <div className=" gap-6" key={index}>
                 <p>
                   Date:{" "}
                   {moment(detail.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                 </p>
                 <p>DayPirce: {detail.price}</p>
                 {index >= 29 && (index - 29) % 30 === 0 && (
                   <p className="text-red-600">This month:{totalPrice}</p>
                 )}

                 {index >= 29 && (index - 29) % 30 === 0 && (
                   <p className="text-red-600">next month</p>
                 )}

                 <hr className="bg-white w-full" />
               </div>
             ))}
              <div className="flex items-center justify-center gap-5">
                   
              <button
               className="bg-blue-500 bg-opacity-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 "
               onClick={() => generatePDF()}
             >
             Monthly Salaray Report on Arrival
             </button>
             <button
               className="bg-blue-500 bg-opacity-50 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 "
               onClick={handleClosePopup}
             >
               Close
             </button>

              </div>
            
           </div>
         </div>
       </div>
     )}
   </div>

           </div>
            </div>
         </div>

       </div>
     </div>






   

   </div>
 );
}

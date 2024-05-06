import  { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Mark = ({ onClose }) => {
  const [formData, setFormData] = useState({
    Email: "",
    Phone: "",
    desc: ""
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [time] = useState("8.00Am-5.00Pm");
  const [price] = useState("2000");
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const allDetails = {
        EmployeId: currentUser._id,
        time: time,
        price: price,
      };
      const res = await fetch("http://localhost:3000/employe/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allDetails),
      });
      if (!res.ok) {
        throw new Error("Failed to mark attendance: " + res.statusText);
      }
      const data = await res.json();
      if (!data || data.success === false) {
        throw new Error(data.message || "Failed to mark attendance");
      }
      setErrorMessage(null);
      setNotification(
        <div className="bg-white w-80 h-60 rounded-md shadow-lg flex flex-col justify-center items-center">
          <h1 className="text-gray-900 text-2xl mb-4">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 text-7xl" />
          </h1>
          <h3 className="text-black text-3xl font-bold">Success</h3>
          <h3 className="text-black text-xl">Attendance marked successfully!</h3>
        </div>
      );
      setTimeout(() => {
        setNotification(null);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Attendance marking error:", error);
      setErrorMessage(error.message);
    }
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    try {
      const allAbsent = {
        currentuserId: currentUser._id,
        ...formData,
      };
      const res = await fetch("http://localhost:3000/employe/absent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allAbsent),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit leave request");
      }
      setErrorMessage(null);
      setNotification(
        <div className="bg-white w-80 h-60 rounded-md shadow-lg flex flex-col justify-center items-center">
          <h1 className="text-gray-900 text-2xl mb-4">Leave request submitted successfully</h1>
          <h3 className="text-black text-3xl font-bold">Success</h3>
        </div>
      );
      setTimeout(() => {
        setNotification(null);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Leave request submission error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-100 z-40"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 shadow-lg rounded-lg p-4 text-white z-50">
        <div className="overflow-y-auto max-h-[500px] w-[510px]">
          <div className="mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <h3 className="font-semibold text-slate-300 ml-1 flex justify-center">Mark Attendance</h3>
                <h3 className="font-semibold text-slate-400 ml-1">Working Time</h3>
                <input
                  className="bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="text"
                  placeholder="time"
                  id="time"
                  value={time}
                  readOnly
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-slate-400 ml-1">1 Day Salary</h3>
                <input
                  className="bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="text"
                  placeholder="price"
                  id="price"
                  value={price}
                  readOnly
                />
              </div>
              <div className="flex justify-center items-center gap-6">
                <button
                  type="submit"
                  className="bg-blue-700 bg-opacity-50 border border-white text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Submit
                </button>
                <button
                  onClick={onClose}
                  className="bg-blue-700 bg-opacity-50 border border-white text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Close
                </button>
              </div>
            </form>
            <form onSubmit={handleLeaveSubmit}>
              <div className="mt-4">
                <h1 className="font-semibold text-slate-300 ml-1 flex justify-center">Leave Request Form</h1>
                <input
                  className="bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="email"
                  placeholder="Email"
                  id="Email"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <input
                  className="bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 mb-4"
                  type="text"
                  placeholder="Phone"
                  id="Phone"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <textarea
                  className="bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-20 mb-4"
                  type="text"
                  placeholder="Description"
                  id="desc"
                  maxLength={50}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center items-center gap-6">
                <button
                  type="submit"
                  className="bg-blue-700 bg-opacity-50 border border-white text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Submit
                </button>
                <button
                  onClick={onClose}
                  className="bg-blue-700 bg-opacity-50 border border-white text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {notification && (
        <div>
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-50"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            {notification}
          </div>
        </div>
      )}
      <div className=" text-center">
        {errorMessage && (
          <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

Mark.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Mark;

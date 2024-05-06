import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Dash from "../../components/sideDash";
import Cat from "./fff.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [ loading,setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(formData);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  /*const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("http://localhost:3000/employe/signup/emp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/profile");
        // Reset form data after successful submission
        setFormData({});
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="h-[600px] relative">
          <img src={Cat} alt="" className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0">
            <Dash />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
            <div className=" mt-[-100px] w-[1100px] h-[550px] bg-navy-blue rounded-lg border border-white">
              <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
                <div className="flex-1">
                  <form className="flex flex-col " onSubmit={handleSubmit}>
                    <div className="flex gap-8 mt-8 ml-[-110px]">
                      <div>
                        <div>
                          <h3 className="font-semibold text-slate-400 ml-1 text-white">
                            FirstName
                          </h3>
                          <input
                            className={`bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 ${
                              formData.FirstName ? "text-white" : ""
                            }`}
                            type="text"
                            placeholder=""
                            id="FirstName"
                            onChange={handlchange}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-400 ml-1 text-white">
                            LastName
                          </h3>
                          <input
                            className={`bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 ${
                              formData.LastName ? "text-white" : ""
                            }`}
                            type="text"
                            placeholder=""
                            id="LastName"
                            onChange={handlchange}
                          />
                        </div>
                      </div>

                      <div>
                        <div>
                          <h3 className="font-semibold text-slate-400 ml-1 text-white">
                            Email
                          </h3>
                          <input
                            className={`bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 ${
                              formData.email ? "text-white" : ""
                            }`}
                            type="email"
                            placeholder="name@company.com"
                            id="email"
                            onChange={handlchange}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-400 ml-1 text-white">
                            Password
                          </h3>
                          <input
                            className={`bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 ${
                              formData.password ? "text-white" : ""
                            }`}
                            type="password"
                            placeholder="Password"
                            id="password"
                            onChange={handlchange}
                          />
                        </div>
                      </div>
                    </div>


                    <div className="flex gap-8  mt-7 ml-[-110px]">
                      <div>
                      <div>
                      <h3 className="font-semibold text-slate-400 ml-1 text-white">
                            BirthDate
                          </h3>
                          <input
                            className={`bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 text-gray-500 ${
                              formData.BirthDate ? "text-white" : ""
                            }`}
                            type="date"
                            id="BirthDate"
                            
                            onChange={handlchange}
                          />
                        </div>


                        <div>
                        <h3 className="font-semibold text-slate-400 ml-1 text-white">
                            Gender
                          </h3>
                          <select
                            className={`bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 text-gray-500 ${
                              formData.Gender ? "text-white" : ""
                            }`}
                            id="Gender"
                            onChange={handlchange}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>

                        <div>
                      <h3 className="font-semibold text-slate-400 ml-1 text-white">
                            Photo
                          </h3>
                          <input
                            className={`bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 text-gray-500 ${
                              formData.BirthDate ? "text-white" : ""
                            }`}
                            type="file"
                            id="profilePicture"
                            
                            onChange={handlchange}
                          />
                        </div>

                    
                      </div>

                      <div>
                        <div>
                        <h3 className="font-semibold text-slate-400 ml-1 text-white">
                            Contact
                          </h3>
                          <input
                            className={`bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 ${
                              formData.Contact ? "text-white" : ""
                            }`}
                            type="text"
                            placeholder=""
                            id="Contact"
                            maxLength={10}
                            onChange={handlchange}
                          />
                        </div>

                        <div>
                        <h3 className="font-semibold text-slate-400 ml-1 text-white">
                            Address
                          </h3>
                          <input
                            className={`bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-12 ${
                              formData.Address ? "text-white" : ""
                            }`}
                            type="text"
                            placeholder=""
                            id="Address"
                            maxLength={10}
                            onChange={handlchange}
                          />
                        </div>

                        <div>
                        <h3 className="font-semibold text-slate-400 ml-1 text-white">
                            Position
                          </h3>
                          <select
                            className={`bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 text-gray-500 ${
                              formData.Position ? "text-white" : ""
                            }`}
                            id="Position"
                            onChange={handlchange}
                          >
                          <option value="">Select Position</option>
                          <option value="marshelart Trainer">
                            MarshelArt Trainer
                          </option>
                          <option value="Group Fitness Instructor">
                            Fitness Instructor
                          </option>
                          <option value="arabic">
                            Arabic Trainer
                          </option>
                          <option value="frontdesk">
                            Front Desk Staff
                          </option>
                          <option value="manager">
                            Manager
                          </option>
                          <option value="Doctor">
                            Doctor
                          </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button
                      className=" bg-purple-600 border  mt-10 ml-64 font-semibold text-slate text-white p-3 rounded-lg w-[200px] h-11 hover:opacity-90 hover:bg-yellow-300 hover:text-black"
                      type="submit"
                      disabled={loading}

                    >
                   {loading ? (
                        <>
                          <sapn className="pl-3 font-serif opacity-80">
                            Loading...
                          </sapn>
                        </>
                      ) : (
                        "Add Employee"
                      )}                    </button>
                  </form>
                  {errorMessage && (
                    <p className="mt-5 text-white bg-red-300 bg-opacity-35 w-300 h-7 rounded-lg text-center ">
                      {errorMessage}
                    </p>
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

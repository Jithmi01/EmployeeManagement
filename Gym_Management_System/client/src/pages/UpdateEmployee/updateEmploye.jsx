import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dash from "../../components/sideDash";
import Cat from "./fff.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { EploId } = useParams();
  const[setPublishError]=useState({});

  useEffect(() => {
    try {
      const fetchouse = async () => {
        const res = await fetch(`http://localhost:3000/employe/getEmploye?eploId=${EploId}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedemp = data.Empp.find(
            (Employe) => Employe._id === EploId
          );
          if (selectedemp) {
            setFormData(selectedemp);
          }
        }
      };
      fetchouse();
    } catch (error) {
      console.log(error.message);
    }
  }, [EploId]);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/employe/updateEmploye/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message);
        return;
      }

      if (res.ok) {
        setErrorMessage(null);
        navigate(`/view`);
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div>
    <div>
      <div className="h-[600px] relative">
        {" "}
        {/* Added relative class */}
        <img src={Cat} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0">
          {" "}
          {/* Positioned Dash component here */}
          <Dash />
        </div>{" "}
        {/* Added object-cover class */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
          <div className=" mt-[-50px] w-[1000px] h-[500px] bg-white rounded-lg bg-opacity-10 border border-white">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
              <div className="flex-1">
                <form className="flex flex-col " onSubmit={handleSubmit}>
                  <div className="flex gap-8 mt-8 ml-[-110px]">
                    <div>
                      <div>
                        <h3 className="font-semibold text-slate-400 ml-1">
                          FirstName
                        </h3>
                        <input
                          className="bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11"
                          type="text"
                          placeholder=""
                          id="FirstName"
                          
                          onChange={handlchange}
                          value={formData.FirstName}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-400 ml-1">
                          LastName
                        </h3>
                        <input
                          className=" bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11"
                          type="text"
                          placeholder=""
                          id="LastName"
                          onChange={handlchange}
                          value={formData.LastName}
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <h3 className="font-semibold text-slate-400 ml-1">
                          Email
                        </h3>
                        <input
                          className=" bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11"
                          type="email"
                          placeholder="name@company.com"
                          id="email"
                          onChange={handlchange}
                          value={formData.email}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-400 ml-1">
                          Password
                        </h3>
                        <input
                          className=" bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11"
                          type="password"
                          placeholder="Password"
                          id="password"
                          onChange={handlchange}
                          value={formData.password}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-8  mt-7 ml-[-110px]">
                    <div>
                      <div>
                        <h3 className="font-semibold text-slate-400 ml-1">
                          BirthDate
                        </h3>
                        <input
                          className=" bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11"
                          type="text"
                          placeholder="(dd/mm/yy)"
                          id="BirthDate"
                          maxLength={10}
                          onChange={handlchange}
                          value={formData.BirthDate}
                        />
                      </div>

                      <div>
                          <h3 className="font-semibold text-slate-400 ml-1">
                            JoiningDate
                          </h3>
                          <input
                            className={`bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 ${
                              formData.JoingDate ? "text-white" : ""
                            }`}
                            type="text"
                            placeholder="(dd/mm/yy)"
                            id="JoingDate"
                            maxLength={10}
                            onChange={handlchange}
                          />
                        </div>

                      <div>
                        <h3 className="font-semibold text-slate-400 ml-1">
                         Gender
                        </h3>
                        <select
                          className="bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 "
                          id="Gender"
                          onChange={handlchange}
                          value={formData.Gender}
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
                        <h3 className="font-semibold text-slate-400 ml-1">
                          Contact
                        </h3>
                        <input
                          className=" bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11"
                          type="text"
                          placeholder=""
                          id="Contact"
                          maxLength={10}
                          onChange={handlchange}
                          value={formData.Contact}
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-400 ml-1">
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
                        <h3 className="font-semibold text-slate-400 ml-1">
                          Position
                        </h3>
                        <select
                          className="bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11 "
                          id="Position"
                          onChange={handlchange}
                          value={formData.Position}
                        >
                          <option value="">Select Position</option>
                          <option value="Personal Trainer">
                            Personal Trainer
                          </option>
                          <option value="Group Fitness Instructor">
                            Group Fitness Instructor
                          </option>
                          <option value="Fitness Manager">
                            Fitness Manager
                          </option>
                          <option value="Front Desk Staff">
                            Front Desk Staff
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    className=" bg-blue-800 border  mt-10 ml-64 text-white text-opacity-70 font-serif p-3 rounded-lg w-[200px] h-11 hover:opacity-90"
                    type="submit"
                  
                  >
                   
                      Add Employee
                   
                  </button>
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

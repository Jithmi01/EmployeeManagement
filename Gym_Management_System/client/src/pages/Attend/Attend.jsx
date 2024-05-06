import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSilce";
import Cat from "./fff.jpg";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("please fill all the fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("http://localhost:3000/employe/signin/empp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/emp");
      }
    } catch (error) {
      // Define 'data' here to resolve the 'data is not defined' error
      const data = error.response.data;
      dispatch(signInFailure(data.message));
    }
  };

  return (
    <div>
      <div>
        <div className="h-[600px] relative">
          <img src={Cat} alt="" className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
              <div className="flex-1">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <h3 className="font-semibold text-slate-400 ml-1">Email</h3>
                    <input
                      className=" bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11"
                      type="email"
                      placeholder="name@company.com"
                      id="email"
                      onChange={handlchange}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-400 ml-1">Password</h3>
                    <input
                      className=" bg-slate-200 bg-opacity-30 border border-slate-100 p-3 rounded-lg w-[460px] h-11"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handlchange}
                    />
                  </div>
                  <button
                    className=" bg-blue-700 bg-opacity-50 border border-white text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                    type="submit"
                    disabled={loading}
                  >
                  
                      Sign In & Mark
                  
                  </button>
                </form>
                {errorMessage && (
                  <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

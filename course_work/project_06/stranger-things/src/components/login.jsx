import { useState } from "react";
import {  Link } from "react-router-dom";
import { loginEndpoint } from "../api";



function setKey ( key ) {


}
const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
  //console.log(process.env.VITE_LOGIN_KEY);
    const handleUserChange = (event) => {
        setUserName(event.target.value);
        console.log(userName);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        console.log(password)
    }

    const handleSubmitButton = async (props) => {
      
      console.log(props);
        try{
        const newToken = await loginEndpoint(userName, password)
        console.log(`newToken`, newToken);
        } catch(err){
            console.error(err)
        }

    };

    return (
      <>
        <div className="bg-black/50 fixed top-0 left-0 w-full h-screen">
          <div className="fixed w-full px-4 py-24 z-50">
            <div className="max-w-[450px] h-[450px] rounded mx-auto bg-black/80 text-white">
              <div className="max-w-[320px] mx-auto py-16">
                <h1>Login</h1>
                <form className="w-full flex flex-col py-4">
                  <label className="text-white font-bold">User Name</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={handleUserChange}
                    className="p-3 my-2 rounded text-black"
                    placeholder="User Name"
                  />
                  <label className="text-white font-bold">Password</label>
                  <input
                    type="password"
                    required
                    className="p-3 my-2 rounded text-black"
                    onChange={handlePasswordChange}
                    placeholder="Password"
                  />

                  <button
                    type="submit"
                    onClick={handleSubmitButton}
                    className="bg-red-700 py-3 my-6 rounded font-bold px-4"
                  >
                    Log in
                  </button>
                  <div >
                    <Link to={`/things`}>Cancel</Link>
                    <Link to={`/Register`} className="float-right">Register</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}


export default Login;
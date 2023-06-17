import { useState } from "react";
import { loginEndpoint } from "../api";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleUserChange = (e) => {
        setUserName(e.target.value);
        console.log(userName);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(password)
    }

    const handleSubmitButton = async () => {
        try{
        const newToken = await loginEndpoint()
        console.log(`newToken`, newToken);
        } catch(err){
            console.error(err)
        }

    };

    return (
      <div className="Login">
        <form className="form">
          <div className="input-group">
            <label>User Name</label>
            <input value={userName} onChange={handleUserChange} />
            <label>Password</label>
            <input onChange={handlePasswordChange} />
            
            <button type="submit" value="submit" onClick={handleSubmitButton} />
          </div>
        </form>
      </div>
    );
}


export default Login;
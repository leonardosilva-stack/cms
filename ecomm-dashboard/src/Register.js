import React, {useState, useEffect} from 'react';
import { useNavigate  } from "react-router-dom";
import Header from "./Header"

function Register(){

    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            history("/add");
        }
    },[])
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useNavigate ();

    async function signUp() { 
        let item = {name,password,email}
        

        let result = await fetch("http://localhost:8000/api/register" ,{
            method: 'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })

        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result));
        history("/add");
    }


    return(
        <>
        <Header />
        <div className="col-sm-3 offset-sm-4">
            <h1>Register Page</h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control mt-5" placeholder="name" />
            <br />

            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className="form-control" placeholder="email" />
            <br />

            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="form-control" placeholder="password" />
            <br />

            <button onClick={signUp} className="btn btn-primary">Sign Up</button>
        </div>
        </>
    )
}

export default Register
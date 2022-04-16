import React, {useState, useEffect} from 'react';
import { useNavigate  } from "react-router-dom";
import Header from "./Header"

function Login(){



    const history = useNavigate ();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            history("/add");
        }
    },[])

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        let item = {email,password};
        let result = await fetch("http://localhost:8000/api/login" ,{
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result));
        history("/add");
    }

    return(
        <>
        <Header />
        <div className="col-sm-3 offset-sm-4">
            <h1>
                Login Page
            </h1>

            <input type="email"  className="form-control" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
            <br />

            <input type="password" className="form-control" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            <br />

            <button onClick={login} className="btn btn-primary">Login</button>
            </div>
        </>
    )
}

export default Login
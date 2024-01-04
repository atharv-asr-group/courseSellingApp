import Button  from "@mui/material/Button";
import { useEffect,useState } from "react";

function Appbar(){
    const [userEmail,setUserEmail]=useState(null);

    useEffect(()=>{
        fetch('http://localhost:3002/admin/me',{
            method:'GET',
            headers:{
                'authorization':"Bearer "+localStorage.getItem('token')
            }
        }).then((res)=>{
            res.json().then((data)=>{
                if(data.username){
                    setUserEmail(data.username);
                }
                console.log(data.username);
            })
        })
    })
    if(userEmail){
        return (
            <div style={{display:"flex",
        justifyContent:"space-between"}}>
            <div>
                <h3>Coursera</h3>
            </div>
            <div>
                {userEmail}
                <Button variant={"contained"} onClick={()=>{
                    localStorage.setItem('token','');
                    window.location='/signup';
                }}>Logout</Button>
            </div>
        </div>
        )
    }
    return(
        <div style={{display:"flex",
        justifyContent:"space-between"}}>
            <div>
                <h3>Coursera</h3>
            </div>
            <div>
                <Button variant={"contained"} onClick={()=>{
                    window.location='/signup';
                }}>Signup</Button>
                <Button variant={"contained"}
                        onClick={()=>{
                            window.location='/login';
                        }}
                >Signin</Button>
            </div>
        </div>
    )
}
export default Appbar;
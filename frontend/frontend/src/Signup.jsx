import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useState } from 'react';

function Signup(){
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    return (
        <div>
            {email}
        <center>
            <div style={{paddingTop:150}}>
                <h4>Welcome to coursera. Sign up below.</h4>
            </div>
            <Card variant="outlined" style={{width:400, padding:20}}>
            <br />
      <TextField fullWidth={true} id="username" label="username" variant="outlined" 
      onChange={(e)=>{
        setEmail(e.target.value);
    }}/>
            <br />
            <TextField fullWidth={true} id="password" label="password" variant="outlined" 
            onChange={(e)=>{
                setPassword(e.target.value);
            }}/>
            <br /><br />
            <Button variant="contained"
             onClick={()=>{
                
                fetch('http://localhost:3002/admin/signup',{
                    method:'POST',
                    body:JSON.stringify({
                        username:email,
                        password
                    }),
                    headers:{
                        'Content-type':'application/json'
                    }
                })
            }}
            >sign up</Button>
            <br />
        </Card>
        </center>
        </div>
    )
}
export default Signup;
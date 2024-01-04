import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

function Signup(){
    return (
        <div>
        <center>
            <div style={{paddingTop:150}}>
                <h4>Welcome to coursera. Sign up below.</h4>
            </div>
            <Card variant="outlined" style={{width:400, padding:20}}>
            <br />
      <TextField fullWidth={true} id="username" label="username" variant="outlined" />
            <br />
            <TextField fullWidth={true} id="password" label="password" variant="outlined" />
            <br /><br />
            <Button variant="contained"
             onClick={()=>{
                let username=document.getElementById('username').value;
                let password=document.getElementById('password').value;
                console.log(username);
                fetch('http://localhost:3002/admin/signup',{
                    method:'POST',
                    body:JSON.stringify({
                        username,
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
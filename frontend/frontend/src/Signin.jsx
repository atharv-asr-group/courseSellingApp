import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

function Signin(){
    return (
        <div>
        <center>
            <div style={{paddingTop:150}}>
                <h4>Welcome to coursera. Sign up below.</h4>
            </div>
            <Card variant="outlined" style={{width:400, padding:20}}>
            <br />
      <TextField fullWidth={true} id="outlined-basic" label="username" variant="outlined" />
            <br />
            <TextField fullWidth={true} id="outlined-basic" label="password" variant="outlined" />
            <br /><br />
            <Button variant="contained">sign in</Button>
            <br />
        </Card>
        </center>
        </div>
    )
}
export default Signin;
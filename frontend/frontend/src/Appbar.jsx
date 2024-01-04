import Button  from "@mui/material/Button";
function Appbar(){
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
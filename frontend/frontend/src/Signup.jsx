function Signup(){
    return (
        <div>
        <center>
            <div>
                Welcome to coursera. Sign up below.
            </div>
        <div style={{
            border:"2px solid black",
            width:400
        }}>
            Username- <input type="text" />
            <br />
            Password- <input type="text" />
            <br />
            <button>Signup</button>
        </div>
        </center>
        </div>
    )
}
export default Signup;
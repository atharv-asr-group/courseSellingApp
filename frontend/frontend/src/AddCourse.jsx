import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useState } from 'react';

function AddCourse(){
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [link,setLink]=useState('');
    const [price,setPrice]=useState('');


    return(
        <div>
            
        <center>
            <div style={{paddingTop:150}}>
            </div>
            <Card variant="outlined" style={{width:400, padding:20}}>
            <br />
      <TextField fullWidth={true}  label="title" variant="outlined" 
      onChange={(e)=>{
        setTitle(e.target.value);
      }}/>
            <br />
            <TextField fullWidth={true} label="description" variant="outlined" 
            onChange={(e)=>{
                setDescription(e.target.value);
            }}/>
            <TextField fullWidth={true}  label="image link" variant="outlined" 
            onChange={(e)=>{
                setLink(e.target.value);
            }}/>
            <TextField fullWidth={true}  label="price" variant="outlined" 
            onChange={(e)=>{
                setPrice(e.target.value);
            }}/>

            <br /><br />
            <Button variant="contained" 
            onClick={()=>{
                console.log(JSON.stringify({
                    title:title,
                    description:description,
                    price:Number(price),
                    link:link
                }));
                fetch('http://localhost:3002/admin/courses',{
                    method:'POST',
                    body:JSON.stringify({
                        title:title,
                        description:description,
                        price:Number(price),
                        link:link
                    }),
                    headers:{
                        'Content-type':'application/json',
                        'authorization':'Bearer '+localStorage.getItem('token')
                    }
                })
            }}>Add course</Button>
            <br />
        </Card>
        </center>
        </div>
    )
    
}
export default AddCourse;
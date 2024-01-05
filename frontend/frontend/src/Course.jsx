import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseCard } from "./Courses";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Course(){
    let {courseId}=useParams();
    const [courses,setCourses]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:3002/admin/courses/',{
            method:'GET',
            headers:{
                'authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then((res)=>{
            res.json().then((data)=>{
                setCourses(data);
            })
        })
    },[])
    let course=null;
    for(var i=0;i<courses.length;i++){
        if(courses[i]._id==courseId){
            course=courses[i];
        }
    }
    if(!course){
        return(
            <>loading...</>
        )
    }
    return (
        <div style={{display:'flex' }}>
            
            <CourseCard course={course}/>
            <UpdateCard courseId={courseId}/>
        </div>
    )
}
function UpdateCard(props){
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [link,setLink]=useState('');
    const [price,setPrice]=useState('');
    return (
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
                fetch('http://localhost:3002/admin/courses/'+props.courseId,{
                    method:'PUT',
                    body:JSON.stringify({
                        title:title,
                        description:description,
                        price:Number(price),
                        imageLink:link
                    }),
                    headers:{
                        'Content-type':'application/json',
                        'authorization':'Bearer '+localStorage.getItem('token')
                    }
                })
            }}>Update course</Button>
            <br />
        </Card>
        </center>
        </div>
    )
}
export default Course;
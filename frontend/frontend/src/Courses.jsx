import { Card } from "@mui/material";
import { useState,useEffect } from "react";
function Courses(){
    const [courses,setCourses]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:3002/admin/courses',{
            method:'GET',
            headers:{
                'authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then((res)=>{
            res.json().then((data)=>{
                setCourses(data);
                console.log(data);
            })
        })
    },[]);

    return (
        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
            {courses.map((course)=>{
                return(
                    <CourseCard course={course}/>
                )
            })}
        </div>
    )
}
export function CourseCard(props){
    return(
        <Card style={{
            width: 300,
            minHeight:200,
            margin:10
        }}>
            <h2>{props.course.title}</h2>
            <h3>{props.course.description}</h3>
            <img src={props.course.imageLink} alt="" style={{width:300}}/>
            <h4>{props.course.price}</h4>
        </Card>
        
    )
}
export default Courses;
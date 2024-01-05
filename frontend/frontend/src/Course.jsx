import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CourseCard } from "./Courses";
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
        <div>
            {courseId}
            <CourseCard course={course}/>
        </div>
    )
}
export default Course;
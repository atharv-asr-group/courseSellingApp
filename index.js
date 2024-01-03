const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
app.use(bodyParser.json());
app.use(cors());


const ADMINS=[]
const USERS=[]
const COURSES=[]

function authenticateAdmin(req,res,next){
    const {username,password}=req.headers;
    const adminfound=ADMINS.find(a=>a.username==username&&a.password==password);
    if(adminfound){
        next();
    }else{
        res.status(403).send('authentication failed');
    }
}


// admin routes

app.post('/admin/signup',(req,res)=>{
    const body=req.body;
    const user={username:body.username,
    password:body.password}
    ADMINS.push(user);
    res.send('admin created successfully');
})

app.post('/admin/login',authenticateAdmin,(req,res)=>{
    res.send('logged in successfully');
})
var ctr=1;
app.post('/admin/courses',authenticateAdmin,(req,res)=>{
    const courseBody=req.body;
    const course={id:ctr,title:courseBody.title,
    description:courseBody.description,price:courseBody.price,
    publicshed:true, imageLink:courseBody.link
}
ctr++;
    COURSES.push(course);
    res.send({message:'course created successfully', id:(ctr-1)})
})
app.get('/admin/courses',authenticateAdmin,(req,res)=>{
    res.send(COURSES);
})
app.put('/admin/courses/:courseId',authenticateAdmin,(req,res)=>{
    const id=parseInt(req.params.courseId);
    const course=COURSES.find(a=>a.id==id);
    if(course){
        res.send('course updated');
        // code to update
    }else{
        res.status(404).send('course not found');
    }
})

// user routes

app.post('/users/signup',(req,res)=>{
    const userBody=req.body;
    const user={username:userBody.username,password:userBody.password};
    USERS.push(user);
    res.send('user account created successfully');
});

app.post('/users/login',userAuthentication,(req,res)=>{
    res.send('user logged in successfully');
});

app.get('/users/courses',userAuthentication,(req,res)=>{
    const filteredCourses=COURSES.filter(a=>a.publicshed);
    res.send(filteredCourses);
});

app.post('/user/courses/:courseId',userAuthentication,(req,res)=>{
    const id=req.params.courseId;
    const course=COURSES.find(a=>a.id==id&&a.publicshed);
    if(course){
        res.send('course purchased');
        // code adding courses.
    }else{
        res.status(404).send('course not found');
    }
})




app.listen(3002,()=>{
    console.log('listening on port 3000');
})
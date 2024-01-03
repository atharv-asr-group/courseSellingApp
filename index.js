const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const jwt=require('jsonwebtoken');
app.use(bodyParser.json());
app.use(cors());

const superkey='supra';

const ADMINS=[]
const USERS=[]
const COURSES=[]

function authenticateAdmin(req,res,next){
    const {authorization}=req.headers;
    const token=authorization.split(' ')[1];
    jwt.verify(token,superkey,(err,data)=>{
        if(err){
            res.status(403).send('authentication failed');
        }
        next();
    })
}

function userAuthentication(req,res,next){
    const {authorization}=req.headers;
    const token=authorization.split(' ')[1];
    jwt.verify(token,superkey,(err,data)=>{
        if(err){
            res.status(403).send('authentication failed');
        }
        next();
    });
}


// admin routes

app.post('/admin/signup',(req,res)=>{
    const body=req.body;
    const user={username:body.username,
    password:body.password}
    ADMINS.push(user);
    const payload={username:body.username};
    const token= jwt.sign(payload,superkey,{expiresIn:'1h'});
    res.send({message:'admin created successfully',token:token});
})

app.post('/admin/login',(req,res)=>{
    const {username,password}=req.headers;
    const admin=ADMINS.find(a=>a.username==username&&a.password==password);
    
    if(admin){
        const payload={username:admin.username};
    const token= jwt.sign(payload,superkey,{expiresIn:'1h'});
    
        res.send({message:'logged in successfully',token});
    }else{
        res.status(403).send('login failed');
    }
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
    const payload={username:userBody.username}
    const token=jwt.sign(payload,superkey,{expiresIn:'1h'});
    res.send({message:'user created',token:token});
});

app.post('/users/login',(req,res)=>{
    const {username,password}=req.headers;
    const user=USERS.find(a=>a.username==username&&a.password==password);
    if(user){
        const payload={username:user.username};
    const token= jwt.sign(payload,superkey,{expiresIn:'1h'});
    
        res.send({message:'logged in successfully',token});
    }else{
        res.status(403).send('login failed');
    }
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
    console.log('listening on port 3002');
})
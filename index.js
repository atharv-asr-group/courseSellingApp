const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
app.use(bodyParser.json());
app.use(cors());

const superkey='supra';

const ADMINS=[]
const USERS=[]
const COURSES=[]


const userSchema= new mongoose.Schema({
    username:{type: String},
    password: String,
    purchasedCourses:[{type:mongoose.Schema.Types.ObjectId, ref:'Course'}]
});


const adminSchema = new mongoose.Schema({
    username:String,
    password: String
});


const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink:String,
    published:Boolean
});

const User = mongoose.model('User',userSchema);
const Admin = mongoose.model('Admin',adminSchema);
const Course = mongoose.model('Course', courseSchema);


mongoose.connect('mongodb+srv://atharv:courseselling@cluster0.qn4tqxw.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" })
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
        req.user=data;
        next();
    });
}


// admin routes

app.post('/admin/signup',async(req,res)=>{
    const body=req.body;
    const userName=body.username;
    const user={username:body.username,
    password:body.password}
    const adminExist= await Admin.findOne({userName});
    if(adminExist){res.status(403).send('username exists')};
    const newAdmin=new Admin(user);
    newAdmin.save();
    const payload={username:body.username};
    const token= jwt.sign(payload,superkey,{expiresIn:'1h'});
    res.send({message:'admin created successfully',token:token});
})

app.post('/admin/login',async (req,res)=>{
    const {username,password}=req.headers;
    const admin=await Admin.findOne({username,password});
    
    if(admin){
        const payload={username:admin.username};
    const token= jwt.sign(payload,superkey,{expiresIn:'1h'});
    
        res.send({message:'logged in successfully',token});
    }else{
        res.status(403).send('login failed');
    }
})

app.post('/admin/courses',authenticateAdmin,async(req,res)=>{
    const courseBody=req.body;
    const course={title:courseBody.title,
    description:courseBody.description,price:courseBody.price,
    publicshed:true, imageLink:courseBody.link
}
    
    const newCourse=new Course(course);
    await newCourse.save();
    res.send({message:'course created successfully'})
})

app.get('/admin/courses',authenticateAdmin,async (req,res)=>{
    const courses=await Course.find({});
    res.send(courses);
})

app.put('/admin/courses/:courseId',authenticateAdmin,async (req,res)=>{
    const course= await Course.findByIdAndUpdate(req.params.courseId, req.body,  {new:true});
    if(course){
        res.send({message:'course updated successfully'});
    }else{
        res.status(404).send({message:'course not found'});
    }
})

// user routes

app.post('/users/signup',async (req,res)=>{
    const userBody=req.body;
    const user={username:userBody.username,password:userBody.password};
    const newUser=new User(user);
    await newUser.save();
    const payload={username:userBody.username}
    const token=jwt.sign(payload,superkey,{expiresIn:'1h'});
    res.send({message:'user created',token:token});
});

app.post('/users/login',async (req,res)=>{
    const {username,password}=req.headers;
    const user=await User.findOne({username,password})
    if(user){
        const payload={username:user.username};
    const token= jwt.sign(payload,superkey,{expiresIn:'1h'});
    
        res.send({message:'logged in successfully',token});
    }else{
        res.status(403).send('login failed');
    }
});

app.get('/users/courses',userAuthentication,async (req,res)=>{
    const filteredCourses= await Course.find({published:true});

    res.send(filteredCourses);
});

app.post('/users/courses/:courseId',userAuthentication,async (req,res)=>{
    const course= await Course.findById(req.params.courseId);
    if(course){
        const user=await User.findOne({username:req.user.username});
        if(user){
            user.purchasedCourses.push(course);
            await user.save();
            res.send({message:"course purchased"});
        }else{
            res.status(403).send({message:'user not found'});
        }
    }else{
        res.status(404).send({message:'course not found'});
    }
})

app.get('/users/purchasedCourses',userAuthentication,async (req,res)=>{
    const user =await User.findOne({username:req.user.username}).populate('purchasedCourses');
    if(user){
        res.json({purchasedCourses:user.purchasedCourses||[]});

    }else{
        res.status(403).json({message:'user not found'});
    }
})


app.listen(3002,()=>{
    console.log('listening on port 3002');
})
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors');




const connectDB=async()=>{
    try{
        const conn=await mongoose.connect("mongodb+srv://qubais:qubais@cluster0.wlt08lx.mongodb.net/?retryWrites=true&w=majority")
        console.log(`mongodb connected`)
    }catch(err){
        console.log('couldnt connect to your database')
        console.log(err)
        process.exit(1)
    }
}

connectDB();



const userSchema=mongoose.Schema({
    name:{type:String},
    address:{type:String},
    designation:{type:String}
})

const User=mongoose.model('User',userSchema)


const app=express();
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('api is running ')
})

app.get('/users',async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json({
            status:"success",
            users
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err
        })
    }
})

app.get('/user/:id',async(req,res)=>{
    try{
        let user=await User.findById(req.params.id)
        res.status(202).json({
            status:"success",
            user
        })
    }catch(err){
        res.status(404).json({
            status:"success",
            message:err
        })
    }
})

app.delete('/user/:id',async(req,res)=>{
    try{
       await User.deleteOne({_id:req.params.id})
       let users=await User.find()
       res.status(200).json({
        status:"success",
        users
       })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err
        })
    }
})

app.put('/user/:id',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        console.log(user,req.body)
        user.name=req.body.name;
        user.designation=req.body.designation;
        user.address=req.body.address;
        await user.save()
        res.status(200).json({
            status:"success",
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err
        })
    }
})


app.post('/user',async(req,res)=>{
    try{
        const user=await User.create(req.body)
        const users=await User.find()
        res.status(200).json({
            status:'success',
            users
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err
        })
    }

})





const port=5000
app.listen(port,console.log(`server running on port ${port}`))
const projects = require('../Model/projectSchema')

exports.addProject = async(req,res)=>{
    console.log("inside add project function");
    const {title,languages,github,overview,website}=req.body
    const projectImage = req.file.filename
   
    
    const userId=req.payload
    // console.log(title,languages,github,overview,website,userId);
    
    // res.status(200).json("add project request recieved")
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project Already Exists...")
        }else{
            const newProject = new projects({
title,languages,github,overview,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
       

    }catch(err){
        res.status(401).json(err)
    }
    
}


//GetHomeProjects

exports.getHomeProjects=async(req,res)=>{
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err)
    {
        res.status(401).json(err)
    }
}


//GetAllProjects

exports.getAllProjects=async(req,res)=>{
    const searchKey = req.query.search
    const query = {
        languages:{$regex:searchKey,$options:"i"}
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }catch(err)
    {
        res.status(401).json(err)
    }
}


//GetUserProjects

exports.getUserProjects=async(req,res)=>{
    
        const userId=req.payload
        try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err)
    {
        res.status(401).json(err)
    }
}
//edit projects

exports.editProject= async(req,res)=>{

    const {title,languages,github,overview,website,projectImage}=req.body
    const uploadImage = req.file?req.file.filename:projectImage
    const userId=req.payload

    const {pid}=req.params
    try{
        const updateProject=await projects.findByIdAndUpdate({_id:pid},{
            title,languages,github,overview,website,projectImage:uploadImage,userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
    }catch(err){
        res.status(401).json(err)
    }
}

//deleteProject

exports.deleteProject = async(req,res)=>{
    const {pid} = req.params

    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        result.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err)
    }
}
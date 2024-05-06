import express from "express";
import jwt from "jsonwebtoken";import { verifyToken } from "../Middelware/VerfiyUser.js";
import Emp from "../models/Employee.js";
import Attend from "../models/Attend.model.js";
import Absent from "../models/Absent.model.js";

const router = express.Router();


//add new employee
router.post("/signup/emp",async(req,res)=>{

    const { email, password,FirstName, LastName,BirthDate,Gender,Contact,Address,Position } = req.body;
      
    const newUser = new Emp({
          email,
          password,
          FirstName, 
          LastName,
          BirthDate,
          Gender,
          Contact,
          Address,
          Position
         
      })

      newUser.save().then(()=>{
        res.json("Employee Added")
    }).catch((err)=>{
         console.log(err);
    })
})


// singin new employee
router.post("/signin/empp",async(req,res,next)=>{

    const {  email, password } = req.body;

    if( !email || !password  || email === '' || password === ''){
        
       return next(error(400, 'all fields are required'));
    }

    try {
        const validUser = await Emp.findOne({ email });
        if(!validUser) {
            next(error(404, 'User not found'));
        }
        

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httponly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }
})

//get all employee
router.get('/getEmploye',async(req,res,next)=>{
 
      
  

    try {
      const Empp = await Emp.find();
      res.json({ message: "User details retrieved successfully", Empp });
    } catch (error) {
      next(error);
    }
})


//update emloyee
router.put('/updateEmploye/:EmpId',async(req,res,next)=>{

    try {
        const updateEmploye = await Emp.findByIdAndUpdate(
          req.params.EmpId,
          {
            $set: {
              email: req.body.email,
              password: req.body.password,
              FirstName:req.body.FirstName,
              LastName:req.body.LastName,
              BirthDate:req.body.BirthDate,
              Gender:req.body.Gender,
              Contact:req.body.Contact,
              Position:req.body.Position
            },
          },
          { new: true }
        );
        res.status(200).json(updateEmploye);
      } catch (error) {
        next(error);
      }

})


  //delete employe
router.delete('/deletemp/:EmpId',async(req,res,next)=>{

   
      try {
        const deletedEmp = await Emp.findByIdAndDelete(req.params.EmpId);
        if (!deletedEmp) {
          return res.status(404).json({ error: 'emp not found' });
        }
        res.status(200).json({ message: 'The emp has been deleted' });
      } catch (error) {
        next(error);
      }

})

//mark employee atendance
router.post("/create",async(req,res,next)=>{
 try {
    const {  EmployeId, price, time } = req.body;
    const newattend = new Attend({
      EmployeId,
      price,
        time,
    });

   
    const savedatt= await newattend.save();
    res.status(201).json(savedatt);
        
    } catch (error) {

       next(error);
        
    }

})

// absent form submit
router.post("/absent",async(res,req,next)=>{

    const { currentuserId, Email, Phone, desc } = req.body;
  const newabs = new Absent({
    currentuserId,
    Email,
    Phone,
    desc,
  });

  try {
      await newabs.save();
      res.json(  ' succes' );
      
  } catch (error) {

     next(error);
      
  }
})


//curret employe attendce  dipslay
router.get('/getEmp/:EmployeId',async(req,res,next)=>{
    try {
        const EmployeId = req.params.EmployeId; 
        
        
        const Employe = await Attend.find({ EmployeId });
    
        if (Employe.length > 0) {
          res.json({ message: "Item details retrieved successfully", Employe });
        } else {
          return next(error(404, " not found"));
        }
      } catch (error) {
        console.log(error.message);
        next(error);
      }
})

//delete all not work  
router.delete('/deletCurretId/:EmployeId',async(req,res,next)=>{
    try {
        const { EmployeId } = req.params;
        
        
        await Attend.deleteMany({ EmployeId });
    
        res.status(200).json({ message: "Attend have been deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
})

//get all absent 
router.get('/getabsent',async(req,res,next)=>{
    try {
    

        const ABsnt = await Absent.find();
  
        if (ABsnt.length > 0) {
          res.json({
            message: "Employee details retrieved successfully",
            ABsnt,
          });
        } else {
          return next(error(404, " Employee not fonud "));
        }
     
    } catch (error) {
      console.log(error.message);
  
      next(error);
    }
})

//get current use absent
router.get('/getaBsent/:currentuserId',async(req,res,next)=>{
    try {
        const currentuserId = req.params.currentuserId; 
        
        
        const absent = await Absent.find({ currentuserId });
    
        if (absent.length > 0) {
          res.json({ message: "Item details retrieved successfully", absent });
        } else {
          return next(error(404, " not found"));
        }
      } catch (error) {
        console.log(error.message);
        next(error);
      }
})

// delete Absent  not work
router.delete('/deletempp/:AbsentId',async(req,res)=>{
    try {
        await Absent.findByIdAndDelete(req.params.AbsentId);
        res.status(200).json(" deleted");
      } catch (error) {
        next(error);
      }
})


//status 
router.put('/absent/:absentId/status',async(req,res)=>{
    try {
    

        const { absentId } = req.params;
        const { status } = req.body;
    
        const updatedabsent = await Absent.findByIdAndUpdate(
          absentId ,
          { status },
          { new: true }
        );
    
        if (!updatedabsent) {
          return next(errorHandle(404, " form not found"));
        }
    
        res.status(200).json(updatedabsent);
      } catch (error) {
        next(error);
      }
})


export default router;
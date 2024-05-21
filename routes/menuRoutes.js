const express = require('express');
const  router =  express.Router();

const Menu = require('./../Models/Menu');
const { route } = require('./personRoutes');

router.post('/',async (req,res)=>{
    try{
      const data = req.body;
    const newMenu = new Menu(data);
    const response = await newMenu.save();
    console.log("Data Saved ");
    res.status(201).json(response);
  
    }
    catch(err){
      console.log(err);
      res.status(500).json({error : 'Interval server error'});
  
    }
  
  });

  router.get('/',async (req,res)=>{
    try{
      const data = await  Menu.find();
      console.log("Data fetched Successfully");
      res.status(200).json(data);
  
    }
    catch(err){
      cosnole.log(err);
      res.status(500).json({error : 'Internal server error'});
  
    }
  });

  router.get('/:tasteType',async (req,res)=>{
    
    try{
      const tasteType = req.params.tasteType;

      if(tasteType== 'sweet' || tasteType == 'spicy' || tasteType== 'sour' || tasteType == 'tart' || tasteType == 'savory' || tasteType == 'fresh'){
        const response = await Menu.find({taste : tasteType});
        console.log("response fetched");
        res.status(200).json(response)
 
      }
      else{
        res.status(400).json({error : 'Invalid Work Type'});
      }

    }
    catch(err){
      console.log(err);
    res.status(500).json({error : 'Internal server error'});


    }
    

});

  module.exports = router;



  


const express = require('express');
const  router =  express.Router();
const Person = require('./../Models/Person');

router.post('/', async (req,res)=>{
   
    try{
      const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
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
      const data = await  Person.find();
      console.log("Data fetched Successfully");
      res.status(200).json(data);

    }
    catch(err){
      console.log(err);
      res.status(500).json({error : 'Internal server error'});

    }
});


router.get('/:workType',async (req,res)=>{
    
    try{
      const workType = req.params.workType;

      if(workType== "chef" || workType == "manager" || workType== "waiter"){
        const response = await Person.find({work : workType});
        console.log("response fetched");
        res.status(200).json(response)
 
      }
      else{
        res.status(400).json({error : 'Invalid Work Type'});
      }

    }
    catch(error){
      console.log(error);
    res.status(500).json({error : 'Internal server error'});


    }
    

});


router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{

            new :true,
            runValidators : true

        });

        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }

        console.log("response updated");
        res.status(200).json(response)

    }
    catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal server error'});

    }
});

router.delete('/:id', async (req, res) => {
    try {
      const personId = req.params.id;
  
      const response = await Person.findByIdAndDelete(personId);
      if (!response) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      console.log("Response deleted");
      res.status(200).json({ message: 'Person Data deleted Successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
module.exports = router;
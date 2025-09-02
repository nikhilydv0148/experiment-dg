// const express=require('express')
// import { configDotenv } from "dotenv";
import "dotenv/config"
import express from "express";

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

let stdata = [];

let nextId = 1;

app.post("/students", (req, res) => {
  const { name, rollno } = req.body;

  const newStudent = { id: nextId++, name, rollno };
  stdata.push(newStudent);
  res.status(201).send(newStudent);
});

app.get("/students", (req, res) => {
  res.status(201).send(stdata);
});
// show one student

app.get("/students/:id", (req, res) => {
  const student = stdata.find((st) => st.id === parseInt(req.params.id));
  if (!student) {
    return res.status(400).send("Student not found");
  }

  res.status(200).send(student);
});

// Update Student data

app.put('/students/:id',(req,res)=>{
      const student = stdata.find((st) => st.id === parseInt(req.params.id));
     if (!student) {
    return res.status(400).send("Student not found");
  }
  const {name,rollno}=req.body
  student.name=name
  student.rollno=rollno

  res.status(200).send(student)

})

// Delete Student Data

app.delete("/students/:id",(req,res)=>{
    const index=stdata.findIndex(st=>st.id===parseInt(req.params.id))
    if(index==-1){
        return res.status(404).send("student not found")
    }
    stdata.splice(index,1)
   return res.status(200).send("Deleted Successfully")
})

// app.get("/",(req,res)=>{
//     res.send("Hello Nikhil!")
// })

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}...`);
});

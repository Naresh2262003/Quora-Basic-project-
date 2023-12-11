const express=require("express");
const app=express();
const path=require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");

const port=8080;

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

// DATA
let posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"shradhakhapra",
        content:"Hard work is important to achieve success"
    },
    {
        id:uuidv4(),
        username:"rahulkumar",
        content:"I got selected for my Internship."
    }
];

app.listen(port,()=>{
    console.log(`Listening to port ${port}.`);
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("addPost.ejs");
});

app.post("/posts",(req,res)=>{
    const id=uuidv4();
    const {username,content}=req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    const {id}=req.params;
    const post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
    const {id}=req.params;
    const post=posts.find((p)=> p.id===id);
    res.render("edit.ejs",{post});
});

app.patch("/posts/:id",(req, res)=>{
    const {id}=req.params;
    const newContent=req.body.content;
    const post=posts.find((p)=> p.id===id);
    post.content=newContent;
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    const {id}=req.params;
    posts=posts.filter((p)=> p.id!==id);
    res.redirect("/posts");
});

// oooos
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat");
const methodOverride=require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
.then(()=>{console.log("conncetion successful");
})
.catch((err)=>
    console.log(err));
async function main(){
    await mongoose.connect("mongodb+srv://nitish252252:KUGpfeULLEap5p3g@testpro.fmx8863.mongodb.net/?retryWrites=true&w=majority&appName=Testpro");
}
//index route
app.get("/chats",async(req,res)=>{
    let chats= await Chat.find();
    res.render("index.ejs",{chats});
});

//new Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");

});

//create Route
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newchat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newchat.save()
    .then(res=>{
        console.log("chats was save")})
        .catch(err =>{console.log(err)
        });
    res.redirect("/chats");

});

//edit
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
   let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});

});

//update
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    let upchat= await Chat.findByIdAndUpdate(
        id,
        {msg:newmsg},
        {runValidators:true,new:true}
    );
    console.log(upchat);
    res.redirect("/chats");
   
});


//destroy

app.delete("/chats/:id", async(req,res)=>{
    let {id}=req.params;
    let delChat=await Chat.findByIdAndDelete(id);
    console.log(delChat);
    res.redirect("/chats");
})




app.get("/",(req,res)=>{
    res.send("root is working");

});

app.listen(3000,()=>{
    console.log("server is listening on port 3000");

});


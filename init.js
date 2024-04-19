const mongoose = require("mongoose");
const Chat=require("./models/chat");

main()
.then(()=>{console.log("conncetion successful");
})
.catch((err)=>
    console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[
    {
        from:"satish",
        to:"priya",
        msg:"send me notes",
        created_at:new Date()
    },
    {
        from:"saneha",
        to:"Nitish",
        msg:"send me message",
        created_at:new Date()
    },
    {
        from:"satish",
        to:"priya",
        msg:"send me notes and pdf",
        created_at:new Date()
    },
    {
        from:"pankaj",
        to:"priya",
        msg:"send me image",
        created_at:new Date()
    },
    {
        from:"Nikhil",
        to:"Nitish",
        msg:"send me video",
        created_at:new Date()
    },

]

Chat.insertMany(allchats);
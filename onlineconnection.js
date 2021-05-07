const mongoose= require("mongoose");
const Mongodb= "mongodb+srv://talole84:24231234@cluster0.cuo6b.mongodb.net/Amit?retryWrites=true&w=majority";

mongoose.connect(Mongodb,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false,
}).then(()=>{
    console.log("connection success");
}).catch((error)=>{
    console.log("no connection")
});
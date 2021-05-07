const mongoose= require("mongoose");
const mongoURI="mongodb://localhost:27017/Slambook";
mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false,

}).then(()=>{
    console.log("MongoDB database connection connect");
}).catch((error)=>{
    console.log(error);
})
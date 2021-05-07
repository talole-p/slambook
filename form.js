const mongoose= require("mongoose");

const slambookSchema= new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },
    image:{
        type:String,
    },
    nickname:{
        type:String,
        require:true,
    },
    Birthdate:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    city:{
        type:String,
        require:true,
    },
    song:{
        type:String,
        require:true,
    },
    movie:{
        type:String,
        require:true,
    },
    actress:{
        type:String,
        require:true,
    },
    actor:{
        type:String,
        require:true,
    },
    food:{
        type:String,
        require:true,
    },
    fruit:{
        type:String,
        require:true,
    },
    gift:{
        type:String,
        require:true,
    },
    advice:{
        type:String,
        require:true,
    },
    feedback:{
        type:String,
        require:true,
    }
})

const Form = new mongoose.model("userdata",slambookSchema);
module.exports= Form;
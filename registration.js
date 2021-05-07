
const mongoose= require("mongoose");
const bycypt= require("bcryptjs");
const jwt = require("jsonwebtoken");

const slambookSchema= new mongoose.Schema({
    username :{
        type:String,
        require:true
    },
    email :{
        type:String,
        require:true
    },
    password :{
        type:String,
        require:true,
        unique:true,
    },
    password2 :{
        type:String,
        require:true
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
})
// generating token
slambookSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()},"mynameisamitbalasahebtaloleformshirdi");
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        //console.log(token);
        return token;
    } catch (error) {
        res.send("the error part"+ error);
        console.log("the error part:"+error);      
    }
}


// password hashing 
slambookSchema.pre("save",async function(next){
    if(this.isModified("password")){
        //console.log(`the current password ${this.password}`);
        this.password= await bycypt.hash(this.password,10);
        this.password2= await bycypt.hash(this.password2,10);
        //console.log(`password show in database ${this.password} `);
        //console.log(`password after hashing ${this.password2} `);
    }
    next();
})

// create connection
const Formreg= new mongoose.model("Register",slambookSchema);
module.exports= Formreg;
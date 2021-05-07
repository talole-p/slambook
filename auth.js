const jwt = require("jsonwebtoken")
require("./registration");

const auth= async(req,res,next)=>{
    try {
        const token= req.cookies.jwt;
        const userverify= jwt.verify(token,"mynameisamitbalasahebtaloleformshirdi");
        console.log(userverify);
        next();
        
    } catch (error) {
        res.status(400).send(error);
        
    }

}

module.exports= auth;
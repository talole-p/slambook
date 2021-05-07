const express= require("express");
const app= express();
//require("./connection");
const port= process.env.PORT ||5000;
const path= require("path");
const hbs= require("hbs")
const ejs= require("ejs")
const Formreg= require("./registration");
const Form= require("./form");
const multer= require("multer");
require("./onlineconnection")
const datashow= Form.find({}); // data base find 
const cookieparser= require("cookie-parser")
const auth= require("./auth")
const session= require("express-session");
const mongodbsession= require("connect-mongodb-session")(session);
const Mongodb= "mongodb+srv://talole84:24231234@cluster0.cuo6b.mongodb.net/Amit?retryWrites=true&w=majority";



//here store session data in database

const store= new mongodbsession({
    uri: Mongodb,
    collection: "MySession",
});

// here use session
   app.use(session({
    secret:"key that will sign in cookie",
    resave:false,
    saveUninitialized:false,
    store:store,
}))

// here set to session isAUTh for form

const isAuth= (req,res,next)=>{
    if (req.session.isAuth){
        next()
    }else{
        res.redirect("/");
    }

}

//user authotification form admin

// create multer storeg code
var Storage= multer.diskStorage({
    //destination for file
    destination:"./public/uploads",
    filename:(req,file,cb)=>{
        cb(null, file.fieldname+ " "+Date.now()+path.extname(file.originalname));
    }
});

//upload paryamiter

const upload= multer({storage:Storage}).single('image');



// setting the path

const staticpath= path.join(__dirname,"/public");
const staticpathview= path.join(__dirname,"/templates/views");
const staticpathpartial= path.join(__dirname,"/templates/partials")

// setting the static path css, img etc

app.use(express.static("public"))
app.use(cookieparser());
app.use('/css',express.static(__dirname+'/public/css'));
app.use("/img",express.static(__dirname+"/public/img"));
app.use("js",express.static(__dirname+"/public/js"));
app.use('/css',express.static(__dirname+"/node_modules/bootstrap/dist/css/bootstrap.min.css"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// set views

app.set("views","./templates/views")
app.set("view engine","hbs")
app.set("view engine","ejs")
app.set("views", staticpathview)
hbs.registerPartials(staticpathpartial)

app.get("/",(req,res)=>{
    res.render("registration");

})
// create user database connection
app.post("/registration",async(req,res)=>{
    try{  
        //console.log(req.body.Username);
        //res.send(req.body.Username);
        const password= req.body.password;
        const cpassword= req.body.password2;
        if(password == cpassword){

            const regslam= new Formreg({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        })
        // generet Token mins middelware

        //console.log("the succses part"+ regslam);

        const token= await regslam.generateAuthToken();
        //console.log("the token part:" + token)

        // set the cookis

            res.cookie("jwt",token,{
                expires:new Date(Date.now()+60000)
            });


        // save data in database
        const registration= await regslam.save();
        res.status(201).render("form");
        
    }else{
        res.send("password not match")
    }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/form",isAuth,auth,(req,res)=>{
    res.render("form");
    console.log(req.session);
    req.session.isAuth= true;
})

app.post("/form",upload, async(req,res,next)=>{
  //  console.log(req.file.filename);
  //const dpimage= req.file.filename;
    //console.log(req.body);
    try {
    const userinfo= new Form({
        fullname: req.body.fullname,
        image:req.file.filename,    
        nickname:req.body.nickname,
        Birthdate:req.body.Birthdate,
        email:req.body.email,
        address: req.body.address,
        city: req.body.city,
        song:req.body.song,
        movie:req.body.movie,
        actress: req.body.actress,
        actor:req.body.actor,
        food: req.body.food,
        fruit:req.body.fruit,
        gift:req.body.gift,
        advice:req.body.advice,
        feedback:req.body.feedback
    })
    const userform= await userinfo.save();
    res.status(200).render("thanks");
    
        
    } catch (error) {
        res.status(400).send(error)
    }
});

app.get("/thanks",(req,res)=>{
    res.render("thanks")
})

app.get("/page",(req,res,next)=>{
   // console.log(data)
    datashow.exec(function(err,data){
        if(err) throw err;
    res.render("page",{records:data});
 
    
});
});


app.listen(port,()=>{
    console.log("5000 server activated sucessfully");
});
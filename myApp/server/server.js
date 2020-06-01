// its controlar class
const path = require('path');
var express = require('express');
var app =express();
var bodyparser = require('body-parser');
const multer = require("multer");
var cors = require('cors');
const checkAuth = require("./controller/middleware/check-auth");
var updateData = require('./controller/updateData');
var postData = require('./controller/postData');
var getData = require('./controller/getData');
var accountVarify = require('./controller/accountVarification');
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
//     next();
// });

///////////////////// Upload image multer function implements here //////////////
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
  };
  const storage = multer.diskStorage({
  destination: (req, file, cb) => {       //cb is call back
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid Mime Type');
    if(isValid){
      error = null;
    }
    cb(error, "controller/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
  }); 
///////////////////// Upload image multer function End here //////////////
// go to backend query 
app.post('/api/registration-form',checkAuth, multer({storage: storage}).single("image"), postData.registration);
app.post('/api/skillData',checkAuth,postData.skillData);
app.post('/api/tries',postData.tries);
app.post('/api/dashboardSignUp',postData.signup);
app.post('/api/dashboardSignIn',postData.signin);
app.post('/api/forgetPassword',updateData.forgetPassword);
app.post('/api/passwordChange',updateData.passChange);
app.post('/api/admin-dashboard/update-skill-type',postData.registerCountryData); 
app.post('/api/admin-dashboard/addNewSkill',postData.addNewSkill);
/////////////////////////////// Get Data From Backend Path in Controlleer /////////////////////
app.use("/images", express.static(path.join("controller/images")));
app.post('/api/admin-dashboard',checkAuth,getData.getAdminDashboard);
app.get('/api/registration-form',getData.getCountryInformation);
app.get('/api/skill-form',getData.getSkillInformation);
app.get('/api/accountVarify',accountVarify.accountVarify);
app.post('/api/admin-dashboard/admin-search-people',getData.searchPeople);
const Port = 3000;
app.listen(Port,function(){
    console.log('server is runing '+Port)
});
module.exports=app;

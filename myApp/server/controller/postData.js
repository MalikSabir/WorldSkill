var mysql = require('mysql');
var nodemailer = require('nodemailer');
var bcrypt = require("bcrypt");
var Crypter = require("cryptr"),
cryptr = new Crypter('its encription key');
const jwt = require("jsonwebtoken");
var sleep = require("system-sleep");
console.log('Malik Sabir');
var con = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "",
  database: "worldskill"
});

//Sign up page data register here//
var accountPk=null;
// var token=null;
var link;
module.exports.signup = function(req,res) {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    con.query("insert into accounts (Email,Password) VALUES ('"+req.body.email+"' ,'"+hash+"') ") ,function(error,results){
      if (error){
      res.json({
          status:false,
          message:'there are some error with query'
        })
      }
      else{
        res.json({
          status:false,
          result:results
        });
      }
    }
  });
  sleep(5000);
    con.query('SELECT Pk_accounts FROM accounts WHERE Email='+mysql.escape(req.body.email), function (err, result, fields) {
      if (err) throw err;
      // accountPk=result[0].Pk_accounts;
      accountPk=cryptr.encrypt(''+result[0].Pk_accounts);
      console.log("encrypted = "+accountPk);
    });
  //token = new Token({ _userId: accountPk, token: crypto.randomBytes(16).toString('hex') });
  sleep(1000);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'maliksabir0345@gmail.com',
      pass: '0345S@b!r'
    }
  });
  link="http://"+req.get('host')+"/api/accountVarify?id="+accountPk;
  var mailOptions = {
    from: 'maliksabir0345@gmail.com',
    to: ''+req.body.email,
    subject: '<b>Wlcome to World Skills</b>',
    text: 'press the given link given below and verify your world skills account \nPlease verify your account by clicking the '+link};
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

  module.exports.tries = function(req,res) {
    console.log("Its Tries");
    console.log(req.body.name);
    console.log(req.body.password);
    con.query("insert into trys (Name,Password) VALUES ('"+req.body.name+"','"+req.body.password+"') ") ,function(error,results){
        if (error){
          res.json({
            status:false,
            message:'there are some error with query'
          })
        }
        else{
          res.json({
            status:false,
            result:results
          });
        }
      }
    }

  //registeration form data saving here//
  var accountsPk=null;
  module.exports.registration = function(req,res,next) {
    console.log('Its Registration');
    console.log("userId Checking = "+req.body.userId);
    const url = req.protocol + '://' + req.get("host");
    const imageUrl = url+"/images/"+req.file.filename;
    
    con.query("insert into userinformation (imgUrl,firstName,lastName,code,contact,dob,addressOne,gender,country,city,totalPersonRating,totalRating,rating,Accounts_fk) VALUES ('"+imageUrl+"' ,'"+req.body.firstName+"' ,'"+req.body.lastName+"','"+req.body.code+"','"+req.body.number+"','"+req.body.dob+"','"+req.body.addressOne+"','"+req.body.gender+"','"+req.body.country+"','"+req.body.city+"','"+req.body.zip+"','20','4','"+req.body.userId+"') ") ,function(error,results){
      if (error){
      res.json({
          status:false,
          message:'there are some error with query'
        })
      }
      else{
        res.json({
          status:false,
          result:results
        });
      }
    }
    sleep(500)
    con.query("UPDATE accounts SET userInfo=1 WHERE Pk_accounts = "+mysql.escape(req.body.userId)) ,function(error,results){
      if (error){
        res.json({
          status:false,
          message:'there are some error with query'
        })
      }
      else{
        res.json({
          status:true,
          result:results,
          message: 'Plese Check Your Email for Code'  
        })
      }
    }
    }
    module.exports.skillData = function(req,res,next) {
      console.log("name = "+req.body.skillName);
      console.log("name = "+req.body.expYears);
      con.query("insert into skilldata (skillName,expYear,eduYear,description,Accounts_fk) VALUES ('"+req.body.skillName+"','"+req.body.expYears+"','"+req.body.eduYears+"','"+req.body.description+"','"+req.body.userId+"') ") ,function(error,results){
          if (error){
            res.json({
              status:false,
              message:'there are some error with query'
            })
          }
          else{
            res.json({
              status:false,
              result:results
            });
          }
        }
      }
// module.exports.skillData = function(req,res)  {
//   console.log("name = ",req.body.skillName);
//   con.query("INSERT INTO skilldata (skillName,expYear,eduYear,description,Accounts_fk) VALUES ('"+req.body.skillName+"','"+req.body.expYears+"'.'"+req.body.eduYears+"','"+req.body.description+"','"+req.body.userId+"') ") ,function(error,results){
//     if(erro){
//       res.json({
//         status:false,
//         message:'There are some error with query'
//       })
//       }
//       else{
//         res.json({
//           status: true,
//           result:results
//         })
//     }
//   } 
// }
module.exports.addNewSkill = function (req,res) {
  console.log('Its new skill data entered'+req.body.newSkill);
  //console.log(req.body.firstName);
  con.query("INSERT INTO skillinformation (skillName) VALUES ('"+req.body.newSkill+"') ") ,function(error,results){
      if (error){
        console.log("Error running")
        res.json({
          status:false,
          message:'there are some error with query'
        })
      }
      else{
        console.log("data entered")
        res.json({
          status:false,
          result:results
        });
      }
    }
  }


    //Country information data saving here//
    module.exports.registerCountryData = function (req,res) {
      console.log('Its country data entered');
      //console.log(req.body.firstName);
      con.query("insert into countryinformation (code,name) VALUES ('"+req.body.countryCode+"' ,'"+req.body.countryName+"') ") ,function(error,results){
          if (error){
            console.log("Error running")
            res.json({
              status:false,
              message:'there are some error with query'
            })
          }
          else{
            console.log("data entered")
            res.json({
              status:false,
              result:results
            });
          }
        }
      }

  
  //SignIn account information compare here//
    module.exports.signin = function(req,res,next) {
      console.log("this is sign in runnig");
      con.query('SELECT Pk_accounts,Email,Password,accountType,Status,userInfo FROM accounts WHERE Email='+ mysql.escape(req.body.email),function(error,results){
          if (error){
            return res.status(401).json({
              status:false,
              message:'there are some error with query'
            });
          }
          else{
            bcrypt.compare(req.body.password, results[0].Password, function(err, isMatch) {
              if (err) {
                throw err
              } else if (!isMatch) {
                console.log("Password doesn't match!")
              } else {
                console.log("Password matches!")
                const token = jwt.sign({email: results[0].email, userId: results[0].Pk_accounts},
                  "secret_this_should_be_longer", 
                { expiresIn: "1h"});
                console.log("its my token "+token);
                res.status(200).json({
                  token: token,
                  expiresIn: 3600,
                  userId: results[0].Pk_accounts,
                  accountType: results[0].accountType,
                  status: results[0].Status,
                  userInfo: results[0].userInfo
                });
              }
            })
          }          
        });
        // .then(results => {
        //   if(!results){
        //     return res.status(401).json({
        //       message: "Auth failed"
        //     });
        //   }
        //   const token = jwt.sign({email: result.email, userId: result.Pk_accounts});
        // }).catch(err => {
        //   return res.status(401).json({
        //     message: "Auth failed"
        //   });
        // });
      }
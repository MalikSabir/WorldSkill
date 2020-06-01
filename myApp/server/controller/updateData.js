var mysql = require('mysql');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
console.log('Its updata data file running');
var con = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "",
  database: "worldskill"
});

module.exports.forgetPassword = function(req,res) {
  console.log("forget password is running");
  var random = Math.floor(Math.random() * 10000) + 10000;
  console.log("this is random code = "+random);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'maliksabir0345@gmail.com',
      pass: '0345S@b!r'
    }
  });
  var mailOptions = {
    from: 'maliksabir0345@gmail.com',
    to: ''+req.body.email,
    subject: '<b>Wlcome to World Skills</b>',
    text: 'Your password change code = '+random
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
    con.query("UPDATE accounts SET updateCode = "+random+" WHERE Email = "+mysql.escape(req.body.email)) ,function(error,results){
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

  module.exports.passChange = function(req, res){
  bcrypt.hash(req.body.password1, 10)
  .then(hash => {
    con.query("UPDATE accounts SET Password = "+mysql.escape(hash)+",updateCode = 'A' WHERE updateCode = "+mysql.escape(req.body.forgetCode)) ,function(error,results){
      if (error){
        res.json({
          status:false,
          message:'there are some error with query'
        })
      }
      else{
        res.json({
          status:false,
          result:results,
          message: 'Plese Check Your Email to Varify Your Account'  
        })
      }
    }
  });
  }
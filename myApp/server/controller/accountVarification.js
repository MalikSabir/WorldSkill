var mysql = require('mysql');
console.log('Malik Sabir');
var Crypter = require("cryptr"),
cryptr = new Crypter('its encription key');
var con = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "",
  database: "worldskill"
});

//This fuction is verifying the email//
module.exports.accountVarify = function (req,res){
   console.log("This is after decryption = "+cryptr.decrypt(req.query.id));
  con.query('SELECT * FROM accounts WHERE Pk_accounts = '+mysql.escape(cryptr.decrypt(req.query.id)) ,function(error,results){
        if (error){
          res.statu(200).json({
            status:false,
            message:'there are some error with query'
          })
        }
        else{
          con.query('UPDATE accounts SET Status=1 WHERE Pk_accounts = '+mysql.escape(cryptr.decrypt(req.query.id)),function (err,resul){
            if(err){
              res.status(200).json({
                status:false,
                message:'There are some error with Query'
              });
            }
            else{
              res.redirect("http://localhost:4200/emailVerified");
            }
          });
        }
      });
}


    
    
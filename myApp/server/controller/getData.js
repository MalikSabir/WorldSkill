var mysql = require('mysql');
console.log('Malik Sabir');
var con = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "",
  database: "worldskill"
});

//This fuction getting the information of the user//
module.exports.getAdminDashboard = function (req,res){
  console.log("user = "+req.body.userId);
  con.query('SELECT * FROM userinformation WHERE Accounts_fk ='+ mysql.escape(req.body.userId),function(error,results){ 
        if (error){
          res.status(200).json({
            status:false,
            message:'there are some error with query'
          })
        }
        else{
          res.status(200).json({
            status:true,
            result:results
          })
        }
      })
}
//This function getting the skill infromation from table skill information
module.exports.getSkillInformation = function (req,res){
  console.log("Skill information is getting")
  con.query('SELECT * FROM skillinformation' ,function(error,results){
        if (error){
          res.status(200).json({
            status:false,
            message:'there are some error with query'
          })
        }
        else{
          res.status(200).json({
            status:true,
            result:results
          })
        }
      })
}
//This fuction getting the country information//
module.exports.getCountryInformation = function (req,res){
  console.log("Country information is getting")
  con.query('SELECT * FROM countryinformation' ,function(error,results){
        if (error){
          res.statu(200).json({
            status:false,
            message:'there are some error with query'
          })
        }
        else{
          res.status(200).json({
            status:true,
            result:results
          })
        }
      })
}

module.exports.searchPeople = function (req,res){
  console.log("Searching of people is working"+req.body.search);
  con.query('SELECT * FROM userInformation WHERE firstName='+mysql.escape(req.body.search)+' OR lastName='+mysql.escape(req.body.search)+' OR Accounts_fk='+mysql.escape(req.body.search)+' OR country='+mysql.escape(req.body.search) ,function(error,results){
        if (error){
          res.status(200).json({
            status:false,
            message:'there are some error with query'
          })
        }
        else{
          res.status(200).json({
            status:true,
            result:results
          })
        }
      })

}

    
    
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiserviceService} from '../services/apiservice.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
signin:FormGroup;
check = 0;
passerror;
returnUrl: string;
object = <any>{};
submitted = false;
success = false;
sucessmessage ='';
  constructor(private apiservice:ApiserviceService,private router : Router, private formbuilder : FormBuilder) { 
 this.signin = this.createformgroup();
}
createformgroup(){
  return new FormGroup({
  'email':new FormControl('',[
    Validators.required,
    Validators.email,
    Validators.pattern("[^ @]*@[^ @]*"),
  ]),
  'password':new FormControl('',[Validators.required,Validators.minLength(8)]),
})}
ngOnInit() {

}
onsubmit(){
  console.log(this.signin.value.password);
  console.log(this.signin.value.email)
  this.submitted=true;

  if(this.signin.invalid){
   return;
  }
  else{
    this.apiservice.signin(this.signin.value)
    .subscribe(
      res=>{
        console.log(res.result);
        if(res.true){
          this.router.navigate(['/admin-dashboard']);
        }
        else{
          return;
        }

      },
  
      err => this.testuser(err)
    )
}
}
testuser(res){
  this.object=res;
  if(this.object.status==true){
    localStorage.setItem('token',this.object.token),
    this.sucessmessage = "Login successfully";
    setTimeout((router : Router) => {this.router.navigate(['/sellerdashboard']);} , 2500);
  }
  else if(this.object.status==false)
  {
    this.passerror="Email or Password Invalid";
    setTimeout((router : Router ) => {this.router.navigate(['/login']);} , 1000);
  }
}

}
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiserviceService} from '../services/apiservice.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
signin:FormGroup;
signup:FormGroup;
check = 0;
signInSelection: string;
passerror;
returnUrl: string;
object = <any>{};
submitted = false;
success = false;
sucessmessage ='';
  constructor(private apiservice:ApiserviceService,private router : Router, private formbuilder : FormBuilder, private authService: AuthService) { 
 this.signin = this.createformgroup();
}
createformgroup(){
  return new FormGroup({
    'email': new FormControl("",
    Validators.compose([
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
  ])),
  'password':new FormControl('', [
    Validators.minLength(8),
    Validators.required])
});
}

  ngOnInit() {
  }
  signInVlue(SignIn){
    this.signInSelection=SignIn;
  }
  signUpVlue(SignUp){
    this.signInSelection=SignUp;
  }
  onsubmit(){
    this.submitted=true;
    if(this.signin.invalid){
     return;
    }
    else if(this.signInSelection==="SignIn"){
      this.authService.logIn(this.signin.value.email, this.signin.value.password); // this is sign in function calling in authservice
    }
    else if(this.signInSelection==="SignUp"){
       this.authService.createUser(this.signin.value.email, this.signin.value.password);  //this sign up data to backend API
     }
  }
  forgetPassword(){
    this.router.navigate(['/forget-password']);
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

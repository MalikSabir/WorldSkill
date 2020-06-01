import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiserviceService} from '../services/apiservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  sucessmessage = '';
  object =<any>{};
  signup:FormGroup;
  submitted = false;
  success = false;
  constructor(private formbuilder:FormBuilder,private apiservices :ApiserviceService,private router:Router) {
    this.signup = this.createformgroup();
   }
   createformgroup(){
    return new FormGroup({
     
      'email' :new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern("[^ @]*@[^ @]*"),
      ]),
      'password': new FormControl('',[Validators.required,Validators.minLength(8)]),
    });
}

onsubmit(){
 console.log(this.signup.value);
 this.submitted=true;
 if(this.signup.invalid){
   return;
 }
 this.apiservices.signup(this.signup.value)  //this sign up data to backend API
 .subscribe(
   //res =>console.log(res),
   //err => console.log(err)
 )
}
  ngOnInit() {
  }

}

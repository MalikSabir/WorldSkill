import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiserviceService} from '../services/apiservice.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm=null;
  passMatch=null;
  forget:FormGroup;
  passChange:FormGroup;
  check = 0;
  emailError;
  returnUrl: string;
  object = <any>{};
  submitted = false;
  success = false;
  sucessmessage ='';
  constructor(private apiservice:ApiserviceService,private router : Router, private formbuilder : FormBuilder ) { 
    this.forget = this.createformgroup();
    this.passChange = this.createformgroups();
  }
  createformgroup(){
    console.log("validators running")
    return new FormGroup({
      'email' :new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern("[^ @]*@[^ @]*"),
      ]),
  })}
  createformgroups(){
    console.log("validators running")
    return new FormGroup({
      'forgetCode' :new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*"),
      ]),
      'password1': new FormControl('', [
        Validators.required,
      ]),
      'password2': new FormControl('', [
        Validators.required,
      ])
  })}
  ngOnInit() {
    this.forgetForm=1;
  }
  onsubmit(){
    console.log(this.forget.value.email)
    if(this.forget.invalid){
      this.emailError="Email Format Error"
     return;
    }
    else{
      console.log("data is submitting")
      this.forgetForm=2;
      this.emailError=null;
      this.apiservice.forgetPassword(this.forget.value)
      .subscribe( res => {
        console.log(res)
      }
      );
      this.forget.reset();
  }
  }
  forgetPass(){
    if(this.passChange.value.password1 !== this.passChange.value.password2){
      return;
    }else{
      console.log(this.passChange.value);
      this.apiservice.passChange(this.passChange.value)
      .subscribe( res => {
        console.log(res);
      });
    }
  }

}

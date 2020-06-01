import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ApiserviceService} from '../services/apiservice.service'; 
import { countryes } from '../admin-dashboard/dashboard.model';
import { mimeType } from './mime-type.validator';
import { AuthService } from '../dashboard/auth.service';
import { StickyDirection } from '@angular/cdk/table';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  public countryes: countryes[]=[];
  registration: FormGroup;
  object = <any>{};
  submitted = false;
  userId=null;
  success = false;
  imagePreview: string="assets/profile.png";
  sucessmessage ='';
  constructor(private apiservice:ApiserviceService, private router : Router, private authService: AuthService) { 
    this.registration = this.createformgroup();
  }
  createformgroup(){  
    return new FormGroup({
    'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
    'firstName': new FormControl(null, {validators: [Validators.required,Validators.minLength(3)]}),
    'lastName': new FormControl(null, {validators: [Validators.required,Validators.minLength(3)]}),
    'code': new FormControl(null, {validators: [Validators.required]}),
    'number': new FormControl(null, {validators: [Validators.required]}),
    'dob': new FormControl(null, {validators: [Validators.required]}),
    'addressOne': new FormControl(null, {validators: [Validators.required]}),
    'gender': new FormControl(null, {validators: [Validators.required]}),
    'city': new FormControl(null, {validators: [Validators.required]}),
    'country': new FormControl(null, {validators: [Validators.required]})
    });
}
clearData(){
   this.imagePreview= "assets/profile.png";
}

  ngOnInit(){
    this.apiservice.getCountryInformation()
    .subscribe((postData) => {
      this.countryes = postData.result
    });
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.registration.patchValue({image: file});
    this.registration.get('image').updateValueAndValidity();
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    }
    reader.readAsDataURL(file);

  }
  rgisterForm(){
    this.userId=this.authService.getUserId();
    if(this.registration.invalid){
      return;
    }
    this.apiservice.registration(
      this.registration.value.image, 
      this.registration.value.firstName, 
      this.registration.value.lastName, 
      this.registration.value.code,
      this.registration.value.number,
      this.registration.value.dob,
      this.registration.value.addressOne,
      this.registration.value.gender,
      this.registration.value.city,
      this.registration.value.country,
      this.userId
)  //this sign up data to backend API
    .subscribe(
      res =>console.log(res),
      err => console.log(err)
    )
    alert("Data Register Successfully");
    this.registration.reset();
    this.router.navigate(['/skills-form']);
   }
  }


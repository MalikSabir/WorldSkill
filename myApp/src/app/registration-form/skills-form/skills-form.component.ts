import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../../services/apiservice.service';
import { skillInformation } from '../../admin-dashboard/dashboard.model';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/dashboard/auth.service';
import { range } from 'rxjs';


@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent implements OnInit {
  public skillInformation: skillInformation[]=[];
  skillForm: FormGroup;
  skillRange=null;
  userId=null;
  constructor(private apiservice:ApiserviceService, private router: Router, private authService: AuthService) { 
    this.skillForm = this.createformgroup();
  }
  createformgroup(){
    return new FormGroup({
    'skillName': new FormControl(null, {validators: [Validators.required]}),
    'expYears': new FormControl(null, {validators: [Validators.required]}),
    'eduYears': new FormControl(null, {validators: [Validators.required]}),
    'description': new FormControl(null, {validators: [Validators.required]})
    });
  }

  ngOnInit() {
    this.apiservice.getSkillInformation()
    .subscribe((postData)=>{
      this.skillInformation=postData.result;
    });
  }
  rgisterSkill(){
    this.userId=this.authService.getUserId();
    if(this.skillForm.invalid){
      return;
    }
    this.apiservice.skillForm(
      this.skillForm.value.skillName, 
      this.skillForm.value.expYears, 
      this.skillForm.value.eduYears, 
      this.skillForm.value.description,
      this.userId
      )
    .subscribe(
      res =>console.log(res),
      err => console.log(err)
    )
    this.router.navigate(['/admin-dashboard']);
    alert("Skill Data Register Successfully");
    this.skillForm.reset();
   }

}

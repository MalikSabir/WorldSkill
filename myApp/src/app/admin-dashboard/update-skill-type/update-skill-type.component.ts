import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ApiserviceService} from '../../services/apiservice.service';
import{ skillInformation } from '../dashboard.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/dashboard/auth.service';


@Component({
  selector: 'app-update-skill-type',
  templateUrl: './update-skill-type.component.html',
  styleUrls: ['./update-skill-type.component.scss']
})
export class UpdateSkillTypeComponent {
  public skillInformation: skillInformation[]=[];
  newSkillForm: FormGroup;
  constructor(private apiservice:ApiserviceService, private router: Router, private authService: AuthService){
    this.newSkillForm=this.createformgroup();
  }
  createformgroup(){
    return new FormGroup({
    'newSkill': new FormControl(null, {validators: [Validators.required]})
    });
  }
  addNewSkill(){
    console.log("skill is comming"+this.newSkillForm.value.newSkill);
    if(this.newSkillForm.invalid){
      return;
    }
    this.apiservice.newSkillForm(
      this.newSkillForm.value
      )
    .subscribe(
      res =>console.log(res),
      err => console.log(err)
    )
    alert("New Skill Data Inserted Successfully");
    this.newSkillForm.reset();
  }
  ngOnInit() {
    this.apiservice.getSkillInformation()
    .subscribe((postData)=>{
      this.skillInformation=postData.result;
    });
  }

}
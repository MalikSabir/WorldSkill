import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../dashboard/auth.service';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ApiserviceService } from '../../services/apiservice.service';
import {Router} from '@angular/router';
import { Searched } from '../dashboard.model';

@Component({
  selector: 'app-admin-search-people',
  templateUrl: './admin-search-people.component.html',
  styleUrls: ['./admin-search-people.component.scss']
})
export class AdminSearchPeopleComponent implements OnInit {
  private userId;
  public Searched: Searched[]=[];
  searchValue=null;
  searchPeople:FormGroup;
  constructor(private authService: AuthService, private apiservice:ApiserviceService, private router : Router, private formbuilder : FormBuilder) { 
    this.searchPeople=this.createformgroup();
  }
  createformgroup(){
    console.log("validators running")
    return new FormGroup({
      'search' :new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*"),
      ]),
  })}
  
  ngOnInit() {
    this.userId = this.authService.getUserId();
    console.log(this.userId);
  }
  onSearchPeople(){
    this.apiservice.searchPeople(this.searchPeople.value)
    .subscribe((postData) =>{
      this.Searched = postData.result;
      console.log(postData.result);
    });

  }

}

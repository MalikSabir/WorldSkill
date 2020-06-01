// Midel Layer
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'
import { Post } from '../admin-dashboard/dashboard.model';
import { countryes } from '../admin-dashboard/dashboard.model';
import { userId } from '../dashboard/auth-data.model';
import { skillData } from '../dashboard/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
constructor(private http :HttpClient, private router : Router){}
  private _dashbordSignUp = "http://localhost:3000/api/dashboardSignUp";
  private _dashbordSignIn = "http://localhost:3000/api/dashboardSignIn";
  private _forgetPassword = "http://localhost:3000/api/forgetPassword";
  private _passwordChange = "http://localhost:3000/api/passwordChange";
  private _registration = "http://localhost:3000/api/registration-form";
  private _skillForm = "http://localhost:3000/api/skill-form";
  private _skillData = "http://localhost:3000/api/skillData";
  private _adminDashboard = "http://localhost:3000/api/admin-dashboard";
  private _adminHeader = "http://localhost:3000/api/admin-dashboard/admin-header";
  private _userDashboard = "http://localhost:3000/api/user-dashboard";
  private _businessDashboard = "http://localhost:3000/api/business-dashboard";
  private _searchPeople= "http://localhost:3000/api/admin-dashboard/admin-search-people";
  private _userHeader = "http://localhost:3000/api/user-dashboard/user-header";
  private _businessHeader = "http://localhost:3000/api/business-dashboard/business-header";
  private _try= "http://localhost:3000/api/tries";
  private _updateSkill= "http://localhost:3000/api/admin-dashboard/update-skill-type";
  private _newSkill= "http://localhost:3000/api/admin-dashboard/addNewSkill";
//get apis
private _recommend = "http://localhost:3000/api/recommend";
//////////////////////////////// Post Data Functions /////////////////////////////////
  signup(user){
    return this.http.post<any>(this._dashbordSignUp,user)  } ///go to back side
  signin(user){
    return this.http.post<any>(this._dashbordSignIn,user)  }
  forgetPassword(user){
    return this.http.post<{status: string}>(this._forgetPassword,user)  }
  passChange(user){
    return this.http.post<any>(this._passwordChange,user) }
  adminDashboard(user){
    return this.http.post<any>(this._adminDashboard,user) }
  adminHeader(user){
    return this.http.post<any>(this._adminHeader,user) }
  userDashboard(user){
    return this.http.post<any>(this._userDashboard,user) }
  businessDashboard(user){
    return this.http.post<any>(this._businessDashboard,user) }
  userHeader(user){
    return this.http.post<any>(this._userHeader,user) }
  businessHeader(user){
    return this.http.post<any>(this._businessHeader,user) }
  searchPeople(user){
    return this.http.post<any>(this._searchPeople,user);
  }
  newSkillForm(user){
    return this.http.post<any>(this._newSkill,user);
  }

    skillForm(skillName: string, expYears: string, eduYears: string, description: string, userId: string){
      // const skillData: skillData = {skillName: skillName, expYears: expYears, eduYears: eduYears, description: description, userId: userId};
      return this.http.post<any>(this._skillData, {skillName, expYears, eduYears, description, userId});
    }
    registration(image: File, firstName: string, lastName: string, code: string, number: string, dob: string, addressOne: string, gender: string, city: string, country: string, userId: string){
    console.log("api service method")
    const registerData = new FormData;
    registerData.append('image', image, firstName);
    registerData.append('firstName', firstName);
    registerData.append('lastName', lastName);
    registerData.append('code', code);
    registerData.append('number', number);
    registerData.append('dob', dob);
    registerData.append('addressOne', addressOne);
    registerData.append('gender', gender);
    registerData.append('city', city);
    registerData.append('country', country);
    registerData.append('userId', userId);
    return this.http.post<any>(this._registration,registerData) }

  registerCountryData(user){
    return this.http.post<any>(this._updateSkill,user) }
  try(user){
    console.log("api service method")
    //console.log('Apiservices ... '+user);
    return this.http.post<any>(this._try,user)
  }
    // get apis
    recommend(){
      return this.http.get<any>(this._recommend)}
  ////////////////////////////////////// Get Data Functions //////////////////////////////////
  getSkillInformation(){
    return this.http.get<any>(this._skillForm)  }
  getCountryInformation(){
    return this.http.get<any>(this._registration) }
  getAdminDashboard(user:string){
    const userId: userId = {userId: user};
    return this.http.post<any>(this._adminDashboard,userId)}  }
  
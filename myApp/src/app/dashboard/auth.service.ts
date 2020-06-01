// In this file have user token base authentication services methods.
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
@Injectable({ providedIn: "root"})
export class AuthService{
    private isAuthentecated = false;
    private token: string;
    private tokenTimer : any;
    private accountType: number;
    private userInfo: number;
    private userId: string;
    private status: number;
    private authStatusListener = new Subject<boolean>();
    constructor(private http: HttpClient, private router: Router){}
    getToken(){
        return this.token;
    }
    getIsAuth() {
        return this.isAuthentecated;
    }
    getUserId(){
        // return this.userId;
        return localStorage.getItem("userId");
    }
    getaccountType(){
        return this.accountType;
    }
    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }
    createUser(email: string, password: string) {
        const authData: AuthData = {email: email, password: password};
        this.http.post("http://localhost:3000/api/dashboardSignUp",authData)
        .subscribe(response => {
            console.log(response);
        });
    }
    logIn(email: string, password: string) {
        const authData: AuthData = {email: email, password: password};
        this.http.post<{token: string, expiresIn: number, userId: string, accountType: number, status: number, userInfo: number}>("http://localhost:3000/api/dashboardSignIn",authData)
        .subscribe(response => {
           const token = response.token;
           this.token = token;
           this.authStatusListener.next(true);
          if(token){
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthentecated = true;
            this.userId = response.userId;
            this.status = response.status;
            this.userInfo = response.userInfo;
            console.log("this is user info id = "+this.userInfo);
            this.accountType = response.accountType;
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(token, expirationDate, this.userId, this.accountType);
            console.log("account type = "+this.accountType);
            if(this.status === 1 && this.userInfo === 1){
                setTimeout((router : Router) => {this.router.navigate(['/admin-dashboard']);} , 1500);
            }
            else if(this.userInfo === 0){
                setTimeout((router : Router) => {this.router.navigate(['/registration-form']);} , 1500);
            }
          }
        });
    }
    autoAuthUser() {
        const authInformation = this.getAuthData();
        if(!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationData.getTime() - now.getTime();
        if(expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthentecated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logOut() {
        this.token = null;
        this.isAuthentecated = false;
        this.authStatusListener.next(false);
        this.userId = null;
        this.accountType = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/dashboard']);
    }    

    private setAuthTimer(duration: number) {
        console.log("Setting Timer "+duration)
        this.tokenTimer = setTimeout(() => {
            this.logOut();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationData: Date, userId: string, accountType: number) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationData.toISOString());
        localStorage.setItem("userId", userId);
        localStorage.setItem("accountType",accountType.toString());
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
        localStorage.removeItem("accountType");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        if(!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationData: new Date(expirationDate),
            userId: userId
        }
    }

}
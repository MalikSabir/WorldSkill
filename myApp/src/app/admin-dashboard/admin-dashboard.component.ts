import { Component, OnInit, Input } from '@angular/core';
import {ApiserviceService} from '../services/apiservice.service';
import { Post } from './dashboard.model';
import { AuthService } from '../dashboard/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{
  check: number;
  loadedFeature= null;
  userId=null;
  public post: Post[]=[];
  onNavigate(feature: string){
  this.loadedFeature = feature;
  }
  country: string;
  constructor(public apiservice: ApiserviceService, private authService: AuthService){
    this.check=this.authService.getaccountType();
  }
  
  ngOnInit() {
    if(this.authService.getaccountType()>0){
      this.loadedFeature='view-profile';
    }
    else{
      this.loadedFeature='admin-home';
    }
    this.userId=this.authService.getUserId();
    console.log("Ng On init is running"+this.userId);
    this.apiservice.getAdminDashboard(this.userId)
    .subscribe((postData) => {
      this.country = "assets/countryFlags/"+postData.result[0].country+".png"
      this.post = postData.result
      console.log(postData.result);
    });
  }

}

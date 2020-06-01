import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../dashboard/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  private userId;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    const userId=this.authService.getUserId();
    console.log("this.userId = "+userId);
  }

}

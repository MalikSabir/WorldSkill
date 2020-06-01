import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../dashboard/auth.service';
@Component({
  selector: 'app-admin-view-inbox',
  templateUrl: './admin-view-inbox.component.html',
  styleUrls: ['./admin-view-inbox.component.scss']
})
export class AdminViewInboxComponent implements OnInit {
  private userId;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userId=this.authService.getUserId();
    console.log(this.userId)
  }
}

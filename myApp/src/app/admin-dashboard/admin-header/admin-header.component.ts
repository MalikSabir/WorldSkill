import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../dashboard/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  accountType=null;
  @Output() featureSelected = new EventEmitter<string>();
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.accountType=this.authService.getaccountType();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
  onLogOut(){
    this.authService.logOut();
  }
}

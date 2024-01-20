import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showButton: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isShowButton();
  }

  isShowButton() {
    if(this.authService.isUserLoggedIn()) {
      this.showButton = true;
    };
  }

  logout() {
    //this.authService.logout();
  }
}

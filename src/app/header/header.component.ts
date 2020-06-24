import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isUserAuthenticated = false;

  constructor(private dataStorrageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isUserAuthenticated = !user ? false : true;
      // same can be done like this:
      // this.isUserAuthenticated = !!user;
    });
  }

  onSaveClick() {
    this.dataStorrageService.storeRecipes();
  }

  onFetchRecipeClick() {
    this.dataStorrageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import {SharedAuthService} from "../../shared/services/shared-auth.service";
import {FormControl} from "@angular/forms";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private authService: SharedAuthService) { }

  userInfo = this.authService.getUserInfo()

  categories = new FormControl();
  categoriesList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  ngOnInit(): void {


  }



}

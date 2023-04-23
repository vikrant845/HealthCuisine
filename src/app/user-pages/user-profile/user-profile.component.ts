import { Component, OnInit, ViewChild } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Chart, registerables } from 'chart.js';
import { LoginResponse } from 'src/models/loginResponseModel';
import { AuthService } from 'src/app/auth.service';
import { UserModel } from 'src/models/userModel';
Chart.register(...registerables);

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  value: number = 50;
  public pieChart: any;
  user!: UserModel;
  error: string = '';
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('jwt')) this.error = 'Token expired or is invalid';
    if (!localStorage.getItem('user')) this.error = 'You are not logged in';
    this.pieChart = new Chart('pie_chart', {
      type: 'pie',
      data: {
        labels: ['Proteins', 'Fats', 'Carbohydrates'],
        datasets: [
          {
            data: [180, 120, 200],
            backgroundColor: [
              '#b93473',
              '#fab124',
              '#6ff4f4'
            ],
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true,
        aspectRatio: 1.5,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
    // this.unwrapUser();
    this.user = this.authService.getUser();
  }

}
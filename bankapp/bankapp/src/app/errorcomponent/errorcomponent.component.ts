import { Component, OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errorcomponent',
  templateUrl: './errorcomponent.component.html',
  styleUrls: ['./errorcomponent.component.css']
})
export class ErrorcomponentComponent implements OnInit {
name:any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.name=localStorage.getItem("name");
    if(this.name==null){
      this.router.navigate(['/login'])
    }
  }

  login(){
    this.router.navigate(['/login']);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}

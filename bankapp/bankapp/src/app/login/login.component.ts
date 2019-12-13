import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('openModal',undefined) openModal:ElementRef;
name:any
password:any
_url:any
  constructor(private router:Router) { }

  ngOnInit() {
   document.getElementById("spinner").hidden=true; 
  }
  login(){
    document.getElementById("spinner").hidden=false; 
    console.log("happy")
    this.name=((<HTMLInputElement>document.getElementById("name")).value);
    this.password=((<HTMLInputElement>document.getElementById("password")).value);
    console.log(this.name+this.password);
    localStorage.setItem("name",this.name);
    this._url= `http://localhost:8080/users/login`

    console.log(this.name+this.name);
    fetch(this._url,{
      method : "POST",
      headers: {
          "content-type": "application/json",
          'Accept': 'application/json'
         },
      body : JSON.stringify({
          customername:this.name,
          customerpassword:this.password
      })
  })
  .then(res=>res.json())
  .then(data=>{

  console.log("received")
  console.log(data.user)
  if(data.user.length==0){
    document.getElementById("spinner").hidden=true; 
    this.openModal.nativeElement.click();
    console.log("modal")
  }
  else{
    document.getElementById("spinner").hidden=true; 
    this.router.navigate(['banking']);
  }
  })
}
return(){
  this.router.navigate(['login']);
}
logout(){
  localStorage.clear();
  this.router.navigate(['/login'])
}
}

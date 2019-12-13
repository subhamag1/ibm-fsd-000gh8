import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
name:any
  constructor(private router:Router) { }

  ngOnInit() {
    ((<HTMLInputElement>document.getElementById("a")).style.color="black");
    this.name=localStorage.getItem("name");
    this.name=localStorage.getItem("name");
    if(this.name==null){
      this.router.navigate(['/login'])
    }
    let url="http://localhost:8080/users/Home/"+this.name;
    console.log("hello")
  fetch(url,{
    method : "GET",
    headers: {
        "content-type": "application/json",
        'Accept': 'application/json'
       }
})
.then(res=>res.json())
.then(data=>{
  console.log(data.users[0].customername);
  ((<HTMLInputElement>document.getElementById("name")).innerHTML=data.users[0].customername);
  ((<HTMLInputElement>document.getElementById("balance")).innerHTML=data.users[0].customerbalance);
})
  }
logout(){
  localStorage.clear();
  this.router.navigate(['/login'])
}

}

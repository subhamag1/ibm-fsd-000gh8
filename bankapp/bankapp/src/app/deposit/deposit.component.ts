import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  @ViewChild('openModal',undefined) openModal:ElementRef;
 name:any
 amount:any

  constructor(private router:Router) { }

  ngOnInit() {
    ((<HTMLInputElement>document.getElementById("a")).style.color="black");
    this.name=localStorage.getItem("name");
    if(this.name==null){
      this.router.navigate(['/login'])
    }
    
  }
 deposit(){

  this.name=localStorage.getItem("name");
  this.amount=((<HTMLInputElement>document.getElementById("amount")).value);
  let url= 'http://localhost:8080/users/deposit/'+this.amount+'/'+this.name;
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
  console.log(data);
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

((<HTMLInputElement>document.getElementById("curbal")).innerHTML=data.users[0].customerbalance);
})
  this.openModal.nativeElement.click();
 
})
 }

 logout(){
  localStorage.clear();
  this.router.navigate(['/login'])
}
}

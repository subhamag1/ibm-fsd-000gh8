import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import {Router} from '@angular/router';
@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {
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

  withdraw(){
    
    this.name=localStorage.getItem("name");
    this.amount=((<HTMLInputElement>document.getElementById("amount")).value);
    let url= 'http://localhost:8080/users/withdrawal/'+this.amount+'/'+this.name;
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

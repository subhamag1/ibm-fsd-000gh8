import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
 name:any
 name2:any
 amount:any
  constructor(private router:Router) { }

  ngOnInit() {
    ((<HTMLInputElement>document.getElementById("a")).style.color="black");
    this.name=localStorage.getItem("name");
    if(this.name==null){
      this.router.navigate(['/login'])
    }
  }

  transfer(){
    
    this.name=localStorage.getItem("name");
    
    this.name2=((<HTMLInputElement>document.getElementById("rname")).value);
    this.amount=((<HTMLInputElement>document.getElementById("amount")).value);
    let url= 'http://localhost:8080/users/transfer/'+this.amount+'/'+this.name+'/'+this.name2;
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
    alert("Amount Transer Successfull!!")
  })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-passbook',
  templateUrl: './passbook.component.html',
  styleUrls: ['./passbook.component.css']
})
export class PassbookComponent implements OnInit {
 name:any
 mydata:any
 filter:any
  constructor(private router:Router) { }

  ngOnInit() {
    ((<HTMLInputElement>document.getElementById("a")).style.color="black");
    this.name=localStorage.getItem("name");
    this.name=localStorage.getItem("name");
    if(this.name==null){
      this.router.navigate(['/login'])
    }
    let url= 'http://localhost:8080/users/passbook/'+this.name;
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
    console.log("details");
    this.mydata=data.users;
    for (let index = 0; index < this.mydata.length; index++) {
      var x =(this.mydata[index]._datetime.substring(5,7));
      var today = new Date();
      var month=(today.getMonth()+1)
      console.log("current month is"+month);
      if(month-x==0){
        this.filter[index]=this.mydata[index]
      }
    }
  })
 
  }
 
print(){
    window.print();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}

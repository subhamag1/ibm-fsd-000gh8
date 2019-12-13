import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup,FormControl, FormBuilder, Validators, NgForm, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  signupform:FormGroup;
  
  fname:String
  lname:String
  email:String
  password:String
  confirmPass:String
  accountnumber: number
  accounttype:String
  
  gender:String
  _url:any;
  error:any;
  constructor(private router:Router, private formbuilder:FormBuilder) { 
    this.signupform=formbuilder.group({
      fname:['',[Validators.required,Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
      lname:['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPass:['',Validators.required],
      accountnumber:['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      accounttype:['',Validators.required],
  
      gender: ['',Validators.required]
  },
  {validator: this.MustMatch('password', 'confirmPass')});
  }
  ngOnInit() {
  }
  postData(signupform:any){
    
    this._url =`http://localhost:8080/users/signup`

    this.fname=signupform.controls.fname.value;
    this.lname=signupform.controls.lname.value;
    this.email=signupform.controls. email.value;
    this.confirmPass=signupform.controls.confirmPass.value;
    this.password=signupform.controls.password.value;
    this.gender=signupform.controls.gender.value;
    this.accounttype=signupform.controls.accounttype.value;
    this.accountnumber=signupform.controls.accountnumber.value;

    fetch(this._url,{
      method : "POST",
      headers: {
          "content-type": "application/json",
          'Accept': 'application/json'
         },
         body : JSON.stringify({
          customername:this.fname+" "+this.lname,
          customeremail:this.email,
          customerpassword:this.password,
          customeraccountnumber: this.accountnumber,
          customergender:this.gender,
          customeraccounttype:this.accounttype,
          customeraccountbalance:4000
      })
    })
       .then(res=>res.json())
       .then(data=>{
       console.log("received")
       console.log(data);

       if(data.message==1){

        this.error="user already exists"
        this.router.navigate(['register']);
        } else{
        alert("successfully registered !")
         this.router.navigate(['']);
        }
       })
      }

    
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
    
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
    
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
      }
      
      
        

}


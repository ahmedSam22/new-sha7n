import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { GlobalserviceService } from '../globalservice/globalservice.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../shared/services/global.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logIn!:FormGroup ;
  constructor(private router:Router , private route:ActivatedRoute,private _location: Location , private service: GlobalService ) { }

  ngOnInit(): void {
    this.logIn = new FormGroup({
    'email' : new FormControl(null ,Validators.required ),
    'password': new FormControl(null , Validators.required)
    });
  }

  back(){
    this._location.back();
  }

  onSubmit() {
    console.log(this.logIn.value)
    this.service.logIn({...this.logIn.value}).subscribe(res => {
      console.log("log response") ;
      console.log(res) ;
        // Swal.fire(
        //     res.message
        //         )
       console.log("success") ;
       setTimeout(() =>{
        this.router.navigate(['admin/adminHome']);
         },2000);

       },
       error => {
        // console.log(error);
         console.log(error.error.errors[0]);

        Swal.fire(
          error.error.errors[0]
            )
       }
       );

  }
}

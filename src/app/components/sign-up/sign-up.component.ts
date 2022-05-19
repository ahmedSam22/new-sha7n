import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { GlobalserviceService } from '../globalservice/globalservice.service';
import Swal from 'sweetalert2';
import { GlobalService } from '../shared/services/global.service';
@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUp!:FormGroup;
  constructor( private router:Router , private route:ActivatedRoute,private _location: Location, private service:GlobalService ) {

  }

  ngOnInit(): void {
    this.signUp = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'confirm_password': new FormControl(null, Validators.required),
     });
  }

  back(){
    this.router.navigate(['/root/home']);
  }

  onSubmit(){
    console.log({...this.signUp.value});
     this.service.singUp({...this.signUp.value}).subscribe( res => {
     console.log(res) ;
       Swal.fire(
          'نجاح',
          'تم التسجيل بنجاح',
          'success'
      )
      console.log("success") ;
      });
      this.router.navigate(['/root/verify-code']);
  }
}

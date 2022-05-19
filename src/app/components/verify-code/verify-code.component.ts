import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GlobalserviceService } from '../globalservice/globalservice.service';
import { GlobalService } from '../shared/services/global.service';
@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {
  verify!:FormGroup ;
  concat='' ;
  verification_code = {};
  constructor( private service:GlobalService) { }

  ngOnInit(): void {
    this.verify=new FormGroup({
      'verify_input1':new FormControl(null , Validators.required) ,
      'verify_input2':new FormControl(null , Validators.required) ,
      'verify_input3':new FormControl(null , Validators.required) ,
      'verify_input4':new FormControl(null , Validators.required) ,
    });
  }

   onSubmit(){
    this.concat=this.verify.value.verify_input1+this.verify.value.verify_input2+this.verify.value.verify_input3+this.verify.value.verify_input4 ;
    this.verification_code ={'code':this.concat}
    console.log(this.verification_code);
    this.service.verificationCode({...this.verification_code}).subscribe( res => {
      console.log(res) ;
        Swal.fire(
           'نجاح',
           'تم إدخال كود التحقق بنجاح',
           'success'
       )
       console.log("success") ;
       });
  }
}

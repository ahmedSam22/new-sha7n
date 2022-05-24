import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id_code!:any;
  constructor( private service:GlobalService, private activatedRoute:ActivatedRoute ,private router:Router ) { }

  ngOnInit(): void {
    this.verify=new FormGroup({
      'verify_input1':new FormControl(null , Validators.required) ,
      'verify_input2':new FormControl(null , Validators.required) ,
      'verify_input3':new FormControl(null , Validators.required) ,
      'verify_input4':new FormControl(null , Validators.required) ,
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.id_code = params.get('id');
    console.log("ccccccccccccccccccccc",this.id_code)
   
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
       if(this.id_code==0){
        setTimeout(() =>{
          this.router.navigate(['admin/shipping']);
           },2000);
      
         }
       else {
        setTimeout(() =>{
          this.router.navigate(['admin/adminHome']);
           },2000);

       }
       });
  }
}

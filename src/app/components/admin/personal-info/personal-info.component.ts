import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GlobalserviceService } from '../../globalservice/globalservice.service';
import { GlobalService } from '../../shared/services/global.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  personalInfo!:FormGroup ;
  name='';
  phone='';
  email='' ;
  edit:boolean=true;
  editpassword:boolean=true;
  constructor( private formbuilder:FormBuilder , private service:GlobalService) {}
  ngOnInit(): void {
    this.edit=true;
    this.editpassword=true;
    this.service.personalInfo().pipe(map((res:any)=>res['data'])).subscribe(res=>{
      console.log(res)

      this.personalInfo = this.formbuilder.group({
        name:[{value:res.name,disabled:this.edit},Validators.required],
        phone:[{value:res.phone,disabled:this.edit},Validators.required],
        email:[{value:res.email,disabled:this.edit},Validators.required],
        password:[{value:'***********',disabled:this.editpassword},Validators.required]
      })


    });
  }

  editPersonalInfo(){
    this.edit=false;
    this.editpassword=true;
  }
  editPassword(){
    this.editpassword=false;
  }
  onSubmit() {
    let form ={
      ...this.personalInfo.value
    }
    console.log(form);
    this.service.updatePersonalInfo(form).subscribe(res=>{
      console.log(res);

    })

  }
}

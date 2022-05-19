import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/components/shared/services/global.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  form!:FormGroup
  cards:any
  constructor(private formbilder:FormBuilder,private service : GlobalService) { }

  ngOnInit(): void {
    this.getCardBrand()
    this.form=this.formbilder.group({
      card_holder:['',Validators.required],
      card_number:['',Validators.required],
      cvv:['',Validators.required],
      expiry_date:['',Validators.required],
      card_brand_id:['',Validators.required],



    })
  }
  getCardBrand(){
    this.service.getCardBrands().subscribe((res:any)=>{
        console.log(res.data)

      this.cards = res.data})
  }
  submit(){
    let exp_date = new Date(this.form.value['expiry_date'])
    let y =  exp_date.getFullYear()
    let mm =''
    let m =exp_date.getMonth()
    if(m < 10){
       mm = '0'+m
    }
    else{
       mm = ''+m
    }


  }
}

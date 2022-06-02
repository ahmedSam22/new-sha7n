import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { getTsBuildInfoEmitOutputFilePath } from 'typescript';
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

  resu:object={}
  result:object={}
  showAvatar=false;
  base64Image:any ;
  showImg=true ;
  imgSrc:any;
  type:any
  showButtons=true;
  firstRow=true;
  secondtRow=false;
  hideImg:boolean=false
  imgpath:any;
  file:File[]=[]
  @ViewChild("image") image: any;
  showConfirm:boolean = false;
  showConfirm2:boolean = false;
  showConfirm3:boolean = false;

  showPasswordError:boolean=false;
  showNewPasswordError:boolean=false;
  showConfirmPasswordError:boolean=false;
  submit:boolean=false;
  constructor( private formbuilder:FormBuilder , private service:GlobalService) {}
 
  ngOnInit(): void {
     
    this.edit=true;
    this.editpassword=true;
    //  confirm_password:[{value:'*********',disabled:this.editpassword},Validators.required],
   this.getInfo();
 // console.log("nnnnnnnnnnnnnnnn",this.result)
    this.personalInfo = this.formbuilder.group({
      name:['',Validators.required],
      phone:['',Validators.required],
      email:['',Validators.required],
      old_password:['',Validators.required],
      password:['',Validators.required],
      confirm_password:['',Validators.required],
    })
    this.showImg=true ;
    this.showAvatar=false;


    this.firstRow=true;
    this.secondtRow=false;
 
  }
  getInfo(){
    this.service.personalInfo().subscribe((res:any)=>{
       console.log(res.data)
         this.personalInfo = this.formbuilder.group({
          name:[res.data.name,Validators.required],
          phone:[res.data.phone,Validators.required],
          email:[res.data.email,Validators.required],
          old_password:['',Validators.required],
          password:['',Validators.required],
          confirm_password:['',Validators.required],
        })
        this.imgpath=res.data.imagePath
       // console.log("gfesfawdawrfe",this.imgpath)
      });
      // console.log("gfesfawdawrfe",this.imgpath)
 }
  
  base64(event:any) {
       this.file= event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.file[0]);
    reader.onload = () => {
       
        this.base64Image = reader.result;
     console.log("saasdswqadqwedwq",this.file[0])
    };
    this.showImg=false ;
    this.showAvatar=true;
}
   
  // editPersonalInfo(){
  //   this.edit=false;
  //   this.editpassword=true;
  // }
  // editPassword(){
  //   this.editpassword=false;
//  }
  setType(num:any){
   
     this.showButtons=false;
     this.type=num ;
     if(this.type==0){
      this.firstRow=true;
      this.secondtRow=false;
      this.edit=false;
      this.hideImg=true;
       }
     else if(this.type==1) {
      this.firstRow=false;
      this.secondtRow=true;
      this.editpassword=false;
      this.hideImg=false
     }
    else {
      this.firstRow=true;
      this.secondtRow=false;
      this.edit=true;
    }
    console.log("Current Type" , this.type)
  }
  onSubmit() {
    // this.showButtons=true;
    //  this.firstRow=true;
    //  this.secondtRow=false;
     
    if(this.type==0){
      let infoform ={
       name:this.personalInfo.value.name ,
       phone:this.personalInfo.value.phone ,
       email:this.personalInfo.value.email  ,
       image:this.file[0]
      }
 
    this.service.updatePersonalInfo(infoform).subscribe((res:any)=>{
      location.reload();
     console.log("infoooooo" ,res);
     Swal.fire(
      "success" ,
      res.message
     )
      this.edit=true;
      this.showButtons=true;
      this.firstRow=true;
      this.secondtRow=false;
     },
     (e:any)=>{
      Swal.fire(
        "Fail ", 
        e.error.message
      )
      this.showButtons=true;
      this.firstRow=true;
      this.secondtRow=false;
     })
     
    }
    else{
      let passwordform={
        old_password:this.personalInfo.value.old_password,
        password: this.personalInfo.value.password , 
        confirm_password:this.personalInfo.value.confirm_password  
      }
    
      this.service. updatePersonalpassword(passwordform).subscribe((res:any)=>{
        console.log("res pppppp",res)
           Swal.fire(
            "success" ,
            res.message
           )
           this.showButtons=true;
           this.firstRow=true;
           this.secondtRow=false;
       },
       (e:any)=>{
         Swal.fire(
           "Fail ", 
           e.error.message
         )
         this.showButtons=false;
         this.firstRow=false;
         this.secondtRow=true;
       })
    
    }
    
 
  }
}

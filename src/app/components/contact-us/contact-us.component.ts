import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GlobalserviceService } from '../globalservice/globalservice.service';
import { GlobalService } from '../shared/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contactUs!: FormGroup;
  constructor(private service: GlobalService, private toastr: ToastrService,public translate: TranslateService) {
    this.thisLang = localStorage.getItem('currentLang') || navigator.language;
    console.log(this.thisLang, 'from ocnst');

    translate.use(this.thisLang || navigator.language);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        this.thisLang = 'rtl';
        console.log(this.thisLang, 'test1');
      } else {
        this.thisLang = 'ltr';
        console.log(this.thisLang, 'test2');
      }
    });

  }
  thisLang:any;
  ngOnInit(): void {
    this.contactUs = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log({ ...this.contactUs.value });
    this.service.contactUsHome({ ...this.contactUs.value }).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === true) {
          Swal.fire('تم إرسال الرسالة بنجاح').then(
            ()=>this.reload()
          );
         
        } else {
          for (let i = 0; i < res.errors.length; i++) {
            this.toastr.error(res.errors[i]);
          }
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  reload() {
    location.reload();
  }
}

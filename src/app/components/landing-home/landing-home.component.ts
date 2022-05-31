import { Component, OnChanges, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalserviceService } from '../globalservice/globalservice.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { GlobalService } from '../shared/services/global.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.css'],
})
export class LandingHomeComponent implements OnInit, OnChanges {
  contactmessagetrue = false;
  contactmessagefalse = true;
  testmonials: any;
  imageText: string = '';
  imageTitle: string = '';
  form!: FormGroup;
  thisLang: any;
  currentLang:any;

  contactUsForm!: FormGroup;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay: false,
    navSpeed: 400,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
  constructor(
    private formBuilder: FormBuilder,
    private service: GlobalService,
    public translate: TranslateService
  ) {
    this.thisLang = localStorage.getItem('currentLang');
    this.currentLang = localStorage.getItem("currentLang") || navigator.language;
    console.log(this.thisLang, 'from ocnst');

    translate.setDefaultLang(this.thisLang);
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
  ngOnInit(): void {
    console.log(this.thisLang, "let's try ");

    this.contactmessagetrue = false;
    this.contactmessagefalse = false;
    this.getImageText('Shipping');
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      MessageTitle: ['', Validators.required],
      Message: ['', Validators.required],
    });
    this.testmonialList();

    this.contactUsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  ngOnChanges() {}
  testmonialList() {
    this.service
      .gtAllTestmonialsHome()
      .pipe(map((res: any) => res['data']))
      .subscribe((res: any) => {
        console.log(res);
        this.testmonials = res;
        //  console.log(this.testmonials[0].description);
      });
  }

  getImageText(status: any) {
    console.log(status);
    switch (status) {
      case 'Shipping':
        if (localStorage.getItem('currentLang') === 'en') {
          this.imageText = `we provide alot of shippment in the shippment area so it is a lrge text that provide alot of function lorem
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          `;
        } else {
          this.imageText = ` محتوى نصي" ، مما يجعلها تبدو وكأنها إنجليزية قابلة للقراءة. تستخدم العديد من حزم النشر المكتبي ومحرري صفحات الويب الآن Lorem Ipsum كنص نموذج`;
        }

        if (localStorage.getItem('currentLang') === 'en') {
          this.imageTitle = status;
        } else {
          this.imageTitle = 'الشحن';
        }
        break;
      case 'Import':
        if (localStorage.getItem('currentLang') === 'en') {
          this.imageText = `we provide alot of shippment in the shippment area so it is a lrge text that provide alot of function lorem
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less ages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          `;
        } else {
          this.imageText = ` محتوى نصي" ، مما يجعلها تبدو وكأنها إنجليزية قابلة للقراءة. تستخدم العديد من حزم النشر المكتبي ومحرري صفحات الويب الآن Lorem Ipsum كنص نموذج`;
        }
        if (localStorage.getItem('currentLang') === 'en') {
          this.imageTitle = status;
        } else {
          this.imageTitle = 'الاستيراد';
        }

        break;
      case 'Warehouses':
        if (localStorage.getItem('currentLang') === 'en') {
          this.imageText = `we provide alot of shippment in the shippment area so it is a lrge text that provide alot of function lorem
          It is a long establishtion of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          `;
        } else {
          this.imageText = ` محتوى نصي" ، مما يجعلها تبدو وكأنها إنجليزية قابلة للقراءة. تستخدم العديد من حزم النشر المكتبي ومحرري صفحات الويب الآن Lorem Ipsum كنص نموذج`;
        }
        if (localStorage.getItem('currentLang') === 'en') {
          this.imageTitle = status;
        } else {
          this.imageTitle = 'المستودعات';
        }

        break;
      case 'Why-Us':
        if (localStorage.getItem('currentLang') === 'en') {
          this.imageText = `we provide alot of shippment in the shippment area so it is a lrge text that provide alot of function lorem
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          `;
        } else {
          this.imageText = ` محتوى نصي" ، مما يجعلها تبدو وكأنها إنجليزية قابلة للقراءة. تستخدم العديد من حزم النشر المكتبي ومحرري صفحات الويب الآن Lorem Ipsum كنص نموذج`;
        }
        if (localStorage.getItem('currentLang') === 'en') {
          this.imageTitle = status;
        } else {
          this.imageTitle = 'لماذا نحن ؟';
        }

        break;
      default:
        break;
    }
  }

  // this.contactmessage=false ;
  onSubmitContactUs() {
    this.contactmessagetrue = false;
    this.contactmessagefalse = false;
    console.log({ ...this.contactUsForm.value });
    this.service
      .contactUsHome({ ...this.contactUsForm.value })
      .subscribe((res: any) => {
        console.log(res);

        if (res.status === true) {
          this.resetForm();
          this.contactmessagetrue = true;
          this.contactmessagefalse = false;
        } else if (res.status === false) {
          this.contactmessagetrue = false;
          this.contactmessagefalse = true;
        }
      });
  }

  resetForm() {
    Object.keys(this.contactUsForm.controls).forEach((key) => {
      this.contactUsForm.controls[key].clearValidators();
    });

    this.contactUsForm.reset();

    Object.keys(this.contactUsForm.controls).forEach((key) => {
      this.contactUsForm.controls[key].setValidators([Validators.required]);
    });
  }
}

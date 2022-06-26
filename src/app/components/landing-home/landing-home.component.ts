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
    this.thisLang = localStorage.getItem('currentLang') || navigator.language;
    this.currentLang = localStorage.getItem("currentLang") || navigator.language;
    console.log(navigator.language.split("-")[0], 'from const');
    if (this.thisLang == 'ar') {
      setTimeout(()=>{this.getImageText("shipping")
    },1000)
      this.thisLang = 'rtl';
      console.log(this.thisLang, 'test1');
    } else {
      this.thisLang = 'ltr';
      setTimeout(()=>{this.getImageText("shipping")
      },1000)
      console.log(this.thisLang, 'test2');
    }
    translate.use(localStorage.getItem("currentLang") || navigator.language);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        this.thisLang = 'rtl';
        console.log(this.thisLang, 'test1');
      } else if(event.lang == 'en') {
        this.thisLang = 'ltr';
        console.log(this.thisLang, 'test2');
      }    
      if (this.thisLang == 'ar') {
        setTimeout(()=>{this.getImageText("Import")
      },50)
        console.log(this.thisLang, 'test1');
      } else {
        setTimeout(()=>{this.getImageText("Import")
        },50)
        console.log(this.thisLang, 'test2');
      }
      // location.reload()
    });
  }
  
  ngOnInit(): void {
    console.log(localStorage.getItem("currentLang") , "inittttttttttt");
    
    console.log(this.thisLang, "let's try");

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
        if (!localStorage.getItem('currentLang') || localStorage.getItem('currentLang') === 'en') {
          this.imageText = `Our goal is to make the shipping and shopping experience as easy as possible, so that we save the ring
          Lost between global factories and shoppers from home and abroad
          We also provide many facilities for shipping services from all countries of the world
          `;
        } else {
          this.imageText = `هدفنا هو جعل تجربة الشحن والتسوق أسهل ما يمكن، بحيث نوفر الحلقه
          الضائعة ما بين المصانع العالمية وبين المتسوقين من الداخل والخارج 
          كما نوفر تسهيالت عديدة لخدمات الشحن من جميع دول العالم`;
        }

        if (!localStorage.getItem('currentLang') || localStorage.getItem('currentLang') === 'en') {
          this.imageTitle = status;
        } else {
          this.imageTitle = 'الشحن';
        }
        break;
      case 'Import':
        if (!localStorage.getItem('currentLang') || localStorage.getItem('currentLang') === 'en') {
          this.imageText = `Specializing in importing from China and global and local markets, and under the supervision and management of our office, we search for high-quality goods and present them to the customer at an appropriate price, until we came to the concept that all goods, especially the Chinese goods we offer, compete with the global market in quality, price, and efficiency at a very high level, and we provide the best services to our customers.
          1 / The company coordinates with factories to provide the customer's demand at the highest level of quality or
          According to the customer's desire.
          2 / The possibility of purchasing or manufacturing without the need to travel to China.
          3 / We follow up the production stages with the factories until receipt is made on the agreed dates.
          4 / The company follows up the receipt of the goods and inspects the quality of their conformity with the agreed upon specifications.
          5/ Possibility of storing goods in our warehouse in China.
          6 / Provide translators in case the client visits China to facilitate the process of dealing with the Chinese party`;
        } else {
          this.imageText = ` متخصصين في الاستيراد من الصين والأسواق العالمية والمحلية وبإشراف وإدارة مكتبنا نبحث عن البضائع عالية الجودة وتقديمها للعميل بسعر مناسب حتى وصلنا إلى مفهوم أن جميع البضائع وخصيصا البضائع الصينية التي نقدمها تنافس السوق العالمي في الجودة والسعر وبكفائه عاليا جدا ونقدم أفضل الخدمات لعمالئنا.
          1 / تقوم الشركة بالتنسيق مع المصانع لتوفير طلب العميل على أعلى مستوى من الجودة أو 
          على حسب رغبة العميل.
          2 / إمكانية الشراء أو التصنيع دون الحاجة الى السفر للصين.
          3 / نقوم بمتابعة مراحل الإنتاج مع المصانع حتى يتم الأستلام في المواعيد المتفق عليها .
          4 / تقوم الشركة بمتابعة الإستلام للبضائع ومعاينة الجودة مطابقتها للمواصفات المتفق عليها.
          5 / إمكانية تخزين البضائع في مستودعاتنا في الصين.
          6 / توفير مترجمين في حالة زيارة العميل للصين لتسهيل عملية التعامل مع الطرف الصيني `;
        }
        if (!localStorage.getItem('currentLang') || localStorage.getItem('currentLang') === 'en') {
          this.imageTitle = status;
        } else {
          this.imageTitle = 'الاستيراد';
        }

        break;
      case 'Warehouses':
        if (!localStorage.getItem('currentLang') || localStorage.getItem('currentLang') === 'en') {
          this.imageText = `The possibility of storing goods in our warehouses in China with large storage areas and arranged equipped at the highest level and the maximum degree of safety when stored with the receipt, examination and insurance of warehouses
          Follow storage conditions in terms of appropriate storage method and spaces inside the store.
          The company collects shipments and segmented freight through sea and air freight from China to all countries of the world, in addition to the presence of services -
          Distinguished logistics of checking, sorting, inspecting and protecting products when packaging and shipping them from door to door
          Follow up and finalize all documents for each shipment.
          The company follows up the receipt of the goods and inspects the quality of their conformity with the agreed specifications`;
        } else if (localStorage.getItem('currentLang') === 'ar') {
          this.imageText = ` امكانية تخزين البضائع في مستودعاتنا في الصين بمساحات تخزينية واسعة ومرتبة مجهزة على اعلى مستوى واقصى درجة من الامان عند تخزينها مع استلام وفحص وتأمين المخازن
          اتباع شروط تخزينية من حيث اسلوب التخزين المناسب والمساحات داخل المخزن -
          تقوم الشركة بتجميع الشحنات والشحن المجزأ عبر شحن البحري والجوي من الصين إلى كافة دول العالم اضافة الى وجود خدمات -
          .اللوجستية المميزة من فحص وفرز ، ومعاينة وحماية المنتجات عند تغليفها وشحنها من الباب الى الباب
          متابعة وإنهاء كافة الأوراق الخاصة بكل شحنة -
          تقوم الشركة بمتابعة الاستلام للبضائع ومعاينة الجودة مطابقتها للمواصفات المتفق عليها`;
        }
        if (!localStorage.getItem('currentLang') || localStorage.getItem('currentLang') === 'en') {
          this.imageTitle = status;
        } else if(localStorage.getItem('currentLang') === 'ar'){
          this.imageTitle = 'المستودعات';
        }

        break;
      case 'Why-Us':
        if (!localStorage.getItem('currentLang') || localStorage.getItem('currentLang') === 'en') {
          this.imageText = `we provide alot of shippment in the shippment area so it is a lrge text that provide alot of function lorem
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          `;
        } else {
          this.imageText = ` لماذا عليك ان تختارنا
          لأننا من أفضل المواقع الرائدة في مجال الحلول والخدمات والشحن حيث اننا نفتخر بعملنا 
          .الذي قدمناه من الخبرة في الشحن المحلية والعالمية
          يحصل موقعنا على موثوقيته كأفضل مزود خدمات شحن حيث اننا نقوم بتوفير خدمات عالية 
          بأسعار ممتازة وأيضا المرونة والتنوع الكبير في خياراتنا وخدماتنا كما أن تعاملنا مع العديد 
          من أنواع البضائع والشحن جعلنا احد المواقع الرائدة في جميع أنواع الخدمات نحن نقدم 
          .خدمات عالية الجودة لتوفير الشحن المتكاملة`;
        }
        if (!localStorage.getItem('currentLang') || localStorage.getItem('currentLang') === 'en') {
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

import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/services/global.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Input } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { GlobalserviceService } from '../../globalservice/globalservice.service';
import { GeneralService } from '../../general/general.service';
@Component({
  selector: 'app-shipping-fee-calculator',
  templateUrl: './shipping-fee-calculator.component.html',
  styleUrls: ['./shipping-fee-calculator.component.css'],
})
export class ShippingFeeCalculatorComponent implements OnInit {
  allShippingType: any = [
    { id: 1, name: 'aerial' },
    { id: 0, name: 'nautical' },
  ];
  // SaudiCities = [
  //   { id: 1, name: 'Jeddah' },
  //   { id: 1, name: 'Riyadh' },
  // ];
  // fromCities: any = [];
  // toCities: any = [];
  // allShipmentType: any = [];
  // selectedvalue: any = 'tessy';
  // saudiharbors: any = [];
  form!: FormGroup;
  promo!: any;
  commercialInvoice: File[] = [];
  commercialInvoicelength: any = [];
  packingListlength: any = [];
  packingList: File[] = [];
  commercialInvoiceArr!: any[];
  packingListArr!: any[];
  // fromChinaHarbor!: any;
  // label: any;
  // toSaudiHarbor!: any;
  // typeOfShipping!: any;
  // typeOfShipment!: any;
  // shipmentWeight!: any;
  // height!: any;
  // width!: any;
  // length!: any;
  // showCBM = false;
  // showKg = true;
  // index: any;
  showComercialInvoice = true;
  showPackingList = true;
  fullComercialInvoice = false;
  fullPackingList = false;
  case: any;
  allShipmentType: any = [];
  offerDetails: any;
  discount: any;
  showCard: boolean = false;

  thisLang: any;

  constructor(
    public service: GlobalService,
    private formbuilder: FormBuilder,
    private router: Router,
    public translate: TranslateService,
    private globalService: GlobalserviceService,
    public incomeData: GeneralService,
    private route: ActivatedRoute
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.route.queryParams.subscribe((params) => {
        this.case = params['case'];
      });

      if (event.lang == 'ar') {
        this.thisLang = 'rtl';
        console.log(this.thisLang, 'test1');
      } else {
        this.thisLang = 'ltr';
        console.log(this.thisLang, 'test2');
      }
    });
    // this.index = localStorage.getItem('shipment_type');
    // this.globalService.getAllShipmentTypes().subscribe((res: any) => {
    //   //  console.log(res.data, 'oooooooooooooooooooooooo');

    //   this.allShipmentType = res.data;
    //   // console.log("qwwwwwwwq" , this.allShipmentType);

    //   this.label = this.allShipmentType.filter((e: any) => {
    //     return e.id == this.typeOfShipment;
    //   });
    //   console.log(this.label, 'oooooooooooooooooooooooo');
    // });
    this.thisLang = localStorage.getItem('currentLang') || navigator.language;
    console.log(this.thisLang, 'from ocnst');

    translate.use(this.thisLang || navigator.language);
  }

  ngOnInit(): void {
    this.getShipmentType();
    console.log(this.incomeData, 'testststs');

    if (localStorage.getItem('currentLang') == 'ar') {
      this.thisLang = 'rtl';
    } else if (localStorage.getItem('currentLang') == 'en') {
      this.thisLang = 'ltr';
    }
    // this.fromChinaHarbor = this.incomeData.fromChinaHarbor;
    // this.toSaudiHarbor = this.incomeData.toSaudiHarbor;
    // this.typeOfShipping = this.incomeData.typeOfShipping;
    // this.typeOfShipment = this.incomeData.typeOfShipment;
    // this.shipmentWeight = this.incomeData.shipmentWeight;
    // this.height = this.incomeData.height;
    // this.width = this.incomeData.width;
    // this.length = this.incomeData.length;
    this.promo = new FormGroup({
      code: new FormControl(''),
    });
    // console.log(
    //   'tesssssssst',
    //   this.incomeData.typeOfShipment
    // );

    // if (this.typeOfShipping == 0) {
    //   this.showCBM = true;
    //   this.showKg = false;
    // } else {
    //   this.showCBM = false;
    //   this.showKg = true;
    // }
    // this.service.getSaudiWarehouses().subscribe((res: any) => {
    //   this.saudiharbors = res['data'];
    //   console.log('saudiharbors', this.saudiharbors);
    // });

    this.form = this.formbuilder.group({
      china_harbor_id: [
        this.incomeData.fromChinaHarbor || '',
        Validators.required,
      ],
      saudi_harbor_id: [
        this.incomeData.toSaudiHarbor || '',
        Validators.required,
      ],
      // type: [this.typeOfShipping, Validators.required],
      type: [this.incomeData.typeOfShipping || '', Validators.required],
      shipment_type: [
        this.incomeData.typeOfShipment || '',
        Validators.required,
      ],
      weight1: [this.incomeData.shipmentWeight || '', Validators.required],
      length: [this.incomeData.length || 0],
      width: [this.incomeData.width || 0],
      height: [this.incomeData.height || 0],
      code: [this.promo.controls.code.value],
    });
    // this.form.get('weight')?.disable()
  }
  // onChangeChina(event: any) {}
  // onTypeOfShipping(event: any) {}
  // onTypeOfShipment(event: any) {}
  // GetCity(e: any, place: any) {
  //   if (place == 'from') {
  //     if (e.target.value == 'China') {
  //       this.fromCities = this.ChinaCities;
  //     } else if (e.target.value == 'Saudi') {
  //       this.fromCities = this.SaudiCities;
  //     } else {
  //       this.fromCities = [];
  //     }
  //   } else {
  //     if (e.target.value == 'China') {
  //       this.toCities = this.ChinaCities;
  //     } else if (e.target.value == 'Saudi') {
  //       this.toCities = this.SaudiCities;
  //     } else {
  //       this.toCities = [];
  //     }
  //   }
  // }

  commercialInvoiceChange(event: any) {
    this.commercialInvoice = event.target.files;
    console.log('files', this.commercialInvoice[0]);

    this.commercialInvoicelength.push('one');
    console.log('length', this.commercialInvoicelength);
    if (this.commercialInvoice.length != 0) {
      this.showComercialInvoice = false;
      this.fullComercialInvoice = true;
    } else {
      this.showComercialInvoice = true;
      this.fullComercialInvoice = false;
    }
    this.form.addControl('invoice', new FormControl(this.commercialInvoice[0]));
  }

  packingListChange(event: any) {
    this.packingList = event.target.files;
    console.log('files', this.packingList[0]);
    this.packingListlength.push('one');
    console.log('length', this.packingListlength);
    if (this.packingList.length != 0) {
      this.showPackingList = false;
      this.fullPackingList = true;
    } else {
      this.showPackingList = true;
      this.fullPackingList = false;
    }
    this.form.addControl('list', new FormControl(this.packingList[0]));
  }
  resetForm() {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].clearValidators();
    });
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setValidators([Validators.required]);
    });
  }

  // newOrder() {
  //   setTimeout(() => {
  //     this.router.navigate(['about/orders']);
  //   }, 500);
  //   //  this.service.logged=2;
  //   console.log('navigated');
  // }

  onSubmit() {
    if (this.packingList.length != 0 && this.commercialInvoice.length != 0) {
      let orderId: number;
      let payed: number;

      // this.form.controls['code'].setValue('');
      let subForm = {
        ...this.form.value,
        weight: this.form.controls.weight1.value,
        company_id: this.service.order_company_id,
        invoice: this.commercialInvoice[0],
        list: this.packingList[0],
        // code: ' ',
      };

      this.service.bookingOrder(subForm).subscribe(
        (res: any) => {
          console.log('resssssssss', subForm);

          Swal.fire(res.message);
          orderId = res.data?.id;
          payed = res.data?.payed;
          console.log('res', orderId, payed);
          // this.form.reset();
          this.orderPayment(orderId, payed);
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      Swal.fire('Files Are Required');
    }
  }

  checkCode(code: any) {
    if (code) {
      this.form.controls['code'].setValue(code);
    } else {
    }
    return this.globalService.checkPromo(code).subscribe((e: any) => {
      
      if (e.status == false) {
        Swal.fire('خطأ', 'الكود المستخدم غير صحيح', 'warning');
        this.form.controls['code'].setValue('');
      } else {
        Swal.fire('نجاح', 'تم تفعيل كود الخصم بنجاح', 'success');
        this.discount = +e.data.discount_precentage/100;
        this.form.controls['code'].setValue(code);
      }
    });
  }

  test() {
    console.log(this.form.value);
  }
  getShipmentType() {
    this.service.getAllShipmentTypes().subscribe((res: any) => {
      this.allShipmentType = res.data;
      console.log(this.allShipmentType, '3333333');
    });
  }
  calculate() {
    this.service
      .homeOrders(
        this.form.controls.china_harbor_id.value,
        this.form.controls.saudi_harbor_id.value,
        this.form.controls.type.value,
        this.form.controls.shipment_type.value,
        this.form.controls.weight1.value
      )
      .subscribe((res: any) => {
        this.offerDetails = res;
        if (res.status === true) {
          this.showCard = true;
        }
        console.log(res);
      });
  }

  orderPayment(orderId: any, payed: number) {
    return this.service.orderPayment(orderId, payed).subscribe((e: any) => {
      window.open(`${e.url}`, '_blank');
      // console.log(e.url, '333333333333333');
    });
  }
}

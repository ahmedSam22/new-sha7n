import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.css'],
})
export class LandingHomeComponent implements OnInit {
  contactmessagetrue = false;
  contactmessagefalse = true;
  testmonials: any;
  imageText: string = '';
  imageTitle: string = '';
  form!: FormGroup;
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
    private service: GlobalService
  ) {}

  ngOnInit(): void {
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
        this.imageText = `we provide alot of shippment in the shippment area so it is a lrge text that provide alot of function lorem
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        `;
        this.imageTitle = status;
        break;
      case 'Import':
        this.imageText = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`;
        this.imageTitle = status;

        break;
      case 'Warehouses':
        this.imageText = `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc`;
        this.imageTitle = status;

        break;
      case 'Why-Us':
        this.imageText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet tincidunt ex. Curabitur et urna sit amet odio facilisis semper. Nullam lobortis dolor sit amet augue rutrum tristique. Etiam cursus felis sit amet purus dapibus convallis. Ut at dolor sollicitudin, convallis tortor id, sodales mauris. Donec vel metus in purus iaculis blandit. Morbi quis efficitur arcu, vitae viverra libero. Nam condimentum at ligula non vehicula. Maecenas vitae viverra magna. Proin sapien nunc, commodo eu ex sed, placerat porta sem. Aliquam ultrices dolor sit amet molestie varius. Duis ac quam rutrum, accumsan nibh vitae, venenatis est. Suspendisse gravida orci sed nulla laoreet consectetur.

              Duis vestibulum arcu et feugiat consequat. Pellentesque ut rhoncus odio, at pharetra tortor. Nulla et fringilla elit. Pellentesque lobortis id erat vel aliquam. Pellentesque tristique tellus pharetra risus ultrices, vestibulum maximus ex malesuada. Ut quis mauris eget diam molestie bibendum. Duis mollis nibh dui, et ultricies nibh sagittis at. Aenean porttitor suscipit lorem a rhoncus. Aliquam erat volutpat.`;
        this.imageTitle = status;

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
      this.contactUsForm.controls[key].setValidators([
        Validators.required,
      ]);
    });
  }
}

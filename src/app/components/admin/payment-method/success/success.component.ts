import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    Swal.fire({text:'تم تأكيد الدفع بنجاح',
    showConfirmButton:false,
    timer: 3000,
    backdrop: 'swal2-backdrop-show',

  })
    setTimeout(()=>{
   
    return  this.router.navigate(['/admin/orders']);

    },3000)
  }

}

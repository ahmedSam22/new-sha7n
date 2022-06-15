import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fail',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.css']
})
export class FailComponent implements OnInit {
  constructor(private router:Router) { }

  ngOnInit(): void {
    Swal.fire({text:'عملية غير ناجحة ',
    showConfirmButton:false,
    timer: 3000,
    backdrop: 'swal2-backdrop-show',

  })
    setTimeout(()=>{
   
    return  this.router.navigate(['admin/orders']);

    },3000)
  }
}

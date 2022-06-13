import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { GlobalService } from '../../shared/services/global.service';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  checked = false;
  disabled = false;
  cards:any
  constructor(private dialog:MatDialog,private service : GlobalService) { }

  ngOnInit(): void {
    this.getCards()
  }
  getCards(){
    this.service.getCards().subscribe((res:any)=>{
      console.log(res)
      this.cards = res.data
    })
  }

  addCard(){
    let dialogRef = this.dialog.open(AddComponent, {
      height: '650px',
      width: '600px',
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   // this.projectList()
    // });
  }
  onDelete(id:any){
    Swal.fire({
      // title: 'Are You Sure You Want to Delete This Card?',
      text:'Are You Sure You Want to Delete This Card?',


      showConfirmButton:true,
      showCancelButton:true,
      cancelButtonText:'No, Dont Delete',
      confirmButtonText: 'Yes Delete'

    }).then(res=>{
      console.log(res)
      if(res.isConfirmed){
        this.service.deleteCards(id).subscribe(res=>{
          this.getCards()
        })
      }
    })
  }
}

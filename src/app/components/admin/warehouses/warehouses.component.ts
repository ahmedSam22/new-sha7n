import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/services/global.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {
  chinaWarehouses: any;
  saudiWarehouses: any;

  constructor(private service:GlobalService) { }

  ngOnInit(): void {
    this.getChinaWarehouses()
    this.getSaudiWarehouses()
  }

  getChinaWarehouses(){
    this.service.getChinaWarehouses().subscribe((res:any)=>{
      this.chinaWarehouses = res.data
      console.log('china',res.data)
    })

  }
  getSaudiWarehouses(){
    this.service.getSaudiWarehouses().subscribe((res:any)=>{
      this.saudiWarehouses =res.data
      console.log('saudi',res.data)
    })

  }

}

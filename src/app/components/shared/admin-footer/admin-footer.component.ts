import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.css']
})
export class AdminFooterComponent implements OnInit {
  ads:any
  constructor(private service : GlobalService) { }

  ngOnInit(): void {
    this.service.getAds().subscribe((res:any)=>{
    console.log(res.data)
    this.ads = res.data

    }
    )
  }
  selectedCountryCode = 'us';
  countryCodes = ['us', 'eg'];

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
  }
}

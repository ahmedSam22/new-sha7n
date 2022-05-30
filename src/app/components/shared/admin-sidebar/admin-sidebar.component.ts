import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  showFiller = false;
  collapsed=true;
  constructor() { }

  ngOnInit(): void {
  }
  openNav() {
    //  document.getElementById('mySidebar').style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
  }
  closeNav() {
    // document.getElementById("mySidebar").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
  }

  logout(){
    localStorage.removeItem("qadiautkCurrentUser")
  }
}

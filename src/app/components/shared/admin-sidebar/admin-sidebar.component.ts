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
    
  }
  closeNav() {
   
  }
  doSomeThing(){
   let x= document.getElementById('divId') as HTMLElement;
   x.classList.toggle("show");
  }
}

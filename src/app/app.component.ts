import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ToasterService } from './Service/toaster.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';

  public currentPath: string;
  public hideheader : boolean = false;


  constructor(
    public localStoregeService: LocalStorageService,
    location: Location,
    private router: Router,
    private toasterService : ToasterService) {
    router.events.subscribe((val) => {


      if (location.path().includes("userreport")) {

        this.hideheader = true;
        this.currentPath = location.path();

      } 
    });
  }


  ngOnInit(): void {
  }


  CloseNav(data){
    $("#main").css({ 'margin-left': 0 });
  }

  openNav(data){
    $("#main").css({ 'margin-left': 250 });
  }



}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LabDoctorService } from 'src/app/Service/lab-doctor.service';
import { map, startWith } from 'rxjs/operators';
import { LabDoctor } from 'src/app/Model/LabDoctor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public id : any = "";
  hospitalTitle: string;
  hospitalImage: string = "../assets/medicalCollage/" + 1 + ".jpg";
  public hide : boolean = true;
  private currentUrl;
  i : number;

  labDoctorName: string[];
  filteredOptions: Observable<Object[]>;
  myControl = new FormControl();
  autoCompleteObject = [
    {title : "ibrahim", id : 1},
    {title : "rifat", id : 2},
    {title : "hasiv", id : 3},
    {title : "naim", id : 4}
  ];
  labDoctorObject: LabDoctor[];

  medicalName: string[] = ['Khulna Medical Hospital', 'Shaheed Sheikh Abu Naser Specialised Hospital',
    'Khulna City Hospital', 'Islami Bank Hospital Khulna', 'Khulna Shishu Hospital', 'Gazi Medical College and Hospital']


    @Output() sideNavOpen: EventEmitter<string> = new EventEmitter<string>();

     @Output() sideNavClose: EventEmitter<string> = new EventEmitter<string>();
    

    sendNavOpenFun(){
      $(".sidebar").css({ 'left': 0 });
      $("#cancel").css({ 'left': 210 });
      this.sideNavOpen.next("Open");
    }

    sendNavCloseFun(){
      $(".sidebar").css({ 'left': -250 });
      $("#cancel").css({ 'left': -195 });
       this.sideNavClose.next("Close");
    }

  constructor(private router: Router,
    private localStoregeService: LocalStorageService,
    private labDoctorService: LabDoctorService) { }

  ngOnInit(): void {

    this.labDoctorName = new Array<string>();

    $(document).ready(function () {

      var x = $(".logo").position();

      var b = $(".logo").width();
     
      $("#menuIcon").css({ 'left': x.left + 170 });

      var y = $("#menuIcon").position();


      // // open
      // $("#btn").click(function () {
      //   $(".sidebar").css({ 'left': 0 });
      //   $("#cancel").css({ 'left': 210 });
      //   // $(".allContainer").css({ 'margin-left': 210 });
      //   // $("#report-info-popup").toggleClass("border-class");
      // });

      // // close
      // $("#cancel").click(function () {
      //   $(".sidebar").css({ 'left': -250 });
      //   $("#cancel").css({ 'left': -195 });
      //   // $("#report-info-popup").toggleClass("border-class");
      // });

    });

    // this.interactionService.headingTitle$.subscribe(
    //   id => {
    //     this.id = id
    //     this.hospitalTitle = this.medicalName[this.id - 1];
    //     this.hide = true;
    //   }
    // )



    this.labDoctorService.fetchLabDoctor(1).subscribe(
      data => {

        this.labDoctorObject = data;

        for (this.i = 0; this.i < data.length; this.i++) {
          this.labDoctorName[this.i] = data[this.i].title;
        }

        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );

      }, error => {}
    );

    if (window.location.href == 'http://localhost:4200/') {
      this.hide = false;
    }
  }



  displayFn(object){
   return object ? object.title : undefined;
  }


  private _filter(value: LabDoctor): Object[] {

    console.log("value " + value);
    const filterValue = value;
    console.log("filterr value " + filterValue);
    return this.labDoctorObject.filter(option => option == filterValue);
  }

  selectedLAbDoctor(selected) {
       console.log("select == " + selected.title + "   " + selected.id);
  }


  selectedobejct(selected) {
    console.log("selselectedobejctect == " + selected.title + "   " + selected.id);
}

  simple(){

    if (window.location.href == 'http://localhost:4200/') {
      this.hide = false;
    }
    else{
      this.hide = true;
    }
    console.log("simple " + this.hide);
  }

  setReport() {
    this.sendNavCloseFun();
    this.router.navigate(['/adminreport']);
  }

  addInvestigationRequest() {
    this.sendNavCloseFun();
    this.router.navigate(['/adminpost']);
  }

  addInvestigation() {
    this.sendNavCloseFun();
    this.router.navigate(['/investigationadd']);
  }

  investigationList(){
    this.sendNavCloseFun();
    this.router.navigate(['/investigation']);
  }

  home() {
    this.sendNavCloseFun();
    this.router.navigate(['/investigationrequest/1']);
  }

  closeNav(){
    $(".sidebar").css({ 'left': -250 });
    $("#cancel").css({ 'left': -195 });
  }

}

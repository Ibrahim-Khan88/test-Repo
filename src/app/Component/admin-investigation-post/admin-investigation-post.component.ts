import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { InvestigationRequestServiceService } from 'src/app/Service/investigation-request-service.service';
import { InvestigationService } from 'src/app/Service/investigation.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Investigation } from 'src/app/Model/Invesigation';
import { Department } from 'src/app/Model/Department';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/Service/toaster.service';
import { Accessories } from 'src/app/Model/Accessories';
import { DoctorService } from 'src/app/Service/doctor.service';
import { AccessoriesService } from 'src/app/Service/accessories.service';
import { Doctor } from 'src/app/Model/Doctor';



@Component({
  selector: 'app-admin-investigation-post',
  templateUrl: './admin-investigation-post.component.html',
  styleUrls: ['./admin-investigation-post.component.css']
})
export class AdminInvestigationPostComponent implements OnInit {


  investigationPostForm: FormGroup;
  investigationRequestId: number;
  providerId: number;
  public formdata = new FormData();
  public reportimage: any = File;
  defaultTime = { hour: 13, minute: 30 };
  meridian = true;
  gamilValue: string;
  imageUrl: string | ArrayBuffer;
  investigationformat: string = "";
  curDate = new Date();
  reportImageIsSelected: boolean = false;
  private i: number;
  private j: number;
  public totalCost: number = 0;
  private selectedInvestigationString: string = "";
  hasParameter: boolean;
  selectedBoolean: boolean;
  public showConfirm: boolean = false;
  public showPrintAndBill: boolean = false;
  public lastIndex: number = 0;

  ptientName: string = "Not set";
  age: string = "Not set";
  sex: string = "Not set";
  sample: string = "Not set";
  reportResult: string = "Not set";
  referenceValue: string = "Not set";
  investigationName: string = "Not set";
  doctorArray: Doctor[];
  accessoriesArray: Accessories[];


  department: Department = {
    "id": 1,
    "name": "Pathology",
    "type": "List"
  };

  investigationNameArray = [
    "ibrahim",
    "rifat",
    "hasiv"
  ];


  optionsObject = [
    { name: "angular" },
    { name: "react" },
    { name: "vue" },
    { name: "spring" }
  ];


  public allInvestigation: Investigation[];



  investigationNameString: string[];
  refDoctorNameString: string[];
  accessoriesNameString: string[];
  public selectedInvestigation: Investigation[] = [

  ];

  public addedAccessories: Accessories[] = [];



  // = ["angular", "vue", "react", "spring", "php", "java", "html", "css"]

  myControl = new FormControl();
  myControlRefDoctor = new FormControl();
  myControlAccessories = new FormControl();

  filteredOptions: Observable<Object[]>;
  filteredOptionsRefDoctor: Observable<Object[]>;
  filteredOptionsAccessories: Observable<Object[]>;

  displayFun(subject) {
    return subject ? subject.name : undefined;
  }



  constructor(private formBuilder: FormBuilder,
    private investigationRequestService: InvestigationRequestServiceService,
    private invesgationRequest: InvestigationService,
    private localStoregeService: LocalStorageService,
    private elementRef: ElementRef,
    private _avtivatedRoute: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router,
    private doctorService: DoctorService,
    private accessoriesService: AccessoriesService) {


    this.investigationPostForm = formBuilder.group({
      'billNumber': [null],
      'name': [null, Validators.required],
      'mobile': [null, Validators.required],
      'paymentMode': [null],
      'paymentAmount': [null, Validators.required],
      'referenceDoctor': [null],
      'age': [null],
      'gender': [null],
    });

  }



  ngOnInit(): void {

    // this.investigationPostForm.get("billNumber").setValue("b44444");
    // this.investigationPostForm.get("name").setValue("ibrahim kkkk");
    // this.investigationPostForm.get("paymentAmount").setValue(300);

    // $("#lodingDiv").css({ 'height': 120 });
    // $("#backgroundloding").css({ 'height': "100vh" });

    this.investigationNameString = new Array<string>();
    this.refDoctorNameString = new Array<string>();
    this.accessoriesNameString = new Array<string>();
    // this.investigationNameString = ["angular", "vue", "react", "spring", "php", "java", "html", "css"];

    //   $(".input--style-5").on('click',function (e) {

    //     console.log("click is call " );
    //     // var index = $(".input--style-5").index(this);
    //     // console.log("click is call " + (index + 1));
    //     e.preventDefault();

    // });


    this.providerId = this.localStoregeService.retrieve("providerId");

    if (this.providerId == null) {
      this.router.navigate(['/']);
    }


    this.invesgationRequest.fetchInvestigationByProviderId(this.providerId).subscribe(
      data => {

        this.allInvestigation = data;
        for (this.i = 0; this.i < this.allInvestigation.length; this.i++) {


          this.investigationNameString.push(
            this.allInvestigation[this.i].name + " " + this.allInvestigation[this.i].selectionCode);
          // console.log("investigationNameString  " + this.investigationNameString[this.i]);
        }


        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );

      });



    this.doctorService.fetchDoctor(this.providerId).subscribe(
      data => {
        this.doctorArray = data;

        for (this.i = 0; this.i < this.doctorArray.length; this.i++) {

          this.refDoctorNameString.push(this.doctorArray[this.i].name + " " + this.doctorArray[this.i].selectionCode);
          // console.log("investigationNameString  " + this.investigationNameString[this.i]);
        }


        this.filteredOptionsRefDoctor = this.myControlRefDoctor.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterRefDoctor(value))
          );

      },
      error => {
      }
    );


    this.accessoriesService.fetchAccessories().subscribe(
      data => {
        this.accessoriesArray = data;

        for (this.i = 0; this.i < this.accessoriesArray.length; this.i++) {

          this.accessoriesNameString.push(this.accessoriesArray[this.i].name);
          // console.log("investigationNameString  " + this.investigationNameString[this.i]);
        }


        this.filteredOptionsAccessories = this.myControlAccessories.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterAccessories(value))
          );

      },
      error => {
      }
    );




    $(document).ready(function () {

      $("#confirm-popup-close").click(function () {
        $("#confirm-popup").css({ 'height': 0 });
        $("#make-space").css({ 'height': 0 });
        $("#confirm-popup").toggleClass("border-class");
      });

      document.getElementById("popup-info").style.top = "-200%";

      document.getElementById("dismiss-popup-btn").addEventListener("click", function () {
        document.getElementsByClassName("popup")[0].classList.remove("active");
        document.getElementById("popup-info").style.top = "-200%";

      });


      $("#All-data-Container").on('keydown', '.input--style-5', function (e) {

        if (e.keyCode == 13) {
          var index = $(".input--style-5").index(this);
          $(".input--style-5").eq(index + 1).focus();
          console.log("click is call " + (index + 1));
          e.preventDefault();
        }

      });

    });


  }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#EDF1F6';
  }

  private _filter(value: String): Object[] {

    const filterValue = value.toLowerCase();
    return this.investigationNameString.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterRefDoctor(value: String): Object[] {

    const filterValue = value.toLowerCase();
    return this.refDoctorNameString.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterAccessories(value: String): Object[] {

    const filterValue = value.toLowerCase();
    return this.accessoriesNameString.filter(option => option.toLowerCase().includes(filterValue));
  }


  selectedRefDoctor(selected) {

    this.selectedBoolean = false;
    // Checking records is exist or not
    for (this.j = 0; this.j < this.doctorArray.length; this.j++) {

      if ((this.doctorArray[this.j].name + " " + this.doctorArray[this.j].selectionCode) == selected) {
        this.myControlRefDoctor.setValue(this.doctorArray[this.j].name);
        this.investigationPostForm.get("referenceDoctor").setValue(this.doctorArray[this.j].name);
      }

    }

  }

  selectedAccessories(selected) {

    for (this.j = 0; this.j < this.accessoriesArray.length; this.j++) {
      if (this.accessoriesArray[this.j].name == selected) {
        this.addedAccessories.push(this.accessoriesArray[this.j]);
        this.totalCost += this.accessoriesArray[this.j].amount;
      }
    }

    this.myControlAccessories.setValue("");

  }


  deleteSelectedAccessories(deletedItem) {
    this.addedAccessories =
      this.addedAccessories.filter(m => m != deletedItem);
    this.totalCost -= deletedItem.amount;
  }

  selectedValue(selected) {

    this.myControl.setValue("");

    this.selectedBoolean = false;
    // Checking records is exist or not
    for (this.j = 0; this.j < this.selectedInvestigation.length; this.j++) {

      if ((this.selectedInvestigation[this.j].name + " " + this.selectedInvestigation[this.j].selectionCode) == selected) {
        this.selectedBoolean = true;
      }

    }

    if (!this.selectedBoolean) {
      for (this.i = 0; this.i < this.allInvestigation.length; this.i++) {

        if ((this.allInvestigation[this.i].name + " " + this.allInvestigation[this.i].selectionCode) == selected) {

          this.selectedInvestigation.push(this.allInvestigation[this.i]);
          this.lastIndex = this.selectedInvestigation.length;

          console.log("total Cost==" + this.totalCost);
          this.totalCost += this.allInvestigation[this.i].rate;
          console.log("total Cost==" + this.totalCost);
          this.totalCost += this.allInvestigation[this.i].vatApplyAmount;
          console.log("total Cost==" + this.totalCost);

          if (this.allInvestigation[this.i].discountPer != 0) {
            this.totalCost -= (this.allInvestigation[this.i].rate * this.allInvestigation[this.i].discountPer) / 100;
          }
          else {
            this.totalCost -= this.allInvestigation[this.i].discountAmount;
          }

          // console.log(this.allInvestigation[this.i].vatApplyAmount + " " + 
          // this.allInvestigation[this.i].discountAmount + 
          // "  " + this.allInvestigation[this.i].discountPer);


          // for (this.j = 0; this.j < this.allInvestigation[this.i].accessories.length; this.j++) {
          //   this.addedAccessories.push(this.allInvestigation[this.i].accessories[this.j]);
          //   this.totalCost += this.allInvestigation[this.i].accessories[this.j].amount;
          // }

        }

      }
    }

  }


  deleteselectedItem(investigationId) {

    for (this.i = 0; this.i < this.allInvestigation.length; this.i++) {


      if (this.allInvestigation[this.i].id == investigationId) {
        this.selectedInvestigation =
          this.selectedInvestigation.filter(m => m != this.allInvestigation[this.i]);
        this.totalCost -= this.allInvestigation[this.i].rate;
        this.lastIndex = this.selectedInvestigation.length;

        this.totalCost -= this.allInvestigation[this.i].vatApplyAmount;

        if (this.allInvestigation[this.i].discountPer != 0) {
          this.totalCost += (this.allInvestigation[this.i].rate * this.allInvestigation[this.i].discountPer) / 100;
        }
        else {
          this.totalCost += this.allInvestigation[this.i].discountAmount;
        }


        // for (this.j = 0; this.j < this.allInvestigation[this.i].accessories.length; this.j++) {

        //   this.addedAccessories = this.addedAccessories.filter(m => m != this.allInvestigation[this.i].accessories[this.j]);
        //   this.totalCost -= this.allInvestigation[this.i].accessories[this.j].amount;

        // }
      }

    }

  }


  investigationPostFormSubmit() {


    // this.investigationPostForm.get('billNumber').setValue("bbbnn");
    // this.investigationPostForm.get('name').setValue("rifat");
    // this.investigationPostForm.get('paymentAmount').setValue("3000");
    // this.investigationPostForm.get('mobile').setValue("3000");

   // console.log("form value=" + JSON.stringify(this.investigationPostForm.value));



    if (this.investigationPostForm.valid) {

      //   this.gamilValue = this.investigationPostForm.value.gmail;
      //   this.ptientName = this.defaultSet(this.investigationPostForm.value.name);
      //   this.sex = this.defaultSet(this.investigationPostForm.value.gender);
      //   this.age = this.defaultSet(this.investigationPostForm.value.age);
      //   this.reportResult = this.defaultSet(this.investigationPostForm.value.reportText);
      //   this.investigationName = this.defaultSet(this.investigationPostForm.value.investigationName);

      this.showConfirm = true;

    }
    else {
      let key = Object.keys(this.investigationPostForm.controls);

      key.filter(data => {
        let control = this.investigationPostForm.controls[data];

        if (control.errors != null) {
          control.markAllAsTouched();
        }
      });
    }


  }

  confirmSubmit() {

    $("#lodingDiv").css({ 'height': 100 });
    $('#lodingDiv').css({ top: window.pageYOffset });
    $("#backgroundloding").css({ 'height': "100vh" });


    for (this.i = 0; this.i < this.selectedInvestigation.length; this.i++) {
      this.selectedInvestigationString += this.selectedInvestigation[this.i].name + ",";
    }

    //console.log("String=" + this.selectedInvestigationString);

    this.formdata.append('patientObject', JSON.stringify(this.investigationPostForm.value));
    this.formdata.append('selectedInvestigation', this.selectedInvestigationString);


    this.investigationRequestService.adminInvestigationRequest(this.formdata, this.providerId).subscribe(
      data => {

        // this.nextOpen();
        if (this.investigationPostForm.get('billNumber').value == null) {
          this.toasterService.Success("Success", "Bill Number is " + data);
          this.investigationPostForm.get('billNumber').setValue(data);
        }
        else {
          this.toasterService.Success("Success", "Successfully save");
        }

        $("#backgroundloding").css({ 'height': "0" });
        $("#lodingDiv").css({ 'height': 0 });
        //this.finish();
      },
      error => {
        // document.getElementsByClassName("popup")[0].classList.add("active");
        // $("#popup-info").css({ top: window.pageYOffset + 150 });
        this.toasterService.Error("Error", error.error);
        $("#backgroundloding").css({ 'height': "0" });
        $("#lodingDiv").css({ 'height': 0 });
        //this.finish();
      }
    );

 
    this.selectedInvestigationString = "";
    this.formdata.delete("patientObject");
    this.formdata.delete("selectedInvestigation");
    this.showPrintAndBill = true;
  }

  editInformation() {
    this.showConfirm = false;
  }

  newBill() {
    this.myControlRefDoctor.setValue("");
    this.showConfirm = false;
    this.showPrintAndBill = false;
    this.finish();
  }

  print() {

    var restorepage = document.body.innerHTML;
    var printDiv = document.getElementById("information-pop-up").innerHTML;
    document.body.innerHTML = printDiv;
    window.print();
    document.body.innerHTML = restorepage;

  }



  // console.log("printDiv " + (<HTMLInputElement>document.getElementById("printAble")).innerHTML);

  nextOpen() {

    $("#confirm-popup").css({ 'top': window.pageYOffset + 30 });
    $("#confirm-popup").css({ 'height': 600 });
    $("#make-space").css({ 'height': 300 });
    $("#confirm-popup").toggleClass("border-class");
  }

  finish() {

    this.totalCost = 0
    this.selectedInvestigation = [];
    this.addedAccessories = [];
    this.investigationPostForm.reset();
    // $("#confirm-popup").css({ 'height': 0 });
    // $("#make-space").css({ 'height': 0 });
    // $("#confirm-popup").toggleClass("border-class");

  }




  onselectfile(event) {
    const file = event.target.files[0];
    this.reportimage = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = event => {
      this.imageUrl = reader.result;
    };

    if (event.target.files.length != 0) {
      this.reportImageIsSelected = true;
    }

  }


  format() {
    console.log("value " + this.investigationPostForm.value.investigationName);

    this.invesgationRequest.fetchFormat(this.providerId, this.investigationPostForm.value.investigationName).subscribe(
      data => {
        this.investigationformat = data.format;
        this.sample = data.sample;
        this.referenceValue = data.referenceValue;
        console.log("data " + data);
      }
    );
  }

  nextPdfSend() {


    $("#gmail-popup").css({ 'height': 180 });
    $("#gmail-popup").toggleClass("border-class");

    $("#successfull-next-popup").css({ 'height': 0 });
    $("#successfull-next-popup").toggleClass("border-class");

  }

  pdfSend() {

    if (this.gamilValue != null && this.gamilValue != "" && this.investigationRequestId != null &&
      this.providerId != null) {

      this.investigationRequestService.sendEmailToPatient(this.investigationRequestId, this.providerId, this.gamilValue).subscribe(
        data => {
          alert("Email is successfully send");
          console.log("data  " + data);
          $("#successfull-next-popup").css({ 'height': 0 });
          $("#successfull-next-popup").toggleClass("border-class");
        },
        error => {
          console.log(error.data)
          alert("An error is occured");
          // $("#gmail-popup").css({ 'height': 0 });
          // $("#gmail-popup").toggleClass("border-class");
        }
      );


    }
    else {
      alert("Please enter gmail");
    }
  }

  close() {
    $("#successfull-next-popup").css({ 'height': 0 });
    $("#successfull-next-popup").toggleClass("border-class");
  }

  defaultSet(value) {

    if (value == null || value == "") {
      return "Not set";
    }
    return value;
    // this.age = "Not set";
    // this.sex = "Not set";
    // this.ptientName = "Not set";
    // this.reportResult = "Not set"
    // this.sample = "Not set";
    // this.referenceValue = "Not set";
  }





  public printRecord() {
    let printContents, popupWin, header, footer;
    header = '<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>';
    footer = '';

    // if(this.patientRecord.doctor.showHeaderFooter=='true'){
    //     header = this.patientRecord.doctor.header;
    //     footer = this.patientRecord.doctor.footer;
    // }
    printContents = document.getElementById('printRecord').innerHTML + footer;
    popupWin = window.open('', '_blank', 'top=100,left=5,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
          <html style="margin: 50px;">
            <head>
               <title>Patient Record</title>

                    <link rel="stylesheet" href="../assets/cssFile/print.css" 
                     >
                    <style>

                    table, td, th {
                      height: 35px;
                    }
                    
                    table {
                      width: 100%;
                      border-collapse: collapse;
                      text-align: center;
                    }

                    </style>

              </head>
               <body onload="window.print();window.close()">
                  ${printContents}
               </body>
          </html>`
    );
    popupWin.document.close();
  }


  trackIndex(index) {
    this.lastIndex = index;
  }

  // window.print();window.close() <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
  // integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">


}

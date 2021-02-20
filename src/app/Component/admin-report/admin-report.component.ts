import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { ReportResponse } from 'src/app/Model/reportResponse';
import { InvestigationRequestServiceService } from 'src/app/Service/investigation-request-service.service';
import { ToasterService } from 'src/app/Service/toaster.service';
import { map, startWith } from 'rxjs/operators';
import { LabDoctor } from 'src/app/Model/LabDoctor';
import { LabDoctorService } from 'src/app/Service/lab-doctor.service';
import { DropDownInputService } from 'src/app/Service/drop-down-input.service';
import { DropDownInput } from 'src/app/Model/DropDownInput';
import { LocalStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {

  public report: string = "<h1> i m the show off</h1>";
  selectedInvestigation = ["cc", "nn", "mm"];
  public list_report_show: boolean = false;
  public list_reportResult_show: boolean = false;
  public reportResult = "";
  public successfullShow: boolean = false;
  public billId: string;
  public showError: boolean = false;
  public investigationRequestList: ReportResponse[];
  public i: number;
  public j: number;
  public selectedIndex: number = 0;
  public selectedResultIndex: number = 0;
  public selectedPrintIndex: number = 0;
  private reportListArray: string[];
  private investigationIdListArray: number[];
  private parameterIdListArray: number[];
  public formdata = new FormData();
  private investigationRequestId: number;
  public individualInvestigationRequestId: number = 0;
  private individualInvestigationRequestReport: string;
  private isResultOrFormatShow: boolean;
  public popupMessage: string = "";
  billNumberForm: FormGroup;
  individualReportSet: FormGroup;
  public tempArray = ["ibrahim", "fslkdfakls", " laskdfa", "kkk"];
  public loadingMessage = "";
  public reportResultButtonShow: boolean[];
  private check: boolean;
  providerId: number;
  hasParameter: boolean;
  testBoolean: string = "null";
  inputValue: string;
  reportListString: string;
  paramOrParameterShow: boolean = true;
  paramOrParameterResultShow: boolean = true;
  selectedParamGroupIndex: number = 0;
  selectedInvestigationIndex: number = 0;
  dropDownArray: string[];
  public idTrack: number;
  public testBooleanlast = false;
  public numberTrack: number = 0;
  public currentRowSelect: number = 0;

  labDoctorName: string[];
  filteredOptions: Observable<Object[]>;
  myControl = new FormControl();

  editorStyle = {
    height: '300px'
  };


  constructor(private elementRef: ElementRef,
    private investigationRequestService: InvestigationRequestServiceService,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private _avtivatedRoute: ActivatedRoute,
    private labDoctorService: LabDoctorService,
    private dropDownInputService: DropDownInputService,
    private router: Router,
    private localStoregeService: LocalStorageService) {

    this.billNumberForm = formBuilder.group({
      'billNumber': [null, Validators.required]
    });

    this.individualReportSet = formBuilder.group({
      'report': [null, Validators.required]
    });

  }




  ngOnInit(): void {

    this.reportListArray = new Array<string>();
    this.investigationIdListArray = new Array<number>();
    this.parameterIdListArray = new Array<number>();
    this.reportResultButtonShow = new Array<boolean>();
    this.dropDownArray = new Array<string>();
    this.labDoctorName = new Array<string>();

    

    this.providerId = this.localStoregeService.retrieve("providerId");
    if (this.providerId == null) {
      this.router.navigate(['/']);
    }


    this.labDoctorService.fetchLabDoctor(this.providerId).subscribe(
      data => {

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


    this.dropDownInputService.fetchDropDownInput().subscribe(
      data => {

        for (this.i = 0; this.i < data.length; this.i++) {
          this.dropDownArray[this.i] = data[this.i].value;
        }
      },
      error => {
      }
    );


    document.getElementById("dismiss-popup-btn").addEventListener("click", function () {
      document.getElementsByClassName("popup")[0].classList.remove("active");
    });




    $(document).ready(function () {




      $("#list-report-popup-close").click(function () {
        $("#list-report-popup").css({ 'height': 0 });
        $("#list-report-popup").toggleClass("border-class");
      });


      $("#individual-report-print-popup-close").click(function () {
        $("#individual-report-print-popup").css({ 'height': 0 });
        $("#individual-report-print-popup").toggleClass("border-class");
      });

      $('#param-group-popup').on('click', '#param-group-popup-close', function (e) {

        $("#param-group-popup").css({ 'height': 0 });
        $("#param-group-popup").toggleClass("border-class");

      });

      $('#param-group-report-popup').on('click', '#param-group-report-popup-close', function (e) {

        $("#param-group-report-popup").css({ 'height': 0 });
        $("#param-group-report-popup").toggleClass("border-class");

      });

      $("#individualreport-popup-close").click(function () {
        $("#individualreport-popup").css({ 'height': 0 });
        $("#individualreport-popup").toggleClass("border-class");
      });

      $("#list-report-result-popup-close").click(function () {
        $("#list-report-result-popup").css({ 'height': 0 });
        $("#list-report-result-popup").toggleClass("border-class");
      });


      $('#individual-report-input-contain div').css("font-size", "14px");


      $("#report-set-popup-close").click(function () {
        $("#report-set-popup").css({ 'height': 0 });
        $("#report-set-popup").toggleClass("border-class");
      });

      $("#pop-up-report-table").click(function () {
        console.log("table");
      });


      $('#list-report-result-popup-close').on('click', '#list-report-result-popup-close', function (e) {

        $("#list-report-result-popup").css({ 'height': 0 });
        $("#list-report-result-popup").toggleClass("border-class");

      });



      // $('#list-report-popup').on('keydown', 'input', function (e) {

      //   if (e.keyCode == 13) {
      //     var index = $("input[type='text']").index(this);
      //     $("input[type='text']").eq(index + 1).focus();
      //     e.preventDefault();
      //   }

      // });


      $('#list-report-popup').on('keydown', '.list-investigation-input', function (e) {

        if (e.keyCode == 13) {
          var index = $(".list-investigation-input").index(this);
          $(".list-investigation-input").eq(index + 1).focus();
          e.preventDefault();
        }

      });

      $("#param-group-popup").on('keydown', '.input-option', function (e) {

        if (e.keyCode == 13) {
          var index = $(".input-option").index(this);
          $(".input-option").eq(index + 1).focus();
          e.preventDefault();
        }

      });

    });


    var index = 1;
    document.onkeydown = checkKey;

    function checkKey(e) {

      e = e || window.event;

      if (e.keyCode == '38') {


        //this.Up();
        // upNdown("up");

      }
      else if (e.keyCode == '40') {
        //upNdown("down");

        //console.log("current" + this.currentRowSelect);

      }
      else if (e.keyCode == '37') {
        var table = document.getElementById("table") as HTMLTableElement;
        table.blur();
      }
      else if (e.keyCode == '39') {
        var table = document.getElementById("table") as HTMLTableElement;
        table.focus();
      }

      else if (e.keyCode == '13') {
        //alert(index);
      }

    }




    function getSelectedRow() {
      //  alert("javascript");
      // var table = document.getElementById("table") as HTMLTableElement;
      // table.focus();
      // this.selectRow();
      //table.rows[index].classList.toggle("selected");

      // for (var i = 1; i < table.rows.length; i++) {
      //   table.rows[i].onclick = function () {
      //     // clear the selected from the previous selected row
      //     // the first time index is undefined
      //     if (typeof index !== "undefined") {
      //       table.rows[index].classList.toggle("selected");
      //     }

      //     index = table.rows[i].rowIndex;
      //     table.rows[i].classList.toggle("selected");

      //   };
      // }

    }


    


    function upNdown(direction) {
      var tabletemp = document.getElementById("table") as HTMLTableElement;
      var rows = tabletemp.rows,
        parent = rows[index].parentNode;
      if (direction === "up") {
        if (index > 1) {
          parent.insertBefore(rows[index], rows[index - 1]);
          // when the row go up the index will be equal to index - 1
          index--;
        }
      }

      if (direction === "down") {
        if (index < rows.length - 1) {
          parent.insertBefore(rows[index + 1], rows[index]);
          // when the row go down the index will be equal to index + 1
          index++;
        }
      }
    }

  }

  selectRow(index) {

    this.currentRowSelect = index;
    var table = document.getElementById("table") as HTMLTableElement;
    for (var i = 1; i < table.rows.length; i++) {
      // 
      table.rows[i].blur();
    }

    table.rows[index].focus();
    console.log("current index ==" + this.currentRowSelect);

  }

  UpAndDown(event: any) {

    if (event.keyCode == 38 && this.currentRowSelect > 1) {
      var table = document.getElementById("table") as HTMLTableElement;
      for (var i = 1; i < table.rows.length; i++) {

        table.rows[i].blur();

      }

      console.log("current index ==" + this.currentRowSelect);
      this.currentRowSelect--;

      var ii = this.currentRowSelect;
      table.rows[ii].focus();
      console.log("current index ==" + this.currentRowSelect + " " + ii);

    }
    else if (event.keyCode == 40 && this.currentRowSelect < this.investigationRequestList.length) {
      var table = document.getElementById("table") as HTMLTableElement;
      for (var i = 1; i < table.rows.length; i++) {

        table.rows[i].blur();

      }

      console.log("current index ==" + this.currentRowSelect);
      this.currentRowSelect++;

      var ii = this.currentRowSelect;
      table.rows[ii].focus();
    }
    else if (event.keyCode == 13) {
      this.showInvestigation(this.currentRowSelect-1);
    }


  }


  returnFocusToCurrentRow(){
    var table = document.getElementById("table") as HTMLTableElement;
    for (var i = 1; i < table.rows.length; i++) {

      table.rows[i].blur();

    }

    console.log("current index ==" + this.currentRowSelect);

    var ii = this.currentRowSelect;
    table.rows[ii].focus();
  }

  move(event: any) {
    console.log("enter button==" + event.keyCode);
  }

  private _filter(value: String): Object[] {

    const filterValue = value.toLowerCase();
    return this.labDoctorName.filter(option => option.toLowerCase().includes(filterValue));
  }

  temp() {




    // for (this.i = 0; this.i < this.investigationRequestList.length; this.i++) {
    //   //console.log(this.investigationRequestList[this.i].department + " " + this.investigationRequestList[this.i].type);
    //   for (this.j = 0; this.j < this.investigationRequestList[this.i].requestList.length; this.j++) {

    //     // console.log("investigation " + this.j + " " + 
    //     //   this.investigationRequestList[this.i].requestList[this.j].investigationName);

    //   }

    // }
  }

  selectedLAbDoctor(selected) {

  }

  showInvestigation(index) {


    if ($("#list-report-popup").height() < 10) {

      this.selectedIndex = index;
      if (this.investigationRequestList[index].type == "List") {
        this.list_report_show = true;
      }
      else {
        this.list_report_show = false;
      }

      // console.log(" this.selectedIndex " + this.selectedIndex + " " + this.list_report_show + " " +
      //   this.investigationRequestList[index].type);

      this.openpopup();
    }
  }

  showInvestigationReport(index) {

    //cheking list-report-result-popup is not open
    if ($("#list-report-result-popup").height() < 10) {
      this.selectedResultIndex = index;
      if (this.investigationRequestList[index].type == "List") {
        this.list_reportResult_show = true;
      }
      else {
        this.list_reportResult_show = false;
      }

      // console.log(" this.selectedResultIndex " + this.selectedResultIndex + " " + this.list_reportResult_show + " " +
      //   this.investigationRequestList[index].type);

      this.openReportResultPopup();
    }
  }


  saveReportResult() {

    this.reportListString = "";

    for (this.i = 0; this.i < this.investigationRequestList[this.selectedIndex].requestList.length; this.i++) {

      this.investigationIdListArray.push(this.investigationRequestList[this.selectedIndex].requestList[this.i].investigationRequestId);
      this.inputValue = (<HTMLInputElement>document.getElementById("list-input-" + this.i)).value;

      if (!this.inputValue.trim().length) {
        this.reportListArray.push(null);
        this.reportListString += this.reportListArray[this.i] + ",";
      }
      else {
        this.reportListArray.push(this.inputValue);
        this.reportListString += this.reportListArray[this.i] + ",";
      }
    }

    // for (this.i = 0; this.i < this.reportListArray.length; this.i++) {
    //   this.reportListString += this.reportListArray[this.i] + ",";
    //   console.log("result=" + this.reportListArray[this.i]  +"=");
    // }




    this.loadingOpen("saving");

    console.log("reportListString=" + this.reportListString);
    console.log(this.investigationIdListArray.toString());
    //console.log(this.reportListArray.toString());

    this.formdata.append('reportResult', this.reportListString);
    this.formdata.append('investigationResuestId', this.investigationIdListArray.toString());
    this.formdata.append('labDoctorName', this.myControl.value);

    // this.assignreportResult();
    // this.clearValue();

    this.investigationRequestService.setReport(this.formdata, this.providerId).subscribe(data => {
      console.log("data updated successfully ");
      this.loadingClose();
      this.toasterService.Success("Success", "Successfully Updated");
      this.assignreportResult();
      this.clearValue();
    }, error => {
      //this.popUpMessageOpen("An error is occured", false);
      this.toasterService.Error("Error", "An error is occured");
      this.clearValue();
      this.loadingClose();
    });

    $("#list-report-popup").css({ 'height': 0 });
    $("#list-report-popup").toggleClass("border-class");


  }


  assignreportResult() {
    for (this.i = 0; this.i < this.investigationRequestList[this.selectedIndex].requestList.length; this.i++) {
      this.investigationRequestList[this.selectedIndex].requestList[this.i].reportResult = this.reportListArray[this.i];
    }
    this.updateValue();
  }



  individualInvestigationReportOpen(individualId) {
    this.individualInvestigationRequestId = individualId;


    if (this.investigationRequestList[this.selectedIndex].type == "Parameter") {

      // console.log("this.individualInvestigationRequestId ===== " + this.individualInvestigationRequestId);
      // console.log("this.selectedIndex ===== " + this.selectedIndex);
      $("#param-group-popup").css({ 'top': window.pageYOffset + 40 });
      $("#param-group-popup").css({ 'height': 550 });
      $("#param-group-popup").toggleClass("border-class");
    }
    else {

      // console.log("individual " + this.investigationRequestList[this.selectedIndex].type);


      this.investigationRequestId =
        this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].investigationRequestId;

      this.isResultOrFormatShow = this.investigationRequestList[this.selectedIndex].
        requestList[this.individualInvestigationRequestId].reportResult != null && this.investigationRequestList[this.selectedIndex].
          requestList[this.individualInvestigationRequestId].reportResult != "";
      // console.log("isResultOrFormatShow " + this.isResultOrFormatShow);

      if (this.isResultOrFormatShow) {

        this.individualReportSet.get("report").setValue(this.investigationRequestList[this.selectedIndex].
          requestList[this.individualInvestigationRequestId].reportResult);
        // $('#individual-report-input-contain').html(this.investigationRequestList[this.selectedIndex].
        //   requestList[this.individualInvestigationRequestId].reportResult);

      }
      else {
        this.individualReportSet.get("report").setValue(this.investigationRequestList[this.selectedIndex].
          requestList[this.individualInvestigationRequestId].format);
        // $('#individual-report-input-contain').html(this.investigationRequestList[this.selectedIndex].
        //   requestList[this.individualInvestigationRequestId].format);
      }


      $("#individual-report-input-contain div").css({ 'font-size': 15 });
      var individual = $('#individual-report-input-contain div');
      individual.css("font-size", "14px");


      $("#report-set-popup").css({ 'top': window.pageYOffset + 40 });
      $("#report-set-popup").css({ 'height': 570 });
      $("#report-set-popup").toggleClass("border-class");

    }

  }



  individualInvestigationReportResultOpen(individualId) {


    if (this.investigationRequestList[this.selectedResultIndex].type == "Parameter") {

      this.individualInvestigationRequestId = individualId;

      $("#param-group-report-popup").css({ 'top': window.pageYOffset + 40 });
      $("#param-group-report-popup").css({ 'height': 550 });
      $("#param-group-report-popup").toggleClass("border-class");

    }
    else {
      //console.log(individualId + " " + this.selectedResultIndex);

      $('#individual-report-result-input-contain').html(this.investigationRequestList[this.selectedResultIndex].
        requestList[individualId].reportResult);



      $("#individual-report-result-input-contain div").css({ 'font-size': 15 });
      var individual = $('#individual-report-result-input-contain div');
      individual.css("font-size", "14px");


      $("#individualreport-popup").css({ 'top': window.pageYOffset + 40 });
      $("#individualreport-popup").css({ 'height': 550 });
      $("#individualreport-popup").toggleClass("border-class");
    }
  }



  setIndividualReport() {


    // this.loadingOpen("saving");

    // // console.log($('#individual-report-input-contain').html());
    // this.individualInvestigationRequestReport = $('#individual-report-input-contain').html();

    this.individualInvestigationRequestReport = this.individualReportSet.get("report").value;


    this.formdata.append('reportResult', this.individualReportSet.get("report").value);
    this.formdata.append('investigationResuestId', this.investigationRequestId.toString());
    this.formdata.append('labDoctorName', this.myControl.value);


    console.log(this.formdata.get("reportResult"));
    console.log(this.formdata.get("investigationResuestId"));
    console.log(this.formdata.get("labDoctorName"));

    this.investigationRequestService.setReport(this.formdata, this.providerId).subscribe(data => {
      console.log("data updated successfully ");

      this.loadingClose();
      this.toasterService.Success("Success", "Successfully Updated");
      this.AssignIndivudualReport();
      this.clearValue();
    }, error => {
      this.toasterService.Error("Error", "An error is occured");
      this.loadingClose();
      this.clearValue();
    });

    $("#report-set-popup").css({ 'height': 0 });
    $("#report-set-popup").toggleClass("border-class");




  }

  AssignIndivudualReport() {
    this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].reportResult =
      this.individualInvestigationRequestReport;
    this.updateValue();
  }

  clearValue() {
    this.parameterIdListArray = [];
    this.investigationIdListArray = [];
    this.reportListArray = [];
    this.myControl.setValue("");
    this.formdata.delete("reportResult");
    this.formdata.delete("investigationResuestId");
    this.formdata.delete("resultList");
    this.formdata.delete("parameterIdList");
    this.formdata.delete("labDoctorName");
  }

  openpopup() {
    $("#list-report-popup").css({ 'top': window.pageYOffset + 40 });
    $("#list-report-popup").css({ 'height': 550 });
    $("#list-report-popup").toggleClass("border-class");
  }

  openReportResultPopup() {
    $("#list-report-result-popup").css({ 'top': window.pageYOffset + 40 });
    $("#list-report-result-popup").css({ 'height': 550 });
    $("#list-report-result-popup").toggleClass("border-class");
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#EDF1F6';
  }


  billNumberSubmit(form: NgForm) {

    this.selectedIndex = 0;

    if (!this.billNumberForm.valid || this.billNumberForm.valid) {

      this.loadingOpen("loading");
      this.reportResultButtonShow = [];


      this.investigationRequestService.fetchinvestigationRequestbyBillid(this.billNumberForm.value.billNumber, this.providerId).
        subscribe(data => {
          this.investigationRequestList = data;
          this.loadingClose();


          // this.testBooleanlast = true;
          // for (this.i=0; this.i < this.investigationRequestList.length; this.i++){

          //   //console.log("test =" + this.investigationRequestList[0].requestList[this.i].reportResult + "=");
          //   for (this.j=0; this.j < this.investigationRequestList[this.i].requestList.length; this.j++){

          //     if(this.investigationRequestList[this.i].requestList[this.j].paramGroupList.length != 0){
          //       console.log("investigationRID==" + this.investigationRequestList[this.i].requestList[this.j].investigationRequestId);
          //       console.log("name== " + this.investigationRequestList[this.i].requestList[this.j].paramGroupList[0].name);
          //     }
          //     else{
          //       console.log("zero==" + this.investigationRequestList[this.i].requestList[this.j].paramGroupList[0]);
          //     }

          //   }


          // }


          if (this.investigationRequestList.length <= 0) {
            this.popUpMessageOpen("No record found", false);
          }
          else {

            this.updateValue();

            setTimeout(() => { 

              var table = document.getElementById("table") as HTMLTableElement;
            console.log("row==" + table);
            for (var i = 1; i < table.rows.length; i++) {
      
              table.rows[i].blur();
      
            }
      
             this.currentRowSelect = 1;
            var tt = 1;
             table.rows[tt].focus();
              
             }, 100);

            
            // console.log("current index from service==" + this.currentRowSelect);
            
          }

        },
          error => {
            this.loadingClose();
            this.toasterService.Error("Error", "An error is occured");
          });

    }
    else {
      let key = Object.keys(this.billNumberForm.controls);

      key.filter(data => {
        let control = this.billNumberForm.controls[data];

        if (control.errors != null) {
          control.markAllAsTouched();
        }
      });
    }

  }

  popUpMessageOpen(message, check) {
    this.popupMessage = message;
    document.getElementsByClassName("popup")[0].classList.add("active");
  }

  loadingOpen(loadingMessage) {

    this.loadingMessage = loadingMessage;
    $("#lodingDiv").css({ 'height': 100 });
    $('#lodingDiv').css({ top: window.pageYOffset + 180 });
    $("#backgroundloding").css({ 'height': "100vh" });

  }

  loadingClose() {

    $("#lodingDiv").css({ 'height': 0 });
    $("#backgroundloding").css({ 'height': "0" });

  }

  updateValue() {

    for (this.i = 0; this.i < this.investigationRequestList.length; this.i++) {

      this.check = false;
      for (this.j = 0; this.j < this.investigationRequestList[this.i].requestList.length; this.j++) {

        if (this.investigationRequestList[this.i].requestList[this.j].reportResult != null &&
          this.investigationRequestList[this.i].requestList[this.j].reportResult.length > 0) {
          this.reportResultButtonShow[this.i] = true;
          this.check = true;
          break;
        }

      }


      if (!this.check) {
        this.reportResultButtonShow[this.i] = false;
      }
    }

  }

  printInvestigation(departmentName, type, index) {

    this.selectedPrintIndex = index;
    console.log(" index=" + this.selectedPrintIndex);
    if (type == "List") {
      this.printFunction(departmentName, 1);
    }
    else {
      $("#individual-report-print-popup").css({ 'top': window.pageYOffset + 100 });
      $("#individual-report-print-popup").css({ 'height': 400 });
      $("#individual-report-print-popup").toggleClass("border-class");
    }
  }

  printFunction(departmentName, investigationRequestId) {


    this.investigationRequestService.fetchPdf(departmentName, investigationRequestId, this.billNumberForm.value.billNumber, this.providerId).subscribe(x => {

      var file = new Blob([x], { type: 'application/pdf' })
      var fileURL = URL.createObjectURL(file);

      const url= window.URL.createObjectURL(file);
      window.open(url);

      // var a = document.createElement('a');
      // //a.target = "_blank";
      // a.href = fileURL;

      // a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));

      // setTimeout(function () {
      //   window.URL.revokeObjectURL(fileURL);
      //   a.remove();
      // }, 100);

    },
      (error) => {
        console.log('getPDF error: ', error);
        console.error(`Error: ${error.message}`);
      }
    );


  }


  deleteReportResult() {

    this.loadingOpen("loading");

    if (this.investigationRequestList[this.selectedIndex].type == "List") {

      this.loadingOpen("loading");
      this.reportResultButtonShow = [];


      this.investigationRequestService.deleteReport(1, this.investigationRequestList[this.selectedIndex].department,
        this.billNumberForm.value.billNumber, this.providerId).
        subscribe(data => {

          for (this.j = 0; this.j < this.investigationRequestList[this.selectedIndex].requestList.length; this.j++) {
            this.investigationRequestList[this.selectedIndex].requestList[this.j].reportResult = null;
          }

          this.updateValue();
          this.toasterService.Success("Success", "Successfully deleted");
          this.loadingClose();
        }, error => {
          this.loadingClose();
          this.toasterService.Error("Error", "An error is occured");
        });

    }

    else if (this.investigationRequestList[this.selectedIndex].type == "Individual") {

      this.investigationRequestId =
        this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].investigationRequestId;

      this.investigationRequestService.deleteReport(this.investigationRequestId, this.investigationRequestList[this.selectedIndex].department,
        this.billNumberForm.value.billNumber, this.providerId).
        subscribe(data => {

          this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].reportResult = null;

          this.updateValue();
          this.toasterService.Success("Success", "Successfully deleted");
          this.loadingClose();
        }, error => {
          this.loadingClose();
          this.toasterService.Error("Error", "An error is occured");
        });


    }

    else if (this.investigationRequestList[this.selectedIndex].type == "Parameter") {

      this.investigationRequestId =
        this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].investigationRequestId;



      this.investigationRequestService.deleteReport(this.investigationRequestId, this.investigationRequestList[this.selectedIndex].department,
        this.billNumberForm.value.billNumber, this.providerId).
        subscribe(data => {

          this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].reportResult = null;

          for (this.i = 0; this.i < this.investigationRequestList[this.selectedIndex].
            requestList[this.individualInvestigationRequestId].paramGroupList.length; this.i++) {

            for (this.j = 0; this.j < this.investigationRequestList[this.selectedIndex].
              requestList[this.individualInvestigationRequestId].paramGroupList[this.i].parameters.length; this.j++) {
              this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].
                paramGroupList[this.i].parameters[this.j].reportResult = null;
            }

          }

          this.updateValue();
          this.toasterService.Success("Success", "Successfully deleted");
          this.loadingClose();

        }, error => {
          this.loadingClose();
          this.toasterService.Error("Error", "An error is occured");
        });

    }

 
  }

  openParameter(paramGroupIndex) {
    // console.log(this.selectedIndex + "   " + paramGroupIndex +  ' ' + this.individualInvestigationRequestId);
    // console.log(this.investigationRequestList[this.selectedIndex]
    //   .requestList[this.individualInvestigationRequestId].paramGroupList[this.selectedParamGroupIndex].parameters);

    this.paramOrParameterShow = false;
    this.selectedParamGroupIndex = paramGroupIndex;

  }


  openParameterResult(paramGroupIndex) {
    // console.log(this.selectedIndex + "   " + paramGroupIndex +  ' ' + this.individualInvestigationRequestId);
    // console.log(this.investigationRequestList[this.selectedIndex]
    //   .requestList[this.individualInvestigationRequestId].paramGroupList[this.selectedParamGroupIndex].parameters);

    this.paramOrParameterResultShow = false;
    this.selectedParamGroupIndex = paramGroupIndex;

  }

  saveParameterResult() {
    this.paramOrParameterShow = true;


    //this.loadingOpen("saving");
    this.reportListString = "";
    this.reportListArray = [];
    this.idTrack = 0;


    for (this.j = 0; this.j < this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].paramGroupList.length; this.j++) {


      for (this.i = 0; this.i < this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].paramGroupList[this.j].parameters.length; this.i++) {


        this.parameterIdListArray.push(this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].paramGroupList[this.j].parameters[this.i].id);
        this.inputValue = (<HTMLInputElement>document.getElementById("parameter-input-" + this.j + "-" + this.i)).value;

        //this.inputValue = " asdlf ";


        console.log(" parameter-input-" + this.j + "-" + this.i + "  " + this.inputValue + " " + this.idTrack);

        if (!this.inputValue.trim().length) {
          this.reportListArray.push(null);
          this.reportListString += this.reportListArray[this.idTrack] + ",";
        }
        else {
          this.reportListArray.push(this.inputValue);
          this.reportListString += this.reportListArray[this.idTrack] + ",";
        }

        this.idTrack++;

      }
    }

    this.investigationRequestId =
      this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].investigationRequestId;



    this.loadingOpen("saving");

    console.log("reportListString=" + this.reportListString);
    console.log(this.parameterIdListArray.toString());
    console.log(this.investigationRequestId);
    console.log(this.myControl.value);






    this.formdata.append('resultList', this.reportListString);
    this.formdata.append('parameterIdList', this.parameterIdListArray.toString());
    this.formdata.append('labDoctorName', this.myControl.value);

    this.assignParameterReportResult();

    this.investigationRequestService.setParameterReport(this.formdata, this.investigationRequestId).subscribe(data => {
      console.log("data updated successfully ");
      this.loadingClose();
      this.toasterService.Success("Success", "Successfully Updated");
      this.assignParameterReportResult();
      this.clearValue();
    }, error => {
      this.toasterService.Error("Error", "An error is occured");
      this.clearValue();
      this.loadingClose();
    });


  }

  assignParameterReportResult() {

    this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].reportResult = "set";

    this.numberTrack = 0;
    for (this.i = 0; this.i < this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].paramGroupList.length; this.i++) {

      for (this.j = 0; this.j < this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].paramGroupList[this.i].parameters.length; this.j++) {

        this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].paramGroupList[this.i].parameters[this.j].reportResult = this.reportListArray[this.numberTrack];
        this.numberTrack++;

      }

    }

    this.updateValue();

  }

  backParameter() {
    this.paramOrParameterResultShow = true;
  }

  assignLabDoctor() {

    // this.loadingOpen("saving");
    this.formdata.append('labDoctorName', this.myControl.value);
    //this.formdata.append('labdoctor', this.myControl.value);
    this.investigationRequestId =
      this.investigationRequestList[this.selectedIndex].requestList[this.individualInvestigationRequestId].investigationRequestId;


    this.labDoctorService.assignLabDoctor(this.formdata, this.investigationRequestId).subscribe(data => {
      console.log("Successfully save");
      this.toasterService.Success("Success", "Successfully saved");
      this.formdata.delete("labDoctorName");
      this.loadingClose();
    }, error => {
      this.toasterService.Error("Error", "An error is occured");
      this.formdata.delete("labDoctorName");
      this.loadingClose();
    });


    //console.log("Name=" + this.myControl.value);
  }

}

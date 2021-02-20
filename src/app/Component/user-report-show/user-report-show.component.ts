import { Component, OnInit } from '@angular/core';
import { InvestigationRequestServiceService } from 'src/app/Service/investigation-request-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import * as $ from 'jquery';
import { ReportResponse } from 'src/app/Model/reportResponse';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-report-show',
  templateUrl: './user-report-show.component.html',
  styleUrls: ['./user-report-show.component.css']
})
export class UserReportShowComponent implements OnInit {

  billNumber: string = "";
  hasParameter: boolean;
  providerId: number;
  showTable: boolean = false;
  public userReportList: any = [];
  public investigationRequestList: ReportResponse[];
  billNumberForm: FormGroup;
  public message: string = "";
  i : number = 0;

  constructor(private investigationRequestService: InvestigationRequestServiceService,
    private _avtivatedRoute: ActivatedRoute,
    private localStoregeService: LocalStorageService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.billNumberForm = formBuilder.group({
      'billNumber': [null, Validators.required],
      'mobile': [null, Validators.required],
    });
  }

  ngOnInit(): void {

    this.hasParameter = this._avtivatedRoute.snapshot.paramMap.has('providerId');


    if (this.hasParameter) {

      this.providerId = parseInt(this._avtivatedRoute.snapshot.paramMap.get("providerId"));

    }



    document.getElementById("dismiss-popup-btn").addEventListener("click", function () {
      document.getElementsByClassName("popup")[0].classList.remove("active");
    });


    $(document).ready(function () {

      $("#gmail-popup-close").click(function () {
        $("#gmail-popup").css({ 'height': 0 });
        $("#gmail-popup").toggleClass("border-class");
      });

      $("#gmail-popup").on('keydown', '.input--style-5', function (e) {
  
        if (e.keyCode == 13) {
          var index = $(".input--style-5").index(this);
          $(".input--style-5").eq(index + 1).focus();
          console.log("click is call " + (index + 1));
          e.preventDefault();
        }
        
      });

    });




  }


  billNumberSubmit(form: NgForm) {

    if (this.billNumberForm.valid) {

      this.investigationRequestService.fetchinvestigationRequestToUserbyBillid(this.billNumberForm.value.billNumber, this.billNumberForm.value.mobile, this.providerId).subscribe(
        data => {
          this.investigationRequestList = data;

          // for(this.i = 0; this.i < this.investigationRequestList[1].requestList.length; this.i++ ){
          //   console.log("value =" + this.investigationRequestList[1].requestList[this.i].investigationName);
          // }

          if (data.length == 0) {
            this.openMessagePopup("No records is found");
          }
          else {
            $("#gmail-popup").css({ 'height': 0 });
            $("#gmail-popup").toggleClass("border-class");
            this.showTable = true;
          }

        },
        error => {
          this.openMessagePopup("An error is occured");
        }
      );

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


  downloadPdf(departmentName, investigationRequestId) {

    console.log(departmentName + " " + investigationRequestId + "  bill=" +
      this.billNumberForm.value.billNumber);


    this.investigationRequestService.fetchPdf(departmentName, investigationRequestId, this.billNumberForm.value.billNumber, this.providerId).subscribe(x => {

      var file = new Blob([x], { type: 'application/pdf' })
      var fileURL = URL.createObjectURL(file);

      var a = document.createElement('a');
      a.href = fileURL;

      a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        window.URL.revokeObjectURL(fileURL);
        a.remove();
      }, 100);

    },
      (error) => {
        console.log('getPDF error: ', error);
      }
    );


    // document.getElementsByClassName("popup")[0].classList.add("active");

  }

  downloadReportImage() {

    this.investigationRequestService.fetchimagereportDownload().subscribe(x => {

      var file = new Blob([x], { type: 'image/jpg' });
      console.log("file " + file);
      var fileURL = URL.createObjectURL(file);
      console.log("file " + fileURL);

      var a = document.createElement('a');
      a.href = fileURL;
      // a.download = 'testreportdd.pdf';


      // a.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));

      // setTimeout(function () {
      //   window.URL.revokeObjectURL(fileURL);
      //   a.remove();
      // }, 100);

    },
      (error) => {
        console.log('getPDF error: ', error);
      }
    );

  }


  sendBillNumber() {

    console.log("bill " + this.billNumber);

    if (this.billNumber != "") {

      $("#gmail-popup").css({ 'height': 0 });
      $("#gmail-popup").toggleClass("border-class");

      this.investigationRequestService.fetchinvestigationRequestToUserbyBillid(this.billNumber, 'cc',  this.providerId).subscribe(
        data => {
          this.investigationRequestList = data;
          console.log("length= " + this.investigationRequestList.length);
          if (data.length == 0) {
            alert("No report is found");
          }
          this.showTable = true;
        },
        error => {
          alert("An error is occured ");
        }
      );


      this.billNumber = "";
    }
    else {
      alert("Please enter your mobile number");

    }


    // this.localStoregeService.store("hiddenHeader", false); 01907503730
    // this.localStoregeService.store('providerId', this.providerId);
    // this.router.navigate(['/userreportlist']);
  }

  openMessagePopup(message) {
    this.message = message;
    document.getElementsByClassName("popup")[0].classList.add("active");
  }

}

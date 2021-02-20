import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InvestigationRequestServiceService } from 'src/app/Service/investigation-request-service.service';
import { LocalStorageService } from 'ngx-webstorage';
import { BillingService } from 'src/app/Service/billing.service';
import { InvestigationRequest } from 'src/app/Model/investigationRequest';
import { Patient } from 'src/app/Model/Patient';
import { BillAndInvestigationRequest } from 'src/app/Model/BillAndInvestigationRequest';
import { InteractionService } from 'src/app/Service/interaction.service';
import { InvestigationRequestUpdate } from 'src/app/Model/investigationRequestUpdate';
import { AllInvestigationRequestEntityContainer } from 'src/app/Model/AllInvestigationRequestEntityContainer';
import { ToasterService } from 'src/app/Service/toaster.service';
import { PatientService } from 'src/app/Service/patient.service';


@Component({
  selector: 'app-user-investigation-request',
  templateUrl: './user-investigation-request.component.html',
  styleUrls: ['./user-investigation-request.component.css']
})
export class UserInvestigationRequestComponent implements OnInit {


  hospitalTitle: string;
  hospitalImage: string = "../assets/medicalCollage/" + 1 + ".jpg";

  medicalName: string[] = ['Khulna Medical Hospital', 'Shaheed Sheikh Abu Naser Specialised Hospital',
    'Khulna City Hospital', 'Islami Bank Hospital Khulna', 'Khulna Shishu Hospital', 'Gazi Medical College and Hospital']


  billForm: FormGroup;
  reportForm: FormGroup;
  public reportimage: any = File;
  public formdata = new FormData();
  public investigationRequestId;
  hasParameter: boolean;
  providerId: number;
  ptientId: string;
  public investigationRequest: any = [];
  public popUpInvestigationRequest: any = [];
  public billAndInvestigationRequest: any = [];
  public billing: any = [];
  public paid: any = [];
  public referenceId: any = [];
  private billPatientId;
  public reportText: string = "";
  public reportImage: string = "";
  public extension: string = "";
  public success: boolean = false;
  public message: string = "";
  public format: string = "";
  imageSize: number;
  selectedImage: boolean = false;
  investigationRequestPost: InvestigationRequestUpdate = {
    reportText: "",
    status: ""
  };




  public patientList: any = [];
  private i: number;
  private j: number;
  private k: number;
  private hasValue: boolean;
  public totalBill: any = [];
  public selectedIndex: number = 0;
  public selectedBillNumber: string;
  public loadingMessage: string = "loading";

  public investigationRequestList: AllInvestigationRequestEntityContainer[];

  public patient: Patient = {
    id: 1,
    "name": "",
    "mobile": "10",
    "age": "10",
    "sampleCollection": "10",
    "appointmentDate": "10",
    "nid": "10",
    "gender": "10",
    "email": "10",
    "address": "10"
  };

  constructor(private router: Router,
    private requestService: InvestigationRequestServiceService,
    private _avtivatedRoute: ActivatedRoute,
    private localStoregeService: LocalStorageService,
    private formBuilder: FormBuilder,
    private investigationRequestService: InvestigationRequestServiceService,
    private billingService: BillingService,
    private interactionService: InteractionService,
    private toasterService: ToasterService,
    private patientService: PatientService) {

    this.reportForm = formBuilder.group({
      'reportText': [null, Validators.required],
      'status': [null],
      'reportImage': [null, Validators.required]
    });

    this.billForm = formBuilder.group({
      'paymentAmount': [null, Validators.required]
    });
  }

  ngOnInit(): void {

    $(document).ready(function () {

      document.getElementById("dismiss-popup-btn").addEventListener("click", function () {
        document.getElementsByClassName("popup")[0].classList.remove("active");
      });

      $("#payment-popup-close").click(function () {
        $("#payment-popup").css({ 'height': 0 });
        $("#payment-popup").toggleClass("border-class");
      });

      $("#investigation-request-list-popup-close").click(function () {
        $("#investigation-request-list-popup").css({ 'height': 0 });
        $("#investigation-request-list-popup").toggleClass("border-class");
      });

      $("#report-form-popup-close").click(function () {
        $("#report-form-popup").css({ 'height': 0 });
        $("#report-form-popup").toggleClass("border-class");
      });

      $("#bill-form-popup-close").click(function () {
        $("#bill-form-popup").css({ 'height': 0 });
        $("#bill-form-popup").toggleClass("border-class");
      });

      $("#report-info-popup-close").click(function () {
        $("#report-info-popup").css({ 'height': 0 });
        $("#report-info-popup").toggleClass("border-class");
      });


    });

    this.hasParameter = this._avtivatedRoute.snapshot.paramMap.has('providerId');

    this.loadingOpen("loading")
    if (this.hasParameter) {
      this.providerId = parseInt(this._avtivatedRoute.snapshot.paramMap.get("providerId"));

      this.localStoregeService.store("providerId", this.providerId);
      // this.investigationRequestService.fetchinvestigationRequestByOnlyProviderId(this.providerId).
      //   subscribe(data => {

      //     this.investigationRequestList = data;;
      //     // this.loadingClose();

      //   },
      //     error => {
      //       //this.toasterService.Error("Error", "An error is occured");
      //     });
    }
    else{
      this.router.navigate(['/']);
    }

    this.loadingClose();
  }



  OpenInvestigationRequestList(index) {
    this.selectedIndex = index;
    $("#investigation-request-list-popup").css({ 'top': window.pageYOffset + 280 });
    $("#investigation-request-list-popup").css({ 'height': 300 });
    $("#investigation-request-list-popup").toggleClass("border-class");
  }

  billFormPopUp(billNumber) {
    this.selectedBillNumber = billNumber;

    $("#payment-popup").css({ 'top': window.pageYOffset + 220 });
    $("#payment-popup").css({ 'height': 220 });
    $("#payment-popup").toggleClass("border-class");
  }


  billFormSubmit() {





    if (this.billForm.valid) {

      $("#payment-popup").css({ 'height': 0 });
      $("#payment-popup").toggleClass("border-class");
      this.loadingOpen("updating");
      this.formdata.append('amount', this.billForm.value.paymentAmount);

      this.patientService.updateBill(this.formdata, this.selectedBillNumber).subscribe(
        data => {
          this.toasterService.Success("Success", "Payment updated successfully");
          this.loadingClose();
        },
        error => {
          this.toasterService.Error("Error", "An error is occured");
          this.loadingClose();
        }
      );

      this.formdata.delete("amount");
    }
    else {
      let key = Object.keys(this.billForm.controls);

      key.filter(data => {
        let control = this.billForm.controls[data];

        if (control.errors != null) {
          control.markAllAsTouched();
        }
      });
    }

  }


  loadingClose() {
    $("#backgroundloding").css({ 'height': "0" });
    $("#lodingDiv").css({ 'height': 0 });
  }

  loadingOpen(message) {
    this.loadingMessage = message;
    $("#lodingDiv").css({ 'height': 100 });
    $('#lodingDiv').css({ top: window.pageYOffset + 230 });
    $("#backgroundloding").css({ 'height': "100vh" });
  }




  fetchdata() {

    this.hasParameter = this._avtivatedRoute.snapshot.paramMap.has('providerId');

    if (this.hasParameter) {
      this.providerId = parseInt(this._avtivatedRoute.snapshot.paramMap.get("providerId"));

      this.requestService.fetchinvestigationRequest(this.providerId).subscribe(data => {

        this.billAndInvestigationRequest = data;
        if (data.length == 0) {

        }
        this.patientUniqueList();
      });

    }
  }

  patientUniqueList() {

    for (this.i = 0, this.j = 0, this.k = 0; this.i < this.billAndInvestigationRequest.length; this.i++) {



      if (this.billAndInvestigationRequest[this.i].investigationRequest != null) {
        this.investigationRequest[this.k] = this.billAndInvestigationRequest[this.i].investigationRequest;
        // console.log("bill patient id =  " + this.investigationRequest[this.k].id);
        this.k = this.k + 1;
      }


      if (this.billAndInvestigationRequest[this.i].bill != null) {
        this.billing[this.j] = this.billAndInvestigationRequest[this.i].bill;
        //console.log("bill patient id =  " + this.billing[this.j].id);
        this.j = this.j + 1;
      }

    }


    if (this.ptientId != null) {
      this.investigationRequestlistOpen(this.ptientId, 2);
    }
    //console.log("this.investigationRequest.length " + Object.keys(this.investigationRequest).length);

    for (this.i = 0; this.i < this.investigationRequest.length; this.i++) {

      this.hasValue = false;


      for (this.j = 0; this.j < Object.keys(this.patientList).length; this.j++) {
        if (this.patientList[this.j].id == this.investigationRequest[this.i].patient.id) {
          this.hasValue = true;
        }
      }

      // yes its a new patient
      if (!this.hasValue) {
        this.patient = this.investigationRequest[this.i].patient;
        this.patientList[this.j] = this.patient;
        this.referenceId[this.j] = this.investigationRequest[this.i].referenceId;
        this.paid[this.j] = false;
        this.totalBill[this.j] = 0;
        //console.log("before paid " + this.paid[this.j] + " " + Object.keys(this.investigationRequest).length + " " + this.j);

        // calculation total bill
        for (this.k = 0; this.k < Object.keys(this.investigationRequest).length; this.k++) {

          if (this.patientList[this.j].id == this.investigationRequest[this.k].patient.id) {
            this.totalBill[this.j] = this.totalBill[this.j] + this.investigationRequest[this.k].investigation.rate;
          }

        }

      }
    }

    // for (this.i = 0; this.i < Object.keys(this.patientList).length; this.i++) {
    //   console.log("patientList " + this.patientList[this.i].name);
    //   console.log("paid " + this.paid[this.j]);
    // }




    // identifying paid or not
    for (this.i = 0; this.i < Object.keys(this.patientList).length; this.i++) {

      for (this.k = 0; this.k < this.billing.length; this.k++) {
        if (this.billing[this.k].patient.id == this.patientList[this.i].id) {
          this.paid[this.i] = true;
        }
      }

    }

    // for (this.i = 0; this.i < Object.keys(this.paid).length; this.i++) {
    //   console.log("paid after value " + this.paid[this.j]);
    // }


  }

  reportFormSubmit(form: NgForm) {

    if (this.reportForm.valid && this.selectedImage) {


      this.investigationRequestPost.reportText = this.reportForm.get('reportText').value;
      this.investigationRequestPost.status = this.reportForm.get('status').value;

      this.formdata.append('investigationrequest', JSON.stringify(this.investigationRequestPost));
      this.formdata.append('reportImage', this.reportimage);

      console.log("formdata " + JSON.stringify(this.investigationRequestPost));
      console.log("formdata " + this.formdata.getAll("reportImage"));
      console.log("formdata " + this.formdata.getAll("investigationrequest"));

      this.investigationRequestService.saveInvestigationRequestReport(this.formdata, this.investigationRequestId).subscribe(
        data => {
          console.log(data);
          this.fetchdata();
          $("#report-form-popup").css({ 'height': 0 });
          $("#report-form-popup").toggleClass("border-class");
          this.dissmissopen(true, "Report is seccessfully set");
        },
        error => {
          this.dissmissopen(false, "");
        }
      );

      this.formdata.delete("investigationrequest");
      this.formdata.delete("reportImage");
      // console.log("JSOn " + user); ALTER TABLE investigation_request ROW_FORMAT=DYNAMIC;

    }
    else {
      let key = Object.keys(this.reportForm.controls);

      key.filter(data => {
        let control = this.reportForm.controls[data];

        if (control.errors != null) {
          control.markAllAsTouched();
        }
      });
    }

  }

  onselectfile(event) {

    this.imageSize = event.target.files[0].size / 1024;

    if (this.imageSize < 200) {
      const file = event.target.files[0];
      this.reportimage = file;
      this.selectedImage = true;
      this.reportForm.get('reportImage').setValue("image");
    }
    else {
      this.reportForm.get("reportImage").setValue("");
      (<HTMLInputElement>document.getElementById("reportfile")).value = "";
      alert("Image size should be less 200kb");
    }

  }






  investigationRequestlistOpen(patientId, testId) {

    this.ptientId = patientId;
    for (this.i = 0, this.j = 0; this.i < this.investigationRequest.length; this.i++) {


      if (patientId == this.investigationRequest[this.i].patient.id) {
        this.popUpInvestigationRequest[this.j] = this.investigationRequest[this.i];
        this.j = this.j + 1;
      }

    }

    if (testId == 1) {
      $("#investigation-request-list-popup").toggleClass("border-class");
    }
    $("#investigation-request-list-popup").css({ 'height': 400 });

  }

  reportFormOpen(investigationRequestId, format) {


    this.format = format;
    this.investigationRequestId = investigationRequestId;
    $("#report-form-popup").toggleClass("border-class");
    $("#report-form-popup").css({ 'height': 450 });
  }

  billFormOpen(patientId) {
    $("#bill-form-popup").toggleClass("border-class");
    $("#bill-form-popup").css({ 'height': 430 });
    this.billPatientId = patientId;
  }


  showReport(indexId) {

    this.reportText = this.popUpInvestigationRequest[indexId].reportText;
    if (this.reportText == null) {
      this.reportText = "Not Set";
    }

    if (this.popUpInvestigationRequest[indexId].imageFileName != null) {
      this.extension = this.popUpInvestigationRequest[indexId].imageFileName.split('.').pop();
      this.extension = "data:image/" + this.extension + ";base64,";
      this.reportimage = this.extension + this.popUpInvestigationRequest[indexId].reportImage.toString();
    }
    else {
      this.extension = null;
    }

    $("#report-info-popup").css({ 'height': 400 });
    $("#report-info-popup").toggleClass("border-class");
    // .split('.').pop() console.log("Report Text = " + this.reportText + " " + this.popUpInvestigationRequest[indexId].reportImageEncode) ;
  }

  addInvestigationRequest() {
    this.router.navigate(['/adminpost']);
  }

  addInvestigation() {
    this.router.navigate(['/investigationadd']);
  }

  modifyInvestigation() {
    this.router.navigate(['/investigation']);
  }

  setReport() {
    this.router.navigate(['/adminreport']);
  }

  dissmissopen(success, message) {
    this.success = success;
    this.message = message;
    document.getElementsByClassName("popup")[0].classList.add("active");
  }

}


// = {
//   id: 1,
//     "name": "10",
//       "mobile": "10",
//         "age": "10",
//           "sampleCollection": "10",
//             "appointmentDate": "10",
//               "nid": "10",
//                 "gender": "10",
//                   "email": "10",
//                     "address": "10"
// };

      // console.log("inside loop " + this.investigationRequest[this.i].patient.name);
      // console.log("inside loop " + this.investigationRequest[this.i].patient.gender);
      // console.log("inside loop " + this.investigationRequest[this.i].patient.appointmentDate);
      // console.log("inside loop " + this.investigationRequest[this.i].patient.email);
      // console.log("inside loop " + this.investigationRequest[this.i].patient.address);
      // console.log("inside loop mobile " + this.investigationRequest[this.i].patient.mobile);
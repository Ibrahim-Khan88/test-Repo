import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage'
import { InvestigationRequestServiceService } from 'src/app/Service/investigation-request-service.service';
import { InvestigationService } from 'src/app/Service/investigation.service';
import { Router } from '@angular/router';
import { Patient } from 'src/app/Model/Patient';
import { Investigation } from 'src/app/Model/Invesigation';
import { InteractionService } from 'src/app/Service/interaction.service';


@Component({
  selector: 'app-user-investigation-request-form',
  templateUrl: './user-investigation-request-form.component.html',
  styleUrls: ['./user-investigation-request-form.component.css']
})
export class UserInvestigationRequestFormComponent implements OnInit {



  hospitalTitle: string;
  hospitalImage: string = "../assets/medicalCollage/" + 1 + ".jpg";


  patientRequestForm: FormGroup;
  public formdata = new FormData();
  providerId: number = 1;
  selectedItem: number[];
  selectedItemInvestigation: Investigation[];
  private date: string;
  private time: string;
  private hourTime: number = 0;
  private amPm: string;
  public totalCost=0;
  public success: boolean = false;
  private i;
  public patient: Patient = {
    id: null,
    name: "",
    age: "",
    gender: "",
    address: "",
    appointmentDate: "",
    email: "",
    mobile: "",
    nid: "",
    sampleCollection: ""
  };


  defaultTime = { hour: 13, minute: 30 };
  meridian = true;

  toggleMeridian() {
    this.meridian = !this.meridian;
  }


  constructor(private formBuilder: FormBuilder,
    private localStoregeService: LocalStorageService, private router: Router,
    private investigationRequestService: InvestigationRequestServiceService,
    private investigationService: InvestigationService,
    private interactionService: InteractionService
  ) {

    this.patientRequestForm = formBuilder.group({
      'name': [null, Validators.required],
      'mobile': [null, Validators.required],
      'age': [null],
      'date': [null, Validators.required],
      'time': [null, Validators.required],
      'sampleCollection': [null, Validators.required],
      'nid': [null],
      'gender': [null],
      'email': [null],
      'address': [null, Validators.required]
    });

  }

  ngOnInit(): void {


    document.getElementById("dismiss-popup-btn").addEventListener("click", function () {
      document.getElementsByClassName("popup")[0].classList.remove("active");
      $("#successfull-popup-icon").css({ top: -700 });
      window.location.replace("");
    });

    $(document).ready(function () {


      // $(window).scroll(function () {
      //   console.log("scrool " + $('.popup').css('top'));
      // });

      // $('.popup.active').css({ top: window.pageYOffset + 250 });
      // $('.topclass').css({ top: window.pageYOffset + 250 });
      console.log("TOp value active " + $('.popup').css('top'));

      $("#confirm-popup-close").click(function () {
        $("#confirm-popup").css({ 'height': 0 });
        $("#make-space").css({ 'height': 0 });
        $("#confirm-popup").toggleClass("border-class");
      });

    });

    this.selectedItem = new Array<number>();
    this.selectedItem = this.localStoregeService.retrieve("selectedItem");
    this.patientRequestForm.get('sampleCollection').setValue("From Diagnosis");

    

    this.investigationService.
      fetchInvestigationByInvestigationIdList(this.selectedItem.toString()).subscribe(data => {
        this.selectedItemInvestigation = data;

       //total cost
        for (this.i = 0; this.i < this.selectedItemInvestigation.length; this.i++) {  
          this.totalCost = this.totalCost + this.selectedItemInvestigation[this.i].rate;
        }
      });

    this.hospitalTitle = this.localStoregeService.retrieve("hospitalTitle");
    this.hospitalImage = this.localStoregeService.retrieve("hospitalImage");

  }

  nextOpen() {

    $("#confirm-popup").css({ 'top': window.pageYOffset + 30 });
    $("#confirm-popup").css({ 'height': 600 });
    $("#make-space").css({ 'height': 300 });
    $("#confirm-popup").toggleClass("border-class");
    //alert('Current scroll from the top: ' + window.pageYOffset);
  }

  patientRequestFormSubmit(form: NgForm) {

    if (this.patientRequestForm.valid) {

    


      this.patient.name = this.patientRequestForm.get("name").value;
      this.patient.mobile = this.patientRequestForm.get("mobile").value;

      if (this.patientRequestForm.get("date").value != null){
      this.date = this.patientRequestForm.get("date").value.year + "-" +
        this.addZero(this.patientRequestForm.get("date").value.month) + "-" +
        this.addZero(this.patientRequestForm.get("date").value.day);
      }
      else{
        this.date = '0'
      }



      this.AmPm(this.patientRequestForm.get("time").value.hour);

      this.time = (this.patientRequestForm.get("time").value.hour - this.hourTime) + ":" +
        this.patientRequestForm.get("time").value.minute + " " +
        this.amPm;
      this.patient.appointmentDate = this.date + " " + this.time;


      this.patient.gender = this.patientRequestForm.get("gender").value;
      this.patient.sampleCollection = this.patientRequestForm.get("sampleCollection").value;
      this.patient.nid = this.patientRequestForm.get("nid").value;
      this.patient.age = this.patientRequestForm.get("age").value;
      this.patient.email = this.patientRequestForm.get("email").value;
      this.patient.address = this.patientRequestForm.get("address").value;
      // alert("Fill the properly " + JSON.stringify(this.patientRequestForm.value)); 

      this.nextOpen();

    }
    else {
      let key = Object.keys(this.patientRequestForm.controls);

      key.filter(data => {
        let control = this.patientRequestForm.controls[data];

        if (control.errors != null) {
          control.markAllAsTouched();
        }
      });
    }

  }


  confirmSubmit() {

    this.providerId = this.localStoregeService.retrieve('providerId');
    this.selectedItem = this.localStoregeService.retrieve("selectedItem");

    this.formdata.append('patient', JSON.stringify(this.patient));
    this.formdata.append('item', this.selectedItem.toString());


    console.log("formdata patient value is " + this.providerId + " " + this.formdata.getAll("patient"));
    console.log("formdata item value is " + this.formdata.getAll("item"));


    this.investigationRequestService.saveInvestigationRequest(this.providerId,
      this.formdata).subscribe(
        data => {
          this.dissmissopen(true);
          
        },
        error => {
          this.dissmissopen(false);
        }
      );


    this.formdata.delete("item");
    this.formdata.delete("patient");


  }



  addZero(parameter) {

    if (parameter < 10) {
      return "0" + parameter;
    }
    return parameter;
  }

  AmPm(parameter) {

    if (parameter > 11) {
      if (parameter != 12) {
        this.hourTime = 12;
      }
      this.amPm = "PM";

    }
    else {
      this.hourTime = 0;
      this.amPm = "AM";
    }

  }

  dissmissopen(success){
    this.success = success;  //window.pageYOffset +

    $("#successfull-popup-icon").css({ top: window.pageYOffset + 250 });

    document.getElementsByClassName("popup")[0].classList.add("active");
  }

}

import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Investigation } from 'src/app/Model/Invesigation';
import { InteractionService } from 'src/app/Service/interaction.service';
import { InvestigationRequestServiceService } from 'src/app/Service/investigation-request-service.service';
import { InvestigationService } from 'src/app/Service/investigation.service';
import * as $ from 'jquery';
import { Department } from 'src/app/Model/Department';
import { DepartmentService } from 'src/app/Service/department.service';
import { ParamGroupService } from 'src/app/Service/param-group.service';
import { AccessoriesService } from 'src/app/Service/accessories.service';
import { ParamGroup } from 'src/app/Model/ParamGroup';
import { Accessories } from 'src/app/Model/Accessories';

@Component({
  selector: 'app-investigation-list',
  templateUrl: './investigation-list.component.html',
  styleUrls: ['./investigation-list.component.css']
})
export class InvestigationListComponent implements OnInit {

  investigationForm: FormGroup;
  department: Department = {
    "id": 1,
    "name": "Pathology",
    "type": "Parameter"
  };
  investigation: Investigation = {
    "refValue": "3-22",
    "rate": 220,
    "note": "",
    "name": "CBC",
    "id": 0,
    "format": "format",
    "description": "description",
    "unit": "",
    "code": "",
    "selectionCode": "",
    "resultType": "",
    "vatApply": true,
    "vatApplyAmount": 20,
    "discountAmount": 220,
    "discountPer": 30,
    "sortingId": 10,
    "parameters": null,
    "paramGroup": null,
    "accessories": null,
    "department": this.department
  };
  providerId: string;
  investigationId: string;
  investigationList: Investigation[];
  paramGroupArray: ParamGroup[];
  accessoriesArray: Accessories[];

  public popupMessage: string = "";
  departmentArray: Department[] = [
    {
      "name": "name",
      "id": 1,
      "type": "",
    }
  ];


  constructor(private formBuilder: FormBuilder,
    private localStoregeService: LocalStorageService, private router: Router,
    private investigationRequestService: InvestigationRequestServiceService,
    private investigationService: InvestigationService,
    private interactionService: InteractionService,
    private departmentService: DepartmentService,
    private elementRef: ElementRef,
    private paramGroupService: ParamGroupService,
    private accessoriesService: AccessoriesService,
  ) {

    this.investigationForm = formBuilder.group({
      'name': [null, Validators.required],
      'rate': [null, Validators.required],
      'format': [null, Validators.required],
      'refValue': [null, Validators.required]
    });

  }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#EDF1F6';
  }

  ngOnInit(): void {


    // this.accessoriesService.fetchAccessories().subscribe(
    //   data => {
    //     this.accessoriesArray = data;
    //     this.investigation.accessories = data;
    //   },
    //   error => {
    //   }
    // );

    // this.paramGroupService.fetchParamGroup().subscribe(
    //   data => {
    //     this.paramGroupArray = data;
    //     this.investigation.paramGroup = data;


    //   },
    //   error => {
    //   }
    // );




    document.getElementById("dismiss-popup-btn").addEventListener("click", function () {
      document.getElementsByClassName("popup")[0].classList.remove("active");
    });

    $(document).ready(function () {

      $("#update-form-popup-close").click(function () {
        $("#update-form-popup").css({ 'opacity': 0 });
        $("#update-form-popup").toggleClass("border-class");
        setTimeout(function () { $("#update-form-popup").css({ 'height': 0 });; }, 200);
        // $("#update-form-popup").css({ 'height': 0 });

      });

    });


    this.providerId = this.localStoregeService.retrieve("providerId");
    if (this.providerId != null) {
      this.fetchInvestigationData();

      // this.departmentService.fetchDepartment().subscribe(

      //   data => {
      //     this.departmentArray = data;
      //   },
      //   error => {
      //   }
      // );

    }
    else {
      this.router.navigate(['/']);
    }

  }


  investigationFormSubmit(form: NgForm) {


    if (this.investigationForm.valid) {

      this.investigation.name = this.investigationForm.value.name;
      this.investigation.rate = this.investigationForm.value.rate;
      this.investigation.refValue = this.investigationForm.value.refValue;
      this.investigation.format = this.investigationForm.value.format;


      this.investigationService.updateInvestigation(this.providerId, 1, this.investigationId, this.investigation).subscribe(
        data => {


          this.openPopUp("Successfully Updated");
          $("#update-form-popup").css({ 'height': 0 });
          $("#update-form-popup").removeClass("border-class");
          this.fetchInvestigationData();
        },
        error => {
          this.openPopUp("Fail to update");
        }
      );
    }
    else {
      alert("Fill the properly");
    }

  }

  updateOpenForm(index) {

    this.localStoregeService.store("investigation", this.investigationList[index]);
    //console.log(this.investigation);
    //console.log(this.localStoregeService.retrieve("investigation"));
    this.router.navigate(['/investigationupdate']);

    //this.investigationForm.value.name = "Md Ibrahim Khan";
    // this.investigationForm.get('name').setValue(this.investigationList[index].name);
    // this.investigationForm.get('rate').setValue(this.investigationList[index].rate);
    // this.investigationForm.get('format').setValue(this.investigationList[index].format);
    // this.investigationForm.get('refValue').setValue(this.investigationList[index].refValue);



    // $("#update-form-popup").css({ 'opacity': 1 });
    // $("#update-form-popup").css({ 'height': 400 });
    // $("#update-form-popup").addClass("border-class");
    // this.investigationId = investigationId;
  }

  deleteOpen(investigationId) {
    this.investigationId = investigationId;
    $("#delete-warning-popup").css({ 'top': window.pageYOffset + 230 });
    $("#delete-warning-popup").css({ 'opacity': 1 });
    //$("#delete-warning-popup").toggleClass("border-class");
    // setTimeout(function () { $("#delete-warning-popup").css({ 'opacity': 1 }); }, 100);
  }


  delete() {

    this.investigationService.deleteInvestigation(this.investigationId).subscribe(
      data => {
        this.openPopUp("Successfully Deleted");
        this.fetchInvestigationData();
      },
      error => {
        this.openPopUp("Fail to delete");
      }
    );

    $("#delete-warning-popup").css({ 'opacity': 0 });
    setTimeout(function () { $("#delete-warning-popup").css({ 'top': -250 });; }, 100);
  }


  warningCancle() {

    $("#delete-warning-popup").css({ 'opacity': 0 });
    //$("#delete-warning-popup").toggleClass("border-class");
    setTimeout(function () { $("#delete-warning-popup").css({ 'top': -250 });; }, 500);

  }

  fetchInvestigationData() {
    this.investigationService.fetchInvestigationByProviderId(this.providerId).subscribe(
      data => {
        this.investigationList = data;
      },
      error => alert("An error is occured")
    );
  }

  openPopUp(message) {
    this.popupMessage = message;
    document.getElementsByClassName("popup")[0].classList.add("active");
  }
}

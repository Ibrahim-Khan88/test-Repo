import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Category } from 'src/app/Model/Category';
import { Investigation } from 'src/app/Model/Invesigation';
import { InteractionService } from 'src/app/Service/interaction.service';
import { InvestigationRequestServiceService } from 'src/app/Service/investigation-request-service.service';
import { InvestigationService } from 'src/app/Service/investigation.service';
import * as $ from 'jquery';
import { JsonPipe } from '@angular/common';
import { Department } from 'src/app/Model/Department';
import { DepartmentService } from 'src/app/Service/department.service';
import { AccessoriesService } from 'src/app/Service/accessories.service';
import { Accessories } from 'src/app/Model/Accessories';
import { Specimen } from 'src/app/Model/Specimen';
import { SpecimenService } from 'src/app/Service/specimen.service';
import { ParamGroupService } from 'src/app/Service/param-group.service';
import { ParamGroup } from 'src/app/Model/ParamGroup';
import { SubGroupService } from 'src/app/Service/sub-group.service';
import { SubGroup } from 'src/app/Model/SubGroup';
import { Parameter } from 'src/app/Model/Parameter';
import { ToasterService } from 'src/app/Service/toaster.service';
import { Doctor } from 'src/app/Model/Doctor';

@Component({
  selector: 'app-add-investigation',
  templateUrl: './add-investigation.component.html',
  styleUrls: ['./add-investigation.component.css']
})
export class AddInvestigationComponent implements OnInit {


  investigationForm: FormGroup;
  department: Department = {
    "id": 1,
    "name": "",
    "type": ""
  };

  investigation: Investigation = {
    "refValue": "",
    "rate": 0,
    "note": "",
    "name": "",
    "id": null,
    "format": "",
    "description": "",
    "unit": "",
    "code": "",
    "selectionCode": "",
    "resultType": "",
    "vatApply": false,
    "vatApplyAmount": 0,
    "discountAmount": 0,
    "discountPer": 0,
    "sortingId": 0,
    "parameters": null,
    "paramGroup": null,
    "accessories": null,
    "department": null
  };


  providerId: string;
  categoryId: string;
  investigationId: string;
  departmentArray: Department[];
  accessoriesArray: Accessories[];
  docttor: Doctor;
  selectedAccessoriesArray: Accessories[];
  specimenArray: Specimen[];
  paramGroupArray: ParamGroup[];
  storeParamGroupArray: ParamGroup[];
  selectedParamGroup: ParamGroup[];
  selectedParameter: Parameter[];
  tempParameter: Parameter[];
  subGrouppArray: SubGroup[];
  paramOrParameterShow: boolean = true;
  formatValue: string;
  i: number;
  j: number;
  selectedParamGroupIndex: number = 0;
  isSubgroupSelected: boolean = false;
  isDepartmentParameterType: boolean = false;
  temptest: boolean = false;
  tempParamGroup: ParamGroup = {
    "id": null,
    "name": "",
    'createdDate': "",
    'lastModifiedDate': "",
    "headingShow":false,
    "parameters": null
  };


  editorStyle = {
    height: '300px'
  };


  constructor(private formBuilder: FormBuilder,
    private localStoregeService: LocalStorageService, private router: Router,
    private investigationRequestService: InvestigationRequestServiceService,
    private investigationService: InvestigationService,
    private interactionService: InteractionService,
    private departmentService: DepartmentService,
    private accessoriesService: AccessoriesService,
    private specimenService: SpecimenService,
    private paramGroupService: ParamGroupService,
    private subGroupService: SubGroupService,
    private elementRef: ElementRef,
    private toasterService: ToasterService
  ) {

    this.investigationForm = formBuilder.group({
      'name': [null, Validators.required],
      'rate': [null, Validators.required],
      'format': [null],
      'unit': [null],
      'refValue': [null],
      'description': [null],
      'note': [null],
      'code': [null],
      'vat': [null],
      'selectionCode': [null],
      'vatApplyAmount': [null],
      'discountAmount': [null],
      'discountPer': [null],
      'department': [null, Validators.required],
      'resultType': [null, Validators.required],
      'subGroup': [null, Validators.required],
      'speciman': [null, Validators.required],
      'sortingId': [null, Validators.required],
    });

  }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#EDF1F6';
  }

  ngOnInit(): void {

    //this.fetchParamGroup(1,2);


    this.providerId = this.localStoregeService.retrieve("providerId");

    if (this.providerId == null) {
      this.router.navigate(['/']);
    }

    this.selectedAccessoriesArray = new Array<Accessories>();
    this.selectedParameter = new Array<Parameter>();
    this.selectedParamGroup = new Array<ParamGroup>();
    this.tempParameter = new Array<Parameter>();

    // document.getElementById("open-popup-btn").addEventListener("click", function () {
    //   document.getElementsByClassName("popup")[0].classList.add("active");
    // });

    document.getElementById("dismiss-popup-btn").addEventListener("click", function () {
      document.getElementsByClassName("popup")[0].classList.remove("active");
    });

    // $("#param-group-popup-close").click(function () {
    //   $("#param-group-popup").css({ 'height': 0 });
    //   $("#param-group-popup").toggleClass("border-class");
    // });

    $('#param-group-popup').on('click', '#param-group-popup-close', function (e) {

      $("#param-group-popup").css({ 'height': 0 });
      $("#param-group-popup").toggleClass("border-class");

    });

    $("#accessories-popup-close").click(function () {
      $("#accessories-popup").css({ 'height': 0 });
      $("#accessories-popup").toggleClass("border-class");
    });

    $("#format-popup-close").click(function () {
      $("#format-popup").css({ 'height': 0 });
      $("#format-popup").toggleClass("border-class");
    });


    $(document).ready(function () {


      $("#All-data-Container").on('keydown', '.input--style-5', function (e) {

        if (e.keyCode == 13) {
          var index = $(".input--style-5").index(this);
          $(".input--style-5").eq(index + 1).focus();
          e.preventDefault();
        }

      });

    });







    this.departmentService.fetchDepartment().subscribe(
      data => {
        this.departmentArray = data;
      },
      error => {
      }
    );

    this.accessoriesService.fetchAccessories().subscribe(
      data => {
        this.accessoriesArray = data;
      },
      error => {
      }
    );

    this.specimenService.fetchSpecimen().subscribe(
      data => {
        this.specimenArray = data;
      },
      error => {
      }
    );



    this.subGroupService.fetchSubGroup().subscribe(
      data => {
        this.subGrouppArray = data;
      },
      error => {
      }
    );




  }


  investigationFormSubmit() {


    if (this.investigationForm.valid) {

      this.loadingOpen();


      if (this.departmentArray[this.investigationForm.get("department").value].type == "Parameter") {

        for (this.i = 0; this.i < this.selectedParamGroup.length; this.i++) {
          this.selectedParamGroup[this.i].parameters = [];
        }



        this.investigation.paramGroup = this.selectedParamGroup;
        this.investigation.parameters = this.selectedParameter;
      }
      else {
        this.investigation.paramGroup = [];
        this.investigation.parameters = [];
      }

      if (this.investigationForm.get("vatApplyAmount").value != null) {
        this.investigation.vatApply = true;
      }

      this.investigation.name = this.investigationForm.get("name").value;
      this.investigation.code = this.investigationForm.get("code").value;
      this.investigation.discountPer = this.investigationForm.get("discountPer").value;
      this.investigation.discountAmount = this.investigationForm.get("discountAmount").value;
      this.investigation.note = this.investigationForm.get("note").value;
      this.investigation.selectionCode = this.investigationForm.get("selectionCode").value;
      this.investigation.sortingId = this.investigationForm.get("sortingId").value;
      this.investigation.unit = this.investigationForm.get("unit").value;
      this.investigation.vatApplyAmount = this.investigationForm.get("vatApplyAmount").value;
      this.investigation.rate = this.investigationForm.get("rate").value;
      this.investigation.refValue = this.investigationForm.get("refValue").value;
      this.investigation.resultType = this.investigationForm.get("resultType").value;
      this.investigation.description = this.investigationForm.get("description").value;
      this.investigation.format = this.formatValue;
      // this.investigation.department = this.investigationForm.get("name").value;

      this.investigation.accessories = this.selectedAccessoriesArray;
      //console.log("form value=" + JSON.stringify(this.investigationForm.value));
      //console.log("investigation value=" + JSON.stringify(this.investigation));




      this.investigationService.saveInvestigation(this.investigation,
        this.departmentArray[this.investigationForm.get("department").value].id,
        this.providerId,
        this.investigationForm.get("speciman").value,
        this.investigationForm.get("subGroup").value).subscribe(
          data => {
            this.toasterService.Success("Success", "Successfully Saved");
            this.loadingClose();
            this.clearData();
            // document.getElementsByClassName("popup")[0].classList.add("active");
            // alert("swuccess to updated");
          },
          error => {
            this.toasterService.Error("Error", error.error);
            this.loadingClose();
            this.clearData();
          }
        );




      // this.investigationService.saveInvestigation(this.investigation,
      //   1,
      //   this.providerId,
      //   1,
      //   1).subscribe(
      //     data => {
      //       document.getElementsByClassName("popup")[0].classList.add("active");
      //       alert("swuccess to updated");
      //     },
      //     error => {
      //       alert("Fail to updated");
      //     }
      //   );




      this.fetchParamGroup(this.investigationForm.get("subGroup").value,
        this.departmentArray[this.investigationForm.get("department").value].id);




    }
    else {

      let key = Object.keys(this.investigationForm.controls);

      key.filter(data => {
        let control = this.investigationForm.controls[data];

        if (control.errors != null) {
          control.markAllAsTouched();
        }
      });
      //alert("Fill the form properly");
    }

  }

  clearData(){
    this.selectedParamGroup = [];
    this.selectedParameter = [];
    this.paramGroupArray = [];
  }

  saveParameter() {
    this.paramOrParameterShow = true;


    this.selectedParamGroup.push(this.paramGroupArray[this.selectedParamGroupIndex]);

    for (this.i = 0; this.i < this.tempParameter.length; this.i++) {
      this.selectedParameter.push(this.tempParameter[this.i]);
    }

    // console.log("size=" + this.selectedParameter.length);

    // for (this.i = 0; this.i < this.selectedParameter.length; this.i++) {
    //   console.log(this.selectedParameter[this.i]);
    // }

    this.tempParameter = [];
  }

  deleteSelectedParameter(parameter) {

    
    this.selectedParameter = this.selectedParameter.filter(m => m != parameter);

    for (this.i = 0; this.i < this.selectedParamGroup.length; this.i++) {

      this.temptest = false;

      for (this.j = 0; this.j < this.selectedParameter.length; this.j++) {

        // console.log("id print " +  this.selectedParameter[this.j].id + " " +  this.selectedParameter[this.j].paramGroup.id + " " + 
        // this.selectedParamGroup[this.i].id);

        if(this.selectedParameter[this.j].paramGroup.id == this.selectedParamGroup[this.i].id){
          this.temptest = true;
        }

      }


      if(!this.temptest){
        this.selectedParamGroup = this.selectedParamGroup.filter(m => m != this.selectedParamGroup[this.i]);
      }

    }

  }


  openParameter(index) {
    console.log(index);
    this.selectedParamGroupIndex = index;
    this.paramOrParameterShow = false;
  }

  addFormat() {
    $("#format-popup").css({ 'top': window.pageYOffset + 30 });
    $("#format-popup").css({ 'height': 500 });
    $("#format-popup").toggleClass("border-class");
  }

  addAccessoriesOpen() {
    $("#accessories-popup").css({ 'top': window.pageYOffset + 30 });
    $("#accessories-popup").css({ 'height': 500 });
    $("#accessories-popup").toggleClass("border-class");
  }

  addAccessories() {
    $("#accessories-popup").css({ 'height': 0 });
    $("#accessories-popup").toggleClass("border-class");
  }

  formatSave() {
    $("#format-popup").css({ 'height': 0 });
    $("#format-popup").toggleClass("border-class");
  }

  getAccessoriesSelected(e: any, id: Accessories) {

    if (e.target.checked) {
      //console.log("selected id " + id);
      this.selectedAccessoriesArray.push(id);
    }
    else {
      //console.log("unselected id " + id);
      this.selectedAccessoriesArray = this.selectedAccessoriesArray.filter(m => m != id);
    }


    // console.log("size=" + this.selectedAccessoriesArray.length);

    // for (this.i=0; this.i<this.selectedAccessoriesArray.length; this.i++){
    //   console.log(this.selectedAccessoriesArray[this.i]);
    // }

  }


  getParameterSelected(e: any, id: Parameter) {

    if (e.target.checked) {
      //console.log("selected id " + id);
      this.tempParameter.push(id);
    }
    else {
      //console.log("unselected id " + id);
      this.tempParameter = this.tempParameter.filter(m => m != id);
    }


    // console.log("size=" + this.tempParameter.length);

    // for (this.i = 0; this.i < this.tempParameter.length; this.i++) {
    //   console.log(this.tempParameter[this.i]);
    // }

  }




  paramGroupPopUpOpenFromSubgroup() {
    this.isSubgroupSelected = true;
  }

  paramGroupPopUpOpenFromDepartment(value: string) {

    if (this.departmentArray[value].type == "Parameter") {
      this.isDepartmentParameterType = true;
    }
    else {
      this.isDepartmentParameterType = false;
    }
  }

  paramGroupPopUpOpen() {

    console.log(this.investigationForm.get("subGroup").value + " " +
      this.investigationForm.get("department").value + " " +
      this.departmentArray[this.investigationForm.get("department").value].id);

    this.fetchParamGroup(this.investigationForm.get("subGroup").value,
      this.departmentArray[this.investigationForm.get("department").value].id);

    $("#param-group-popup").css({ 'top': window.pageYOffset + 30 });
    $("#param-group-popup").css({ 'height': 500 });
    $("#param-group-popup").toggleClass("border-class");
  }

  addALlParamGroup() {

    this.selectedParamGroup = [];
    this.selectedParameter = [];

    for (this.i = 0; this.i < this.paramGroupArray.length; this.i++) {

      //console.log(this.paramGroupArray[this.i].name);
      this.tempParamGroup = this.paramGroupArray[this.i];
      this.selectedParamGroup.push(this.tempParamGroup);

      for (this.j = 0; this.j < this.paramGroupArray[this.i].parameters.length; this.j++) {
        this.selectedParameter.push(this.paramGroupArray[this.i].parameters[this.j]);
        //console.log(this.paramGroupArray[this.i].parameters[this.j].id);
      }
    }

    $("#param-group-popup").css({ 'height': 0 });
    $("#param-group-popup").toggleClass("border-class");
  }

  fetchParamGroup(subGroupId, departmentId) {

    this.paramGroupService.fetchParamGroup(departmentId, subGroupId).subscribe(
      data => {
        this.paramGroupArray = data;
        this.storeParamGroupArray = data;


        for (this.i = 0; this.i < this.paramGroupArray.length; this.i++) {

          this.temptest = false;
          this.tempParamGroup.id = this.paramGroupArray[this.i].id;
          this.tempParamGroup.name = this.paramGroupArray[this.i].name;

          var param = this.paramGroupArray[this.i];

    
          for (this.j = 0; this.j < this.paramGroupArray[this.i].parameters.length; this.j++) {
    
            this.paramGroupArray[this.i].parameters[this.j].paramGroup = param;
    
          }
    
        }



        
        // for (this.i = 0; this.i < this.paramGroupArray.length; this.i++) {

    
        //   for (this.j = 0; this.j < this.paramGroupArray[this.i].parameters.length; this.j++) {
    
        //    console.log("id ===" + this.paramGroupArray[this.i].parameters[this.j].paramGroup.id);
        //    console.log("name===" + this.paramGroupArray[this.i].parameters[this.j].paramGroup.name);
    
        //   }
    
        // }



      },
      error => {
      }
    );

  }

  loadingOpen() {

    $("#lodingDiv").css({ 'height': 100 });
    $('#lodingDiv').css({ top: window.pageYOffset + 180 });
    $("#backgroundloding").css({ 'height': "100vh" });

  }

  loadingClose() {

    $("#lodingDiv").css({ 'height': 0 });
    $("#backgroundloding").css({ 'height': "0" });

  }

  backParamGroup(){
    this.paramOrParameterShow = true;
  }

}

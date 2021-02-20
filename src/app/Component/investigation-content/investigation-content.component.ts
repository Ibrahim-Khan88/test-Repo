import { Component, OnInit } from '@angular/core';
import { Investigation } from 'src/app//Model/Invesigation';
import { HttpClient } from '@angular/common/http';
import { InvestigationService } from 'src/app//Service/investigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { Category } from 'src/app//Model/Category';
import {LocalStorageService} from 'ngx-webstorage'
import { InteractionService } from 'src/app/Service/interaction.service';
import { Department } from 'src/app/Model/Department';

@Component({
  selector: 'app-investigation-content',
  templateUrl: './investigation-content.component.html',
  styleUrls: ['./investigation-content.component.css']
})
export class InvestigationContentComponent implements OnInit {

  hospitalTitle: string;
  hospitalImage: string = "../assets/medicalCollage/" + 1 + ".jpg";

  medicalName: string[] = ['Khulna Medical Hospital', 'Shaheed Sheikh Abu Naser Specialised Hospital',
    'Khulna City Hospital', 'Islami Bank Hospital Khulna', 'Khulna Shishu Hospital', 'Gazi Medical College and Hospital']


  public category : Category = {
    "id": 0,
    'name': "",
    'description': "",
    'createdDate': "",
    'lastModifiedDate': ""
  }

  department: Department = {
    "id": 1,
    "name": "Pathology",
    "type": "List"
  };
  public investigation: Investigation[];
  public investigationDetail:  Investigation = {
    "refValue": "",
    "rate": 0,
    "note": "",
    "name": "",
    "id": 0,
    "format": "",
    "description": "",
    "unit": "",
    "code": "",
    "selectionCode": "",
    "resultType": "",
    "vatApply": true,
    "vatApplyAmount": 0,
    "discountAmount": 0,
    "discountPer": 0,
    "sortingId": 0,
    "parameters": null,
    "paramGroup": null,
    "accessories": null,
    "department": this.department
  };
  public investigationByCategoryId: Investigation[];
  hasParameter: boolean;
  providerId: number;
  selectedItem:number[];

  constructor(private localStoregeService: LocalStorageService,  
    private router: Router, private investigationService: InvestigationService,
    private _avtivatedRoute: ActivatedRoute,
    private interactionService: InteractionService) { }

  ngOnInit(): void {


    document.getElementById("dismiss-popup-btn").addEventListener("click", function () {
      document.getElementsByClassName("popup")[0].classList.remove("active");
    });

    this.hasParameter = this._avtivatedRoute.snapshot.paramMap.has('providerId');  

    if (this.hasParameter) {
      this.providerId = parseInt(this._avtivatedRoute.snapshot.paramMap.get("providerId"));
      this.localStoregeService.store("providerId", this.providerId);
      
      this.interactionService.sendHeadingTitle(this.providerId);
      

      this.investigationService.fetchInvestigationByProviderId(this.providerId).subscribe(data => {
      this.investigation = data;     
    });

    }


    $(document).ready(function () {
      
      var variable = window.pageYOffset;

      $(".closebtn1").click(function () {
        $("#mySidenav1").css({ 'height': 0 });
       // alert("me ");
      });

     function closeNav() {
       $("#mySidenav1").css({ 'height': 400 });
     }

    });

    this.selectedItem = new Array<number>();

  }

  detail(investigationId){
    $("#mySidenav1").css({ 'height': 400 });
    
    //console.log(this.investigation[investigationId].name + " " + this.investigation[investigationId].id);
    this.investigationDetail = this.investigation[investigationId]; 

  }

  Request(investigationId){
    
    this.localStoregeService.store('investigationId', this.investigation[investigationId].id);
    this.router.navigate(['/request']);
  }

  nextPage(){

    if (this.selectedItem.length > 0) {
      $("#nextbuttonb").css({ 'height': window.pageYOffset });
      this.localStoregeService.store("selectedItem", this.selectedItem);
      this.router.navigate(['/requestform']);
    }
    else{
      document.getElementsByClassName("popup")[0].classList.add("active");
    }

  }

  getSelectedId(e:any, id:number){

    if(e.target.checked){
      //console.log("selected id " + id);
      this.selectedItem.push(id);
    }
    else{
      //console.log("unselected id " + id);
      this.selectedItem = this.selectedItem.filter( m => m != id);
    }



  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage'


@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent implements OnInit {

  url : string;
  DiagonsticDetail = [
    { "id": 1, "name": "Khulna Medical Hospital" , 'imageId' : 1},
    { "id": 2, "name": "Shaheed Sheikh Abu Naser Specialised Hospital", 'imageId':5},
    { "id": 3, "name": "Khulna City Hospital", 'imageId':9},
    { "id": 4, "name": "Islami Bank Hospital Khulna", 'imageId':13},
    { "id": 5, "name": "Khulna Shishu Hospital", 'imageId':17},
    { "id": 6, "name": "Gazi Medical College and Hospital", 'imageId': 21 }, 
  ];

  constructor(private router: Router, private localStoregeService: LocalStorageService) { }

  ngOnInit(): void {
    
  }

  detail(providerId) {
   

    this.localStoregeService.store('providerId', providerId);
    this.url = "/service/" + providerId;
    this.router.navigate([this.url]);

  }
// npm install rxjs - peer dependencies of ngx-quill
}

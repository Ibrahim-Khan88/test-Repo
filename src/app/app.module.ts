import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HeaderComponent } from './Component/header/header.component';
import { InvestigationContentComponent } from './Component/investigation-content/investigation-content.component';
import { DiagnosticComponent } from './Component/diagnostic/diagnostic.component';


import { NgxWebstorageModule } from 'ngx-webstorage';
import { UserInvestigationRequestComponent } from './Component/user-investigation-request/user-investigation-request.component';
import { UserInvestigationRequestFormComponent } from './Component/user-investigation-request-form/user-investigation-request-form.component';

import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminInvestigationPostComponent } from './Component/admin-investigation-post/admin-investigation-post.component';
import { UserReportShowComponent } from './Component/user-report-show/user-report-show.component';
import { AddInvestigationComponent } from './Component/add-investigation/add-investigation.component';
import { InvestigationListComponent } from './Component/investigation-list/investigation-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { QuillModule} from 'ngx-quill';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminReportComponent } from './Component/admin-report/admin-report.component';
import { InvestigationUpdateComponent } from './Component/investigation-update/investigation-update.component';
// import { BillFormComponent } from './bill-form/bill-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InvestigationContentComponent,
    DiagnosticComponent,
    UserInvestigationRequestComponent,
    UserInvestigationRequestFormComponent,
    AdminInvestigationPostComponent,
    UserReportShowComponent,
    AddInvestigationComponent,
    InvestigationListComponent,
    AdminReportComponent,
    InvestigationUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

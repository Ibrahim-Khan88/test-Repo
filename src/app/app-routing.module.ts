import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiagnosticComponent } from './Component/diagnostic/diagnostic.component';
import { InvestigationContentComponent } from './Component/investigation-content/investigation-content.component';
import { UserInvestigationRequestComponent } from './Component/user-investigation-request/user-investigation-request.component';
import { UserInvestigationRequestFormComponent } from './Component/user-investigation-request-form/user-investigation-request-form.component';
import { AdminInvestigationPostComponent } from './Component/admin-investigation-post/admin-investigation-post.component';
import { UserReportShowComponent } from './Component/user-report-show/user-report-show.component';
import { AddInvestigationComponent } from './Component/add-investigation/add-investigation.component';
import { InvestigationListComponent } from './Component/investigation-list/investigation-list.component';
import { AdminReportComponent } from './Component/admin-report/admin-report.component';
import { InvestigationUpdateComponent } from './Component/investigation-update/investigation-update.component';

const routes: Routes = [
  {path: '', component: DiagnosticComponent, pathMatch: 'full'},
  { path: 'service/:providerId', component: InvestigationContentComponent }, 
  { path: 'investigationrequest/:providerId', component: UserInvestigationRequestComponent},
  { path: 'requestform', component: UserInvestigationRequestFormComponent },
  { path: 'adminpost', component:  AdminInvestigationPostComponent},
  { path: 'userreport/:providerId', component: UserReportShowComponent },
  { path: 'investigationadd', component: AddInvestigationComponent},
  { path: 'investigation', component: InvestigationListComponent },
  { path: 'adminreport', component: AdminReportComponent },
  { path: 'investigationupdate', component: InvestigationUpdateComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
declare var toastr : any;

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor() { 
    this.setting();
  }


  Success(title: string, message?:string){
    toastr.success(title, message);
  }

  Warning(title: string, message?:string){
    toastr.warning(title, message);
  }


  Error(title: string, message?:string){
    toastr.error(title, message);
  }

  setting(){
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "200",
      "hideDuration": "1000",
      "timeOut": "6000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }
}

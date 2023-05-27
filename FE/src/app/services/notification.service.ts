import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

declare var $: any;

@Injectable()
export class NotificationService {

  constructor() {
  }

  smallBox(data: any, cb?: any) {
    $.smallBox(data, cb)
  }

  bigBox(data: any, cb?: any) {
    $.bigBox(data, cb)
  }

  smartMessageBox(data: any, cb?: any) {
    $.SmartMessageBox(data, cb)
  }
  confirmDialog(title:string,content:string, callback:any, faIcon:any="warning", noBtn:string="No", yesBtn:string="Yes"){
    if(!title)
      title='Confirmation';
    if(!content)
      content='Are you sure?';

    $.SmartMessageBox({
      title : `<i class='fa fa-${faIcon}'></i> <span class="">${title}</span>`,//txt-color-orangeDark
      content : content,
      buttons : `[${noBtn}][${yesBtn}]`

    }, (ButtonPressed: string) => {
      if(callback){
        callback(ButtonPressed == yesBtn)
      }
      // if (ButtonPressed == yesBtn) {
      //   callback(callback)
      // }
    });
  }

  showMessage(type : "success" | "error" | "info" | "warning" | string, message : string, options?: any) {
    //http://codeseven.github.io/toastr/demo.html
      toastr.options.closeButton = true;
      toastr.options.positionClass = "toast-top-right";
      toastr.options.showDuration = 200;
      toastr.options.hideDuration = 200;
      toastr.options.progressBar = false;
      toastr.options.newestOnTop = true;
      toastr.options.timeOut = 5000;
      toastr.options.extendedTimeOut = 0;

    switch (type) {
      case "success":
        toastr.success(message);
        break;
      case "error":
        toastr.error(message);
        break;
      case "info":
        toastr.info(message);
        break;
      case "warning":
        toastr.warning(message);
        break;
      default:
        toastr.info(message);
        break;
    }
  }
  showError(message: string, options?: any){
    this.showMessage("error",message, options);
  }
  showSuccess(message: string, options?: any){
    this.showMessage("success",message, options);
  }
  showWarning(message: string, options?: any){
    this.showMessage("warning",message, options);
  }
  showInfo(message: string, options?: any){
    this.showMessage("info",message, options);
  }
  showCenterLoading(){
    if(window.parent){
      $(window.parent.document).find('.center-loading').show();
    }
    else{
      $('.center-loading').show();
    }
  }
  hideCenterLoading(){
    if(window.parent){
      $(window.parent.document).find('.center-loading').hide();
    }
    else{
      $('.center-loading').hide();
    }

  }
}

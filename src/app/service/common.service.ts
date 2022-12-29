import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService) { }

  showAlert(msg: string | undefined, type: 'success' | 'info' | 'error') {
    switch (type) {
      case 'success':
        this.toastr.success('Success Info', msg);
        break;
      case 'info':
        this.toastr.info('Info', msg);
        break;
      case 'error':
        this.toastr.error('Error Info', msg, {
          timeOut: 3000,
          positionClass: 'toast-bottom-full-width',
        });
        break;
    
      default:
        break;
    }
    
  }
}

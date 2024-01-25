import { Component } from '@angular/core';
import { ToastrUtils } from './shared/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar-frontend';

  constructor(
    private _toastr: ToastrService,
  ) {
    ToastrUtils.init(this._toastr);
  }
}

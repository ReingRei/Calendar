import { Component } from '@angular/core';
import { ToastrUtils } from './shared/utils';
import { ToastrService } from 'ngx-toastr';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true, 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar-frontend';

  constructor(
    // private _toastr: ToastrService,
  ) {
    // ToastrUtils.init(this._toastr);
  }
}

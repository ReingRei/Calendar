import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, timer, finalize, takeUntil, takeWhile, tap } from 'rxjs';
import { AuthenticationService } from '../../../shared/services';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent {
    countdown: number = 5;
    countdownMapping: any = {
        '=1': '# segundo',
        other: '# segundos',
    };
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _authenticationService: AuthenticationService, private _router: Router) { }

    ngOnInit(): void {
        this._authenticationService.logout();
        timer(1000, 1000)
            .pipe(
                finalize(() => {
                    this._router.navigate(['login']);
                }),
                takeWhile(() => this.countdown > 0),
                takeUntil(this._unsubscribeAll),
                tap(() => this.countdown--)
            )
            .subscribe();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}

import {Component, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StateSettings } from '../../stores/reducers/settings.reducer';
import { SignOutUser } from '../../stores/actions/users.actions';
import { Observable } from 'rxjs';
import { StateUsers } from '../../stores/reducers/users.reducer';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public users: Observable<StateUsers>;

    constructor(
      private store$: Store<StateSettings>
    ) {
    }

    ngOnInit() {
        this.users = this.store$.pipe(select('users'));
    }

    signOut() {
        this.store$.dispatch(new SignOutUser());
    }

}

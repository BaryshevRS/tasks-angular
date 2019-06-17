import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        const {email, password} = this.loginForm.value;
        this.authService.emailLogin(email, password);
    }

}

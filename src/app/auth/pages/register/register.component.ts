import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidateFields } from 'src/app/validations/validate-Fields';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern("^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\u00f1\u00d1.-]+")]],
    surname: ['', [Validators.required, Validators.pattern("^[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ\u00f1\u00d1.-]+")]],
    adress: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
    email: ['', [Validators.required, Validators.pattern(/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: ValidateFields.mustMath('password', 'confirmPassword')
  }

  )

  constructor(private fb: FormBuilder, private router: Router, private service: AuthService) {
  }

  noValidField(field: string): boolean {
    return ValidateFields.invalidField(this.miFormulario, field) || false
  }
  errorMsgField(field: string, namefield: string): string {
    return ValidateFields.errorMsg(this.noValidField(field), this.miFormulario, field, namefield);
  }


  registrar() {
    if (this.miFormulario.valid) {
      const { name, surname, adress, phoneNumber, email, password } = this.miFormulario.value
      this.service.registro(name, surname, email, password, phoneNumber, adress).subscribe((res) => {
        if (res.ok===true) {
          this.router.navigateByUrl(`${res.rol}/usuario/inicio`);
          Swal.fire('El usuario ha iniciado sesión', 'ok', 'success');
        }else{
          Swal.fire('Error', 'Se presento un error. contactese con el administrador', 'error');
        }
      });
    }
  }

}

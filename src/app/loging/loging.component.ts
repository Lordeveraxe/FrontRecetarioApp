import { Component } from '@angular/core';
import {AppService} from "../service-app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserModel} from "./user.model";
import { Routes, RouterModule } from '@angular/router';
import {DataService} from "../shared/data.service";
import {DatosCompartidosService} from "../DatosCompartidosLogin";

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent {
  inputValue: string = '';
  constructor(
    public dataService: DataService,

    public service: AppService,
    private route: Router,
    private datosCompartidosService:DatosCompartidosService
  ) {


  }


  async validateUser(): Promise<void> {
    try {
      const isValid = await this.service.getUserValidation2();
      if (isValid) {
        console.log("si");
        this.datosCompartidosService.guardarDato(this.service.formDataUser.emailUser);
        this.route.navigate(['/menu']);
      } else {
        console.log("no")
      }
    } catch (error) {
      // Código para manejar errores de la petición HTTP
    }
  }

  updateInputValue() {
    this.dataService.setInputValue(this.inputValue);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataUser = new UserModel();
  }


}

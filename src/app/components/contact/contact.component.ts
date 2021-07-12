import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { RestService } from 'src/app/rest.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'contactForm',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public form!: FormGroup;
  public respuesta:any;
  

  constructor(
    private formBuilder: FormBuilder, private RestService: RestService
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['',  [Validators.required]],
      date: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
    });

  }

  save(event: Event) {
    event.preventDefault();
    if(this.form.valid){
      // Validación y Encriptación
      let value = this.form.value;
      console.log("Data sin encriptar ", value)
      value.name = CryptoJS.AES.encrypt(value.name,'pass').toString();
      value.date = CryptoJS.AES.encrypt(value.name,'pass').toString();
      value.email = CryptoJS.AES.encrypt(value.name,'pass').toString();
      console.log("Data encriptada ",value);
      // Enviar información
      
      this.RestService.post(`http://localhost:4200/posts`,value).subscribe(respuesta => {
      console.log("Formulario enviado!")

    })
      this.form.reset();
    }

  }

  get f() {
    return this.form.controls;
  }
  

}

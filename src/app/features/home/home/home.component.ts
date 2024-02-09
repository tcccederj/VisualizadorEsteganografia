import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imagemSelecionada:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  exibirImagemSelecionada(event: any) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      const imagem = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagemSelecionada = reader.result as string;
      };

      reader.readAsDataURL(imagem);
    }
  };
}

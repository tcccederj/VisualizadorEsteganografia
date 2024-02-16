import { Component, OnInit } from '@angular/core';
import { StatusMolder } from '../../molds/Status.molde';
import { DeteccaoEstaganografiaService } from '../services/deteccaoEstaganografia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeDeteccaoComponent implements OnInit {

  imagemSelecionadaUrl: string | undefined; // Alterada para armazenar a URL de dados da imagem
  statusMolder: StatusMolder | undefined;
  imagemSelecionada: File | undefined;

  constructor(private router: Router,private deteccaoEstaganografiaService: DeteccaoEstaganografiaService) { }

  ngOnInit() {
  }

  returnToHomePage() {
    this.router.navigate(['/']);
  }

  exibirImagemSelecionada(event: any) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      const imagem = files[0];
      const reader = new FileReader();
      this.imagemSelecionada = files[0];

      reader.onload = () => {
        this.imagemSelecionadaUrl = reader.result as string; // Armazena a URL de dados da imagem
      };

      reader.readAsDataURL(imagem);
    }
  }

  async detectarEstenografia() {
    if (this.imagemSelecionada) {
      try {
        this.statusMolder = await this.deteccaoEstaganografiaService.decodificarImagem(this.imagemSelecionada);
      } catch (error) {
        console.error('Erro ao decodificar imagem:', error);
      }
    } else {
      console.error('Nenhuma imagem selecionada.');
    }
  }
}


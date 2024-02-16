import { Component, OnInit } from '@angular/core';
import { EsteganografiaService } from '../Services/esteganografia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeEstenografia',
  templateUrl: './homeEstenografia.component.html',
  styleUrls: ['./homeEstenografia.component.scss']
})
export class HomeEstenografiaComponent implements OnInit {
  imagemSelecionada: File | null = null;
  executavelSelecionado: File | null = null;
  novaImagem: Blob | null = null;

  constructor(private router: Router,private esteganografiaService: EsteganografiaService) { }

  ngOnInit() {
  }

  returnToHomePage() {
    this.router.navigate(['/']);
  }

  selecionarImagem(event: any) {
    this.imagemSelecionada = event.target.files[0];
  }

  selecionarExecutavel(event: any) {
    this.executavelSelecionado = event.target.files[0];
  }

  gerarImagem(event: Event) {
    event.preventDefault(); // Evita o recarregamento da página

    if (this.imagemSelecionada && this.executavelSelecionado) {
      this.esteganografiaService.esconderExecutável(this.imagemSelecionada, this.executavelSelecionado)
        .then((novaImagem) => {
          this.novaImagem = novaImagem;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  downloadNovaImagem() {
    if (this.novaImagem) {
      const url = window.URL.createObjectURL(this.novaImagem);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nova-imagem.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error("Nenhuma imagem gerada para download.");
    }
  }
}

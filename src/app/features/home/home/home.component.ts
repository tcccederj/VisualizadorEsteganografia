import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusMolder } from '../../molds/Status.molde';
import { DeteccaoEstaganografiaService } from '../../services/deteccaoEstaganografia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imagemSelecionada: any;
  statusMolder: StatusMolder | undefined;

  constructor(private deteccaoEstaganografiaService: DeteccaoEstaganografiaService) { }

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

      // Chamar o serviço de detecção de esteganografia
      this.deteccaoEstaganografiaService.detectarEsteganografia(imagem)
        .then(statusMolder => {
          this.statusMolder = statusMolder;
        })
        .catch(error => {
          console.error('Erro ao detectar esteganografia:', error);
          this.statusMolder = { status: false, msg: 'Erro ao detectar esteganografia.', codigo: 'ERRO', bat: new Uint8Array() };
        });
    }
  }
}

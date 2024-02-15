import { Component, OnInit } from '@angular/core';
import { EsteganografiaService } from '../Services/esteganografia.service';

@Component({
  selector: 'app-homeEstenografia',
  templateUrl: './homeEstenografia.component.html',
  styleUrls: ['./homeEstenografia.component.scss']
})
export class HomeEstenografiaComponent implements OnInit {
  batFile: File | undefined;
  imageFile: File | undefined;
  imageUrl: string | undefined;

  constructor(private esteganografiaService: EsteganografiaService) { }

  ngOnInit() {
  }

  onBatFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.batFile = input.files[0];
    }
  }

  onImageFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.batFile && this.imageFile) {
      this.esteganografiaService.encodeBatImage(this.imageFile, this.batFile)
        .then(blob => {
          this.imageUrl = window.URL.createObjectURL(blob);
        })
        .catch(error => console.error("Erro ao esconder BAT na imagem:", error));
    } else {
      console.error("Selecione um arquivo BAT e uma imagem.");
    }
  }

  downloadImage() {
    if (this.imageUrl) {
      const a = document.createElement('a');
      a.href = this.imageUrl;
      a.download = 'imagem_com_bat.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(this.imageUrl);
    } else {
      console.error("Nenhuma imagem gerada para download.");
    }
  }
}

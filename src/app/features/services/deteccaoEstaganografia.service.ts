import { Injectable } from '@angular/core';
import { StatusMolder } from '../molds/Status.molde';

@Injectable({
  providedIn: 'root'
})
export class DeteccaoEstaganografiaService {

  constructor() { }

  detectarEsteganografia(imageFile: File): Promise<StatusMolder> {
    return new Promise<StatusMolder>((resolve, reject) => {
      const readerImage = new FileReader();
      readerImage.onload = () => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext('2d');
          ctx!.drawImage(image, 0, 0);
          const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;
          const headerBytes = pixels.slice(0, 8); // Assume que os 8 primeiros bytes representam um cabeçalho
          const isEsteganografia = this.verificarEsteganografia(headerBytes);

          if (isEsteganografia) {
            resolve({ status: true, msg: 'Esteganografia detectada na imagem.', codigo: 'ESTEGANO', bat: new Uint8Array() });
          } else {
            resolve({ status: false, msg: 'Nenhuma esteganografia detectada na imagem.', codigo: 'SEM_ESTEGANO', bat: new Uint8Array() });
          }
        };
        image.src = readerImage.result as string;
      };

      readerImage.readAsDataURL(imageFile);
    });
  }

  private verificarEsteganografia(headerBytes: Uint8ClampedArray): boolean {
    // 1. Verificação de marca d'água
    // Definição da marca d'água
    const watermarkBytes: Uint8Array = new Uint8Array([0x42, 0x4D, 0x50, 0x00]); // "BMP"

    // Comparação com os bytes do cabeçalho
    const isWatermark = watermarkBytes.every((byte, index) => index < headerBytes.length && byte === headerBytes[index]);

    // Retorno do resultado
    if (isWatermark) {
      return true;
    }

    // 2. Verificação de estrutura de dados

    // Validação da estrutura
    const headerSize = headerBytes[0];
    const dataType = headerBytes[1];
    const payloadSize = (headerBytes[2] << 8) | headerBytes[3];
    const isValidStructure = headerBytes.length >= 4 && headerSize === 4 && (dataType === 0 || dataType === 1) && payloadSize > 0;

    // Retorno do resultado
    if (isValidStructure) {
      return true;
    }

    // 3. Retorno padrão (nenhuma esteganografia detectada)
    return false;
  }

}

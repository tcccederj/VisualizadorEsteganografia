import { Injectable } from '@angular/core';
import { StatusMolder } from './../../molds/Status.molde';

@Injectable({
  providedIn: 'root'
})
export class DeteccaoEstaganografiaService {
  constructor() { }

  async decodificarImagem(imagem: Blob): Promise<StatusMolder> {
    const imagemBuffer = await this.blobParaArrayBuffer(imagem);
    const executavelBuffer = this.extrairExecutavel(imagemBuffer);
    if (executavelBuffer) {
      return { status: true, msg: 'Esteganografia detectada na imagem.' };
    } else {
      return { status: false, msg: 'Nenhuma Esteganografia detectada na imagem.' };
    }
  }

  private async blobParaArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  }

  private extrairExecutavel(imagemBuffer: ArrayBuffer): Uint8Array | null {
    // Cabeçalhos de arquivos executáveis comuns
    const cabecalhos: Record<string, number[]> = {
      'MZ': [0x4D, 0x5A], // Windows PE
      'ELF': [0x7F, 0x45, 0x4C, 0x46], // ELF
      'MACHO': [0xCF, 0xFA, 0xED, 0xFE], // Mach-O
    };

    const imagemArray = new Uint8Array(imagemBuffer);
    for (const tipo in cabecalhos) {
      if (Object.prototype.hasOwnProperty.call(cabecalhos, tipo)) {
        const header = new Uint8Array(cabecalhos[tipo]);
        for (let i = 0; i < imagemArray.length - header.length; i++) {
          let match = true;
          for (let j = 0; j < header.length; j++) {
            if (imagemArray[i + j] !== header[j]) {
              match = false;
              break;
            }
          }
          if (match) {
            // Se o cabeçalho foi encontrado, retorna o buffer a partir desse ponto
            return imagemArray.slice(i).slice(header.length);
          }
        }
      }
    }

    // Se nenhum cabeçalho foi encontrado, retorna null
    return null;
  }
}

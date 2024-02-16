import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EsteganografiaService {
  constructor() { }

  esconderExecutável(imagem: File, executavel: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const readerImagem = new FileReader();
      readerImagem.onload = () => {
        const imagemBuffer = new Uint8Array(readerImagem.result as ArrayBuffer);
        
        const readerExecutavel = new FileReader();
        readerExecutavel.onload = () => {
          const executavelBuffer = new Uint8Array(readerExecutavel.result as ArrayBuffer);
          
          const novaImagemBuffer = this.esconderLSB(imagemBuffer, executavelBuffer);
          const novaImagemBlob = new Blob([novaImagemBuffer], { type: imagem.type });
          
          resolve(novaImagemBlob);
        };
        readerExecutavel.onerror = (error) => reject(error);
        readerExecutavel.readAsArrayBuffer(executavel);
      };
      readerImagem.onerror = (error) => reject(error);
      readerImagem.readAsArrayBuffer(imagem);
    });
  }

  esconderLSB(imagemBuffer: Uint8Array, executavelBuffer: Uint8Array): Uint8Array {
    // Converte o executável para um array de bytes
    const bytesExecutavel = Array.from(executavelBuffer);
  
    // Percorre os bytes da imagem
    for (let i = 0; i < imagemBuffer.length; i += 4) {
      // Modifica os bits menos significativos do byte para armazenar um byte do executável
      imagemBuffer[i] &= 0b11111110;
      imagemBuffer[i] |= bytesExecutavel[i / 4] & 0b1;
  
      // Outras manipulações de bytes LSB aqui...
    }

    return imagemBuffer;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EsteganografiaService {

  constructor() { }

  // Função para esconder um arquivo BAT em uma imagem
  encodeBatImage(imageFile: File, batFile: File): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const readerImage = new FileReader();
      const readerBat = new FileReader();

      readerImage.onload = () => {
        readerBat.onload = () => {
          const image = new Image();
          image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx!.drawImage(image, 0, 0);
            const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let bitIndex = 0;
            const batBytes = new Uint8Array(readerBat.result as ArrayBuffer);
            for (const batByte of batBytes) {
              const bits = this.byteToBits(batByte);
              for (const bit of bits) {
                pixels[bitIndex] = (pixels[bitIndex] & ~1) | bit;
                bitIndex += 4;
              }
            }
            ctx!.putImageData(imageData, 0, 0);
            canvas.toBlob((blob) => {
              resolve(blob!);
            }, 'image/png');
          };
          image.src = readerImage.result as string;
        };
        readerBat.readAsArrayBuffer(batFile);
      };

      readerImage.readAsDataURL(imageFile);
    });
  }

  // Função para extrair um arquivo BAT de uma imagem
  decodeBatImage(imageFile: File): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
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
          let bitIndex = 0;
          const batBytes: number[] = [];
          while (bitIndex < pixels.length) {
            const bits = [pixels[bitIndex++] & 1];
            for (let i = 1; i < 8; i++) {
              bits.push(pixels[bitIndex++] & 1);
            }
            const batByte = this.bitsToByte(bits);
            batBytes.push(batByte);
          }
          resolve(new Uint8Array(batBytes));
        };
        image.src = readerImage.result as string;
      };

      readerImage.readAsDataURL(imageFile);
    });
  }

  // Função auxiliar para converter um byte em um array de bits
  private byteToBits(byte: number): number[] {
    const binaryString = byte.toString(2);
    return binaryString.padStart(8, '0').split('').map(Number);
  }

  // Função auxiliar para converter um array de bits em um byte
  private bitsToByte(bits: number[]): number {
    const binaryString = bits.join('');
    return parseInt(binaryString, 2);
  }
}

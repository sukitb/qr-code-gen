import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true, // Make sure to add standalone: true since you're using imports
  imports: [NzButtonModule, NzQRCodeModule, NzInputModule, FormsModule],
  template: `
    <div id="download">
      <input nz-input placeholder="Enter URL" [(ngModel)]="url" />
      <button nz-button nzType="primary" (click)="urlChange()">Generate</button>
      <nz-qrcode [nzValue]="urlToDownload"></nz-qrcode>
      <a #downloadLink></a>
      <button nz-button nzType="primary" (click)="downloadImg()">
        Download
      </button>
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 16px;
        padding: 20px;
      }

      nz-input-group {
        width: 100%;
        max-width: 400px;
      }

      nz-qrcode {
        margin-bottom: 12px;
      }
    `,
  ],
})
export class AppComponent {
  @ViewChild('downloadLink', { static: false }) downloadLink!: ElementRef;

  url: string = '';
  urlToDownload: string = '';

  urlChange(): void {
    this.urlToDownload = this.url;
  }

  downloadImg(): void {
    const canvas = document
      .getElementById('download')
      ?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'qrcode.png';
      this.downloadLink.nativeElement.click();
    }
  }
}

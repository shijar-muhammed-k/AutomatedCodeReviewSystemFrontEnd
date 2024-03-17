import { Injectable } from '@angular/core';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})


export class LoaderService {
  showLoader = true;
  public static ngxUiLoaderConfig: NgxUiLoaderConfig = {
    "bgsColor": "#1ab69d",
    "bgsOpacity": 1,
    "bgsPosition": "center-center",
    "bgsSize": 100,
    "bgsType": "square-jelly-box",
    "blur": 5,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "#11aeef",
    "fgsPosition": "center-center",
    "fgsSize": 60,
    "fgsType": "square-jelly-box",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    "logoUrl": "",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(40, 40, 40, 0.8)",
    "pbColor": "red",
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": true,
    "text": "Loading",
    "textColor": "#000000",
    "textPosition": "center-center",
    "maxTime": -1,
    "minTime": 300
  };
  

  constructor(readonly ngxUiLoaderService: NgxUiLoaderService) {}

  start() {
    if(this.showLoader) {
      this.ngxUiLoaderService.start();
    }
  }

  stop() {
    this.ngxUiLoaderService.stop();
  }

  startWithId(id) {
    this.ngxUiLoaderService.startBackground(id);
  }

  stopWithId(id) {
    this.ngxUiLoaderService.stopBackground(id);
  }
}

import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../../shared/services/request/homeService/home.service";
import {BaseContextService} from "../../../shared/services/base-context.service";
import * as moment from 'moment';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-pod-desktop',
  templateUrl: './pod.component.desktop.html',
  styleUrls: ['./pod.component.desktop.css']
})
export class PodComponentDesktop extends BaseContextService implements OnInit {

  isAutoRefresh;
  refreshSub;
  isLoading =true;
  isDashboardReady =false;
  isDashboardReadyForAvatar =false;
  podTitle;
  podImg;
  podDate;
  podCopyRight;
  podDescription;

  constructor(private homesvc: HomeService) {
    super();
  }

  ngOnInit(): void {
    setTimeout(()=> {
      // console.log(`Navinism Dashboard Component loaded`);
      setTimeout(()=> {
        this.isDashboardReadyForAvatar = true;
      }, 1000);
      this.isLoading = false;
      this.isDashboardReady = true;
      this.loadData();
    }, 2800);
  }

  ngOnDestroy(): void {}

  loadData() {
    this.homesvc.getPictureOfTheDayService().then( (result: any)=> {
      const parsedResp = JSON.parse(result.data);
      this.podTitle = parsedResp.title;
      this.podDate = moment(parsedResp.date).format("MM-DD-YYYY");
      this.podCopyRight = parsedResp.copyright;
      this.podDescription = parsedResp.desc;
      this.podImg = parsedResp.isPicAvail === false ? "assets/picOfTheDay.jpg" : "http://localhost:3010/api/getPicOfTheDay";

    }, error=> {
      // console.log(`at the front err= `, error);
      this.podTitle = "NO PICTURE";
    });

  }

  autoRefresh(){

  }

}

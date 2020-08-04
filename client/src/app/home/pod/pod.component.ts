import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../shared/services/request/homeService/home.service";
import {BaseContextService} from "../../shared/services/base-context.service";
import * as moment from 'moment';

@Component({
  selector: 'app-pod',
  templateUrl: './pod.component.html',
  styleUrls: ['./pod.component.css']
})
export class PodComponent extends BaseContextService implements OnInit {

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
      this.podImg = "http://navinism.org/api/getPicOfTheDay";
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

    }, error=> {
      // console.log(`at the front err= `, error);
      this.podTitle = "NO PICTURE";
    });

  }

  autoRefresh(){

  }

}

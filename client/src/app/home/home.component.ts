import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseContextService} from "../shared/services/base-context.service";
import {HomeService} from "../shared/services/request/homeService/home.service";
import {HttpClient} from "@angular/common/http";
import {from} from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseContextService implements OnInit, OnDestroy {

  refreshSub;
  isLoading = true;
  podTitle;
  podImg;
  podDate;
  podCopyRight;
  podDescription;


  constructor(private homesvc: HomeService, private http: HttpClient) {
    super();

  }


  ngOnInit(): void {
    //DEBUG
    // console.log(`Navinism Dashboard Component loaded`);
    this.loadData();
  }

  ngOnDestroy(): void {}

  loadData() {
    setTimeout( ()=> {

      this.homesvc.getPictureOfTheDayService().then(async (result: any)=> {
        const parsedResp = JSON.parse(result.data);
        this.podTitle = parsedResp.title;
        this.podDate = parsedResp.date;
        this.podCopyRight = parsedResp.copyright;
        this.podDescription = parsedResp.desc;

      }, error=> {
        // console.log(`at the front err= `, error);
        this.podTitle = "NO PICTURE";
      });

      this.isLoading = false;
    }, 2000);
  }

}

import { Injectable } from '@angular/core';
import {BaseContextService} from "../../base-context.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
const httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
import {backendUri} from '../../../common/constants';


@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseContextService {

  constructor(private http: HttpClient) {
    super();
  }

  getPictureOfTheDayService() {
    return new Promise((resolve, reject) => {
      this.http.get(backendUri + '/api/picOfTheDaySvc', {headers: httpHeaders})
        .subscribe(
          (data: any) => {
                  // console.log(`GOT THE DATA FRONTEND SERVICE: \n`, data);
                  if (data.status === 200) {
                    resolve(data);
                  } else {
                    reject('');
                  }
                },
                error => {
                  console.log(error);
                  reject(error);
                }
      );
    });
  }
}

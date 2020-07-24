import { Injectable } from '@angular/core';
import {BaseContextService} from "../../base-context.service";
import {HttpClient} from "@angular/common/http";
import {nasa_api_key} from "../../../common/constants";

@Injectable({
  providedIn: 'root'
})
export class NeoService extends BaseContextService {

  constructor(private http: HttpClient) {
    super();
  }

  getNeoService() {
    let api_key = nasa_api_key;
    return new Promise((resolve, reject) => {
      // this.http.get()
    });
  }

}

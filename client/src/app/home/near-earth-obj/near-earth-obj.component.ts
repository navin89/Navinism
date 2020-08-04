import { Component, OnInit } from '@angular/core';
import {BaseContextService} from "../../shared/services/base-context.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-near-earth-obj',
  templateUrl: './near-earth-obj.component.html',
  styleUrls: ['./near-earth-obj.component.css']
})
export class NearEarthObjComponent extends BaseContextService implements OnInit {

  displayColumns: any =[];
  dataSource = new MatTableDataSource<any>([]);
  tableConfig;
  isLoading =true;
  viewDateTitle;

  constructor() {
    super();
  }

  ngOnInit(): void {}

}

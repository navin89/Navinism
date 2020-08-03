import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseContextService} from "../shared/services/base-context.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseContextService implements OnInit, OnDestroy {


  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}


  reload() {}

}

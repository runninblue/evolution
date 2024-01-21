import { Component } from '@angular/core';
import { NgxSliderModule } from 'ngx-slider-v2';
import { Options } from 'ngx-slider-v2';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgxSliderModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  value: number = -2000;
  highValue: number = 1000;
  options: Options = {
    floor: -11000,
    ceil: 2000,
    step: 1000
  }
}

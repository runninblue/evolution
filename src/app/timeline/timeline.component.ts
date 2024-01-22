import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSliderModule } from 'ngx-slider-v2';
import { Options } from 'ngx-slider-v2';
import { TimelineDetailsService } from '../timeline-details.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, NgxSliderModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  dataLoaded: boolean = false;
  errorMessage!: string;
  timelineDetails: any[] = [];
  floor: number = 0;
  ceil: number = 0;

  constructor(private timelineDetailsService: TimelineDetailsService) { }

  value: number = -2000;
  highValue: number = 1000;

  ngOnInit(): void {
    this.getTimelineDetails();
  }

  getTimelineDetails(): void {
    this.timelineDetailsService.getTimelineDetails().subscribe({
      next: (data) => {
        if (data) {
          this.timelineDetails = data;
          this.timelineInitializer();
          this.dataLoaded = true;
        }
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  timelineInitializer(): void {
    this.value = this.timelineDetails[0][0].start_date;
    this.highValue = this.timelineDetails[0][0].start_date;
  }

  updateOptions(): Options {
    this.floor = this.timelineDetails[0][0].start_date;
    this.ceil = this.timelineDetails[0][47].end_date;
    return {
      floor: this.timelineDetails[0][0].start_date,
      ceil: this.timelineDetails[0][47].end_date,
      step: 100,
      showSelectionBar: true,
      showTicks: true,
      ticksArray: this.getEndDates(),
      translate: (v: number): string => {
        return '<span style="font-size:10px; colour:black;">' + v + '</span>';
      },
      ticksTooltip: (v: number): string => {
        let period_name = '';
        this.timelineDetails[0].forEach((prop: any) => {
          if (v >= prop.start_date && v <= prop.end_date)
            period_name = prop.period_name + " (" + prop.settlement_number + ")";
        });
        return period_name;
      },
    };
  }

  getEndDates(): number[] {
    const endDates: Set<number> = new Set();
    this.timelineDetails[0].forEach((prop: any) => {
      endDates.add(prop.start_date);
    });
    return [...endDates];
  }
}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSliderModule } from 'ngx-slider-v2';
import { Options } from 'ngx-slider-v2';
import { Subject, debounceTime, delay } from 'rxjs';
import { TimelineDetailsService } from '../services/timeline-details.service';
import { FindingService } from '../services/finding.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, NgxSliderModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit, AfterViewInit {
  timelineBounds: any[] = [];
  dataLoaded: boolean = false;
  errorMessage!: string;
  timelineCyprusDetails: any[] = [];
  floor: number = 0;
  ceil: number = 0;
  private rangeSubject = new Subject<any>();

  constructor(private timelineDetailsService: TimelineDetailsService) { }

  value: number = 0;
  highValue: number = 0;

  ngOnInit(): void {
    this.getTimelineBounds();
    this.getCyprusTimelineDetails();
  }

  ngAfterViewInit(): void {
    this.rangeSubject
      .pipe(debounceTime(1000))
      .subscribe((event) => {
        this.timelineDetailsService.setTimeRange(event.value, event.highValue);
      });
  }

  getTimelineBounds(): void {
    this.timelineDetailsService.getTimelineStartEnd()
    .subscribe({
      next: (data) => {
        console.log(data);
        if (data) {
          this.floor = data[0];
          this.ceil = data[1];
        }
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }

  getCyprusTimelineDetails(): void {
    this.timelineDetailsService.getTimelineCyprusDetails().subscribe({
      next: (data) => {
        if (data) {
          this.timelineCyprusDetails = data;
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
    // this.floor = this.timelineBounds[0];
    // this.ceil = this.timelineBounds[1];
    this.value = this.timelineCyprusDetails[0][0].start_date;
    this.highValue = this.timelineCyprusDetails[0][0].start_date;
    this.timelineDetailsService.setTimeRange(this.value, this.highValue);
  }

  updateOptions(): Options {
    return {
      floor: this.floor,
      ceil: this.ceil,
      step: 100,
      showSelectionBar: true,
      showTicks: true,
      ticksArray: this.getEndDates(),
      translate: (v: number): string => {
        return '<b style="font-size:12px; colour:black;">' + v + '</b>';
      },
      ticksTooltip: (v: number): string => {
        let period_name = '';
        this.timelineCyprusDetails[0].forEach((prop: any) => {
          if (v >= prop.start_date && v <= prop.end_date)
            period_name = prop.period_name + " (" + prop.settlement_number + ")";
        });
        return period_name;
      },
    };
  }

  getEndDates(): number[] {
    const endDates: Set<number> = new Set();
    this.timelineCyprusDetails[0].forEach((prop: any) => {
      endDates.add(prop.start_date);
    });
    return [...endDates];
  }

  onSliderChange(event: any): void {
    this.rangeSubject.next(event);
  }
}

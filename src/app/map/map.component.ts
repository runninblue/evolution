import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import { MarkerService } from '../services/marker.service';
import { TimelineDetailsService } from '../services/timeline-details.service';
import { SettlementsDetailsService } from '../services/settlements-details.service';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { PopupService } from '../services/popup.service';
import { FindingService } from '../services/finding.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule,
    LeafletMarkerClusterModule
  ],
  providers: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  errorMessage!: string;
  layers: any;
  layersControl: any;
  options = {
    layers: [
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png')
    ],
    attributionControl: false,
    zoom: 8,
    center: L.latLng([35.1264, 33.4299]),
    zoomControl: false,
  };
  markers: L.LayerGroup = new L.LayerGroup();
  markerClusterData: L.MarkerClusterGroup = new L.MarkerClusterGroup();
  markerClusterOptions: L.MarkerClusterGroupOptions = {};
  findingsNearEast: any[] = [];

  constructor(
    // private markerService: MarkerService,
    private timelineDetailsService: TimelineDetailsService,
    private settlementDetailsService: SettlementsDetailsService,
    private findingsService: FindingService,
    private popupService: PopupService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.timelineDetailsService.sliderValues$.subscribe(
      (rangeVals) => {
        this.clearMarkers();
        if (rangeVals.length) {
          this.settlementDetailsService.getSettlementsInRange(rangeVals)
            .subscribe((settlements) => {
              if (settlements.settlements[0]) {
                this.makeSettlementMarkers(settlements.settlements[0]);
              }
              if (settlements.findings) {
                this.makeFindingMarkers(settlements.findings);
              }
              this.map.addLayer(this.markerClusterData);
            });
        }
      }
    )
  }

  private makeSettlementMarkers(settlemets: any[]) {
    for (let settlement of settlemets) {
      let marker = L.circleMarker([Number(settlement.details[0].lat), Number(settlement.details[0].long)],
      {
        className: 'settlement',
      })
      .on({
        click: (e) => {
          let selectedSettlement = settlement.details.id;
          let popup = e.target.getPopup();
          this.popupService.generateSettlementPopupText(settlement, popup)
        }
      })
      .bindPopup(
        '',
      {
        keepInView: true,
        className: 'labelstyle',
      });
      this.markerClusterData.addLayer(marker);
    }
  }

  private clearMarkers(): void {
    this.markerClusterData.clearLayers();
  }

  onMapReady(map: L.Map) {
    this.map = map;
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);
    // map.setView([20, 10], 3, { animate: true, duration: 5 });
  }

  markerClusterReady(event: any) {
    console.log("HERE");
  }

  private makeFindingMarkers(findings: any[]): void {
    for (let finding of findings) {
      let marker = L.circleMarker([Number(finding.lat), Number(finding.long)],
      {
        className: 'finding',
        color: 'red',
        fillOpacity: 1,
        radius: 3,
      })
      .on({
        click: (e) => {
          let selectedFinding = finding.finding_id;
          let popup = e.target.getPopup();
          this.popupService.generateFindingPopupText(finding, popup)
        }
      })
      .bindPopup('',
      {
        keepInView: true,
        className: 'labelstyle',
      });
      this.markerClusterData.addLayer(marker);
    }
  }
}

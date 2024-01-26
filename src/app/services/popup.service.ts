import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  generateSettlementPopupText(settlement: any, popup: any) {
    let popupInfo: string = '';
    popupInfo += `<b>${settlement.toponym}</b>`;
    popupInfo += `<br/><br/>`;
    let period_names = settlement.period_names.join(', ');
    popupInfo += `Period(s): ` + period_names;
    popupInfo += `<br/>`;
    popupInfo += `Type: ` + settlement.details[0].type;
    popup.setContent(popupInfo);
    popup.update();
  }

  generateFindingPopupText(finding: any, popup: any): void {
    let popupInfo: string = '';
    popupInfo += `<b>${finding.site_name}</b>`;
    popupInfo += `<br/><br/>`;
    popupInfo += `Material: ${finding.material}`;
    popupInfo += `<br/>`;
    popupInfo += `Species: ${finding.species}`;
    popupInfo += `<br/>`;
    popupInfo += `Type: ${finding.site_type}`;
    popupInfo += `<br/>`;
    popupInfo += `Date: ${finding.date}`;
    popup.setContent(popupInfo)
    popup.update();
  }
}

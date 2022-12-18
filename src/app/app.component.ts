import { Component, OnInit } from '@angular/core';
import { Coordinate } from 'ol/coordinate';

interface ILayer {
  markers: {
    id: string;
    text?: string;
    coordinate: number[]
  }[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ol-map';
  show = false;
  zoom = 1;
  interval: any;
  corners?: Coordinate[];
  layers: ILayer[] = [
    {
      markers: [
        {
          id: '1',
          coordinate: [78.9629, 20.5937]
        },
        {
          id: '2',
          coordinate: [104.1954, 35.8617]
        }
      ]
    }
  ];
  coordinates = [
    [76.9658243346941, 8.611538817290826],
    [77.0653940758712, 8.628240666373555],
    [77.06610856914463, 8.582119568825444]
  ]

  ngOnInit() {
    this.interval = setInterval(() => {
      this.zoom === 30 && clearInterval(this.interval);
      this.zoom++;
    }, 1000);
  }
  onClick() {
    // this.show = !this.show;
    this.corners = [
      [76.95939389523315, 8.632075427792222],
      [76.95413726615, 8.577224549628795],
      [77.08136810405594, 8.632529541696169],
      [77.08218466779701, 8.585450164365161]
    ]
    setTimeout(() => {
      this.addNewLayer();
    }, 5100);
  }
  addNewLayer() {
    this.layers.push({
      markers: [
        {
          id: '3',
          text: 'Hello',
          coordinate: [77.00486628856416, 8.60679555949417]
        },
        {
          id: '4',
          coordinate: [77.06365887792141, 8.596804247598863]
        }
      ]
    })
  }

  onFeatureClick(featureId: string) {
    console.log('feature clicked', featureId);
  }
}

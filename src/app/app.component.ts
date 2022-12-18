import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ol-map';
  show = false;
  ngOnInit() {
    setTimeout(() => {
      console.log('setTimeout');
      this.show = true;
    }, 3000);
    setTimeout(() => {
      console.log('setTimeout');
      this.show = false;
    }, 5000);
  }
}

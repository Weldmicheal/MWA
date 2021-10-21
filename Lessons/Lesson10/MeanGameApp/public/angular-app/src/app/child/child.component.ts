import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() childX!:number;
  @Input() childY!:number

  z!:number

  @Output()
  addEvent:EventEmitter<number> = new EventEmitter<number>();

  //addEvent = new EventEmitter<number>(); // or


  constructor() { }

  ngOnInit(): void {
  }

  add():void{
    this.z = this.childX+this.childY
    this.addEvent.emit(this.z)
  }

}

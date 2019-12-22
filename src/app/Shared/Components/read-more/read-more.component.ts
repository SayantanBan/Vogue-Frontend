import { Component, Input, ElementRef, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements AfterViewInit {

  //the text that need to be put in the container
  @Input() text: string;

  //maximum height of the container
  @Input() maxHeight: number = 100;

  //set these to false to get the height of the expended container 
  public isCollapsed: boolean = false;
  public isCollapsable: boolean = false;
  public currentHeight: any;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    setTimeout(_ => {this.currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
     if (this.currentHeight > this.maxHeight) {
      this.isCollapsed = true;
      this.isCollapsable = true;
    }
  });
  }
}

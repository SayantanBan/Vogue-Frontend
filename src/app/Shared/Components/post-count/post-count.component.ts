import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../Models/Category';

@Component({
  selector: 'app-post-count',
  templateUrl: './post-count.component.html',
  styleUrls: ['./post-count.component.scss']
})
export class PostCountComponent implements OnInit {

  categories: Category[]

  constructor(private service: CategoryService) { }

  // Holds the selected value of the radio button
  selectedRadioButtonValue: string = '0';

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.service.getAllCategories().subscribe(result => {
      this.categories = result
    },
      error => console.log(error))
  }

  @Output()
  countRadioButtonSelectionChanged: EventEmitter<string> =
    new EventEmitter<string>();

  onRadioButtonSelectionChange(id: string) {
    this.countRadioButtonSelectionChanged
      .emit(id);
  }

}

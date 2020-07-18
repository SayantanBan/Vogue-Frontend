import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteNewPostRoutingModule } from './write-new-post-routing.module';
import { NewPostComponent } from './new-post/new-post.component';
import {QuillModule} from 'ngx-quill'
import { ReactiveFormsModule } from '@angular/forms';import {
  MatButtonModule, MatCheckboxModule, MatSidenavModule, MatAutocompleteModule,
  MatBadgeModule, MatBottomSheetModule, MatButtonToggleModule, MatCardModule,
  MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatTreeModule, MatFormFieldModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

@NgModule({
  declarations: [NewPostComponent],
  imports: [
    CommonModule,
    QuillModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    WriteNewPostRoutingModule
  ]
})
export class WriteNewPostModule { }

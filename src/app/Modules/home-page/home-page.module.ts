import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-page-routing.module';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReadMoreComponent } from 'src/app/Shared/Components/read-more/read-more.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { DashboardComponent, LoginDialog } from './dashboard/dashboard.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  MatButtonModule, MatCheckboxModule, MatSidenavModule, MatAutocompleteModule,
  MatBadgeModule, MatBottomSheetModule, MatButtonToggleModule, MatCardModule,
  MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { PostCountComponent } from 'src/app/Shared/Components/post-count/post-count.component';

@NgModule({
  declarations: [AllPostsComponent, ReadMoreComponent, PostDetailComponent, DashboardComponent, UserPostsComponent, LoginDialog, PostCountComponent],
  imports: [
    CommonModule,
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
    NgxPaginationModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  entryComponents: [LoginDialog]
})
export class HomePageModule { }

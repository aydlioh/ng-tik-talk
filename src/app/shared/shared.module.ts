import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './ui/tag/tag.component';
import { ButtonComponent } from './ui/button/button.component';

@NgModule({
  declarations: [],
  exports: [ButtonComponent, TagComponent],
  imports: [CommonModule, TagComponent, ButtonComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './ui/tag/tag.component';
import { ButtonComponent } from './ui/button/button.component';
import { ImgUrlPipe } from './pipes/img-url.pipe';

@NgModule({
  declarations: [],
  exports: [ButtonComponent, TagComponent, ImgUrlPipe],
  imports: [CommonModule, TagComponent, ButtonComponent, ImgUrlPipe],
})
export class SharedModule {}

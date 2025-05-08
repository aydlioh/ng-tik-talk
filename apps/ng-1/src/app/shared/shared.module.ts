import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './ui/tag/tag.component';
import { ButtonComponent } from './ui/button/button.component';
import { ImgUrlPipe } from './pipes/img-url.pipe';
import { InputComponent } from '@/shared/ui/input/input.component';

@NgModule({
  declarations: [],
  exports: [ButtonComponent, TagComponent, InputComponent, ImgUrlPipe],
  imports: [
    CommonModule,
    TagComponent,
    ButtonComponent,
    InputComponent,
    ImgUrlPipe,
  ],
})
export class SharedModule {}

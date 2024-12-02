import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  @Input() size: 'large' | 'small' = 'small';

  private spinnerSizeMap = {
      large: '160',
      small: '80',
  };

  get spinnerSize() {
      return this.spinnerSizeMap[this?.size] ?? this.spinnerSizeMap['small'];
  }
}

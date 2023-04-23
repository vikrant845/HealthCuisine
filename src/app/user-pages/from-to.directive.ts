import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFromTo]'
})
export class FromToDirective {

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  @Input('appFromTo') set render(obj: { from: number, to: number }) {
    this.viewContainerRef.clear();
    for (let i = obj.from; i <= obj.to; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, { i });
    }
  }
  
}

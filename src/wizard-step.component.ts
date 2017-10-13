import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'wizard-step',
  template:
  `
    <div [hidden]="!isActive">
      <ng-content></ng-content>
    </div>
  `
})
export class WizardStepComponent {
  @Input() title: string;
  @Input() hidden: boolean = false;
  @Input() isValid: boolean = true;
  @Input() showNext: boolean = true;
  @Input() showPrev: boolean = true;

  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPrev: EventEmitter<any> = new EventEmitter<any>();
  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();

  private _isActive: boolean = false;
  isDisabled: boolean = true;

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  @Input('isActive')
  set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.isDisabled = false;
    this._changeDetectorRef.detectChanges(); // workaround for ISSUE https://github.com/angular/angular/issues/6005
  }

  get isActive(): boolean {
    return this._isActive;
  }

}

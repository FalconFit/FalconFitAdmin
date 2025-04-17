import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {IonPopover, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-role-selectable',
  templateUrl: './role-selectable.component.html',
  styleUrls: ['./role-selectable.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RoleSelectableComponent),
    multi: true
  }]
})
export class RoleSelectableComponent implements OnInit, ControlValueAccessor {
  @Input() role: string = '';

  @ViewChild('popover', { read: IonPopover }) popover: IonPopover | undefined;

  disabled: boolean = false;

  propagateChange = (obj: any) => {}
  propagateTouched = () => {}

  constructor(
    public navParams : NavParams
  ) {}

  ngOnInit() {
    this.role = this.navParams.get('role')
    this.writeValue(this.role);
  }

  writeValue(value: string): void {
    if (value) {
      this.role = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectRole(role: string, popover: IonPopover): void {
    this.role = role;
    this.propagateChange(role);
    this.propagateTouched();
    popover.dismiss();
  }
}

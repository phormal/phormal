import {EventHandler, FormFieldType} from '../globals'
import {SuperForm} from '../../index'

export default interface FormFieldInterface {
  type: FormFieldType;
  name: string;
  defaultValue?: string | number;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string[];

  render(mountingEl: HTMLElement): void;
  runAllValidators(): void;
  getValue(): string | number | undefined;
  setValue(value: string | number): void;

  _form: SuperForm | undefined;
  _errorMessages?: { [key: string]: string | object };

  _onClick: (event: Event) => void;
  _onChange: (event: Event) => void;
  _onBlur: (event: Event) => void;
  _onFocus: (event: Event) => void;
  _onInput: (event: Event) => void;

  _onClickHandlers: EventHandler[];
  _onChangeHandlers: EventHandler[];
  _onBlurHandlers: EventHandler[];
  _onFocusHandlers: EventHandler[];
  _onInputHandlers: EventHandler[];

  // Allow extensibility
  [key: string]: any;
}
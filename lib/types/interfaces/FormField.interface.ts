import {EventHandler, FormFieldType} from '../globals'
import {VNode} from 'maquette'
import SuperForm from '../../index'

export default interface FormFieldInterface {
  form: SuperForm | undefined;

  type: FormFieldType;
  name: string;
  defaultValue?: string | number;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string[];

  render(): VNode;

  onClick: (event: Event) => void;
  onChange: (event: Event) => void;
  onBlur: (event: Event) => void;
  onFocus: (event: Event) => void;
  onInput: (event: Event) => void;

  onClickHandlers: EventHandler[];
  onChangeHandlers: EventHandler[];
  onBlurHandlers: EventHandler[];
  onFocusHandlers: EventHandler[];
  onInputHandlers: EventHandler[];

  // Allow extensibility
  [key: string]: any;
}
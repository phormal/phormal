import FormFieldInterface from './FormField.interface'

export default interface EventHandlers {
  handleOnClick?: (event: Event, field?: FormFieldInterface) => void;
  handleOnInput?: (event: Event, field?: FormFieldInterface) => void;
  handleOnChange?: (event: Event, field?: FormFieldInterface) => void;
  handleOnFocus?: (event: Event, field?: FormFieldInterface) => void;
  handleOnBlur?: (event: Event, field?: FormFieldInterface) => void;
}
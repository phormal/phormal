import FormFieldInterface from "./FormField.interface";
import {RadioButtonOption} from "../globals";

export default interface RadioGroupInterface extends FormFieldInterface {
  options: RadioButtonOption[];
}
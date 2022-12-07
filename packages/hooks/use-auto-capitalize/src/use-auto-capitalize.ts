import {HookReturnValue} from "../../../core/src/types/interfaces/Hook.interface";

export const useAutoCapitalize = (): HookReturnValue => {
  return {
    handleOnInput(event: Event, field) {
      if (!(event.target instanceof HTMLInputElement)) return

      const words = (event instanceof InputEvent
        ? event.target.value
        : field.form.getValue(field.name)).split(' ')

      for (let i = 0; i < words.length; i++) {
        if (!words[i]) continue

        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
      }

      field.setValue(words.join(' '))
    }
  }
}
import {HookReturnValue} from "@phormal/core/src/types/interfaces/Hook.interface";

export const useAutoCapitalize = (): HookReturnValue => {
  return {
    handleOnInput(event: Event, field) {
      const words = (field.getValue() as string).split(' ')

      for (let i = 0; i < words.length; i++) {
        if (!words[i]) continue

        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
      }

      field.setValue(words.join(' '))
    }
  }
}
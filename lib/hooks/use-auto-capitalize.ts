import {HookReturnValue} from '../types/interfaces/Hook.interface'

export const useAutoCapitalize = (): HookReturnValue => {
  return {
    validators: {
      onInputCallback(event?: { target: HTMLInputElement }) {
        const words = (event instanceof InputEvent
          ? event.target.value
          : this.form.getValue(this.name)).split(' ')

        console.log(words)

        for (let i = 0; i < words.length; i++) {
          if (!words[i]) continue

          words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }

        this.setValue(words.join(' '))
      }
    }
  }
}
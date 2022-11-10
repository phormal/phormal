export type Hook = (...args: any) => HookReturnValue

export type HookReturnValue = {
  [key: string] : any;
  validateFunctions?: { [key: string]: any };
}

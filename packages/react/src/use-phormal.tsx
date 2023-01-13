import { useState, useEffect, DependencyList } from 'react'
import {Phormal} from "@phormal/core/src";
import FormConfig, {FormFieldConfig} from "@phormal/core/src/types/interfaces/FormConfig.interface";

export const usePhormal = (
  fields: Record<string, FormFieldConfig>,
  config: Partial<FormConfig> = {},
  deps: DependencyList = []
) => {
  const [phormal, setPhormal] = useState<
    Phormal
    | { fields: Record<string, FormFieldConfig>, config: FormConfig }
    | null
    >(null)

  useEffect(() => {
    if (config.el) {
      // @ts-ignore
      const instance = new Phormal(fields, config)

      setPhormal(instance)
    }
  }, deps)

  return phormal
}

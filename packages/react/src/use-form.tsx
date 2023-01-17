import { useState } from 'react'
import {Phormal} from "../../core/src";
import FormConfig, {FormFieldConfig} from "../../core/src/types/interfaces/FormConfig.interface";

export const useForm = (
  fields: Record<string, FormFieldConfig>,
  config: Partial<FormConfig> = {},
) => {
  config = {
    ...config,
    el: config.el || '#phormal-react',
    autoInit: false,
  }

  const instance = new Phormal(fields, config as FormConfig)

  const [phormal] = useState<Phormal>(instance)

  return phormal
}

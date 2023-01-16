import { Phormal } from './Phormal'
import { FormField } from './FormField'

import { useEmail } from './hooks/use-email'
import { useRequired } from './hooks/use-required'
import { useLength } from "./hooks/use-length";
import { useRegex } from "./hooks/use-regex";
import { useAutoCapitalize } from "./hooks/use-auto-capitalize";
import { useValidZip } from "./hooks/use-valid-zip";
import { useUrl } from "./hooks/use-url";
import { useMinMax } from "./hooks/use-min-max";

export {
  // Export the main Modules and APIs
  Phormal,
  FormField,

  // Export hooks
  useEmail,
  useRequired,
  useLength,
  useRegex,
  useAutoCapitalize,
  useValidZip,
  useUrl,
  useMinMax,
}

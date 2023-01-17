import {FormContent, useForm} from "../../packages/react/src";
import {useLength} from "../../packages/core/src";
import React from "react";

export default function () {
  const [values, setValues] = React.useState<null|Record<string, any>>(null)

  const formSchema = useForm(
    {
      name: {
        label: 'Name',
        hooks: [useLength(2, 100)],
      },
      country: {
        label: 'Country',
        type: 'select',
        options: [
          {value: 'us', label: 'United States'},
          {value: 'ca', label: 'Canada'},
          {value: 'mx', label: 'Mexico'},
          {value: 'fr', label: 'France'},
          {value: 'de', label: 'Germany'},
        ],
        value: 'mx',
      },
      agree: {
        label: 'Agree to terms',
        type: 'checkbox',
        value: false,
      }
    },
  );

  const getValues = () => {
    setValues(formSchema.$values());
  }

  return <>
    <div style={{ width: '90%', maxWidth: '700px', margin: '0 auto' }}>
      <FormContent instance={formSchema} />

      <button id={'get-values'} onClick={getValues}>Get values</button>

      <code id={'values'}>
        <pre>
          {JSON.stringify(values, null, 2)}
        </pre>
      </code>
    </div>
  </>
}

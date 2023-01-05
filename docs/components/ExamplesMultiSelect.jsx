import {Phormal} from "@phormal/core";
import {useEffect} from "react";

const BasicDemo = () => {

  useEffect(() => {
    if (typeof window === 'undefined' || window.location === 'undefined') return;

    let theme = 'basic'
    if (window.location.href.includes('theme=material')) theme = 'material'

    const form = new Phormal({
      country: {
        label: 'Country',
        type: 'select',
        options: [
          { value: 'US', label: 'United States' },
          { value: 'CA', label: 'Canada' },
          { value: 'MX', label: 'Mexico' },
          { value: 'BR', label: 'Brazil' },
          { value: 'AR', label: 'Argentina' },
        ]
      },
      state: {
        type: 'select',
        placeholder: 'This field has no label',
        options: [
          { value: 'CA', label: 'California' },
          { value: 'TX', label: 'Texas' },
          { value: 'NY', label: 'New York' },
          { value: 'FL', label: 'Florida' },
          { value: 'IL', label: 'Illinois' },
          { value: 'PA', label: 'Pennsylvania' },
          { value: 'OH', label: 'Ohio' },
          { value: 'GA', label: 'Georgia' },
          { value: 'NC', label: 'North Carolina' },
        ],
      }
    }, {
      el: '#phormal-multiselect',
      theme,
    })
  }, [])

  return <>
    <br />
    <div id="phormal-multiselect"></div>
  </>
}

export default BasicDemo
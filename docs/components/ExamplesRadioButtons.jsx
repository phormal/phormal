import {Phormal} from "@phormal/core";
import {useEffect} from "react";

const BasicDemo = () => {

  useEffect(() => {
    if (typeof window === 'undefined' || window.location === 'undefined') return;

    let theme = 'basic'
    if (window.location.href.includes('theme=material')) theme = 'material'

    const form = new Phormal({
      paymentMethod: {
        label: 'Payment method',
        type: 'radiogroup',
        value: 'creditcard',
        options: [
          {value: 'creditcard', label: 'Credit card'},
          {value: 'paypal', label: 'PayPal'},
          {value: 'bitcoin', label: 'Bitcoin'}
        ]
      },
    }, {
      el: '#phormal-radio-buttons',
      theme,
    })
  }, [])

  return <>
    <br />
    <div id="phormal-radio-buttons"></div>
  </>
}

export default BasicDemo
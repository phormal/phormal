import {Phormal} from "@phormal/core";
import {useEffect} from "react";

const BasicDemo = () => {

  useEffect(() => {
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
      theme: 'basic',
    })
  }, [])

  return <>
    <br />
    <div id="phormal-radio-buttons"></div>
  </>
}

export default BasicDemo
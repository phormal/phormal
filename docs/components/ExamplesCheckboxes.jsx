import {Phormal} from "@phormal/core";
import {useEffect} from "react";

const BasicDemo = () => {

  useEffect(() => {
    const form = new Phormal({
      wantsNewsletter: {
        label: 'Do you want to receive our newsletter?',
        type: 'checkbox',
        value: false,
      },
      acceptsTerms: {
        label: 'Do you accept our terms and conditions?',
        type: 'checkbox',
        value: true,
      }
    }, {
      el: '#phormal-checkboxes',
      theme: 'basic',
    })
  }, [])

  return <>
    <br />
    <div id="phormal-checkboxes"></div>
  </>
}

export default BasicDemo
import {Phormal} from "@phormal/core";
import {useEffect} from "react";

const BasicDemo = () => {

  useEffect(() => {
    if (typeof window === 'undefined' || window.location === 'undefined') return;

    let theme = 'basic'
    if (window.location.href.includes('theme=material')) theme = 'material'

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
      theme,
    })
  }, [])

  return <>
    <br />
    <div id="phormal-checkboxes"></div>
  </>
}

export default BasicDemo
import {Phormal} from "@phormal/core";
import {useEffect} from "react";

const ExamplesThemeSwitch = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || window.location === 'undefined') return;

    let theme = 'basic'
    if (window.location.href.includes('theme=material')) theme = 'material'

    const form = new Phormal({
      theme: {
        label: 'Theme',
        type: 'radiogroup',
        value: theme,
        options: [
          { value: 'basic', label: 'Basic' },
          { value: 'material', label: 'Material' },
        ],
        handleOnInput: (e) => {
          const theme = e.target.value
          const query = new URLSearchParams(window.location.search);
          query.set('theme', theme)
          window.location.href = window.location.pathname + '?' + query.toString()
        }
      },
    }, {
      el: '#theme-switch',
      theme,
    })
  }, [])

  return <>
    <br />
    <div id="theme-switch"></div>
  </>
}

export default ExamplesThemeSwitch
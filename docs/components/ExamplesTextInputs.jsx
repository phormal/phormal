import {Phormal} from "@phormal/core";
import {useEffect} from "react";
import useEmail from "@phormal/use-email";
import useRequired from "@phormal/use-required";
import useLength from "@phormal/use-length";
import useAutoCapitalize from "@phormal/use-auto-capitalize";

const BasicDemo = () => {

  useEffect(() => {
    if (typeof window === 'undefined' || window.location === 'undefined') return;

    let theme = 'basic'
    if (window.location.href.includes('theme=material')) theme = 'material'

    const form = new Phormal({
      firstName: {
        label: 'First name',
        hooks: [useRequired(), useLength(3, 155)],
      },
      lastName: {
        label: 'Last name',
        disabledIf: { firstName: 'empty' },
        placeholder: 'Enter your last name',
        hooks: [useAutoCapitalize()],
      },
      email: {
        label: 'Email',
        type: 'email',
        hooks: [useEmail()],
        value: 'john@doe.com'
      },
      password: {
        label: 'Password',
        type: 'password',
      },
      age: {
        label: 'Age',
        type: 'number',
        value: 18,
        disabled: true,
      },
      year: {
        label: 'Birthyear',
        type: 'number',
        row: 'birthdate'
      },
      month: {
        label: 'Month',
        type: 'number',
        row: 'birthdate'
      },
      day: {
        label: 'Day',
        type: 'number',
        row: 'birthdate'
      }
    }, {
      el: '#phormal',
      theme,
    })
  }, [])

  return <>
    <br />
    <div id="phormal"></div>
  </>
}

export default BasicDemo
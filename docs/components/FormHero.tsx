import React, {useEffect} from 'react';
import {Phormal} from "@phormal/core";
import useRequired from "@phormal/use-required";
import useEmail from "@phormal/use-email";

const FormHero = () => {
  const form = new Phormal({
    email: {
      type: 'email',
      // hooks: [useRequired(), useEmail()]
    },
    password: {
      type: 'password',
      // hooks: [useRequired()]
    }
  }, {
    el: '#form-hero',
  })

  useEffect(() => {
    if (typeof window === 'object') {
      form.init()
    }
  })

  return <>
    <div>
      hello Tom

      <div id="form-hero">

      </div>
    </div>
  </>
}

export default FormHero;
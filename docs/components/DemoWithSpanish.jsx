import {Phormal} from "@phormal/core";
import {useEffect} from "react";
import useEmail from "@phormal/use-email";
import useRequired from "@phormal/use-required";
import useLength from "@phormal/use-length";

const BasicDemo = () => {

  useEffect(() => {
    const form = new Phormal({
      name: {
        label: 'Name',
        hooks: [useRequired(), useLength(3)],
      },
      email: {
        label: 'Email',
        hooks: [useRequired(), useEmail()],
      }
    }, {
      el: '#phormal',
      theme: 'basic',
      language: 'es',
    })

    // TODO: remove after 0.1.0-alpha.5
    if (typeof form.init === 'function') {
      form.init()
    }
  }, [])

  return <>
    <br />
    <div id="phormal">

    </div>
  </>
}

export default BasicDemo
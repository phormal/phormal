import {Phormal} from "@phormal/core";
import {useEffect} from "react";
import useEmail from "@phormal/use-email";

const BasicDemo = () => {

  useEffect(() => {
    const form = new Phormal({
      email: {
        value: "",
        type: 'text',
        label: 'Email',
        hooks: [useEmail()],
      }
    }, {
      el: '#phormal',
      theme: 'basic',
    })

    form.init()
  }, [])

  return <>
    <div id="phormal">

    </div>
  </>
}

export default BasicDemo
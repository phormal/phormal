import React, {useEffect} from 'react';
import styles from './demo.module.scss'
import {Phormal} from "@phormal/core/src/Phormal";
import useEmail from "@phormal/use-email";
import useRequired from "@phormal/use-required";

const DemoPage: React.FC = () => {
  const formFields = {
    email: {
      type: 'email',
      // hooks: [useRequired(), useEmail()]
    },
    password: {
      type: 'password',
    }
  }

  const formConfig = {
    el: '#form-demo',
  }

  const form = new Phormal(formFields, formConfig)

  useEffect(() => {
    if (typeof window === 'object') {
      form.init()
    }
  })

  return <>
    <div className={styles.demoPage}>
      hello Tom
    </div>
  </>
}

export default DemoPage;
import React, {useEffect} from 'react';
import {Phormal} from "@phormal/core/src";

type props = {
  instance: Phormal|null;
}

const FormContent: React.FC<props> = ({instance}) => {

  console.log(instance)

  const [phormal,] = React.useState<Phormal | null>(instance);
  const [formId,] = React.useState<string>((Math.random() + 1).toString(36).substring(7));



  useEffect(() => {
    // if (instance) {
    //   setTimeout(() => {
    //     console.log(instance?._config?.el)
    //   }, 1000)
    // }
  }, [instance]);

  return <>
    <div id={formId}></div>
  </>
}

export default FormContent;
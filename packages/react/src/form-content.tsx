import React, {useEffect} from 'react';
import {Phormal} from "../../core/src";
import FormConfig from "../../core/src/types/interfaces/FormConfig.interface";

type props = {
  instance: Phormal|null;
}

const FormContent: React.FC<props> = ({instance}) => {
  const [formId, setFormId] = React.useState<string>('phormal-react');

  useEffect(() => {
    if (instance) {
      setFormId((instance?._config as FormConfig)?.el?.replace('#', ''));
      instance._init();
    }

    return () => {
      if (instance) {
        instance.$destroy();
      }
    }
  }, [instance]);

  return (
    <div id={formId}></div>
  )
}

export default FormContent;

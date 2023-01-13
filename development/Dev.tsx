import {usePhormal} from "@phormal/react/src";
import {FormContent} from "@phormal/react/src";
import React from "react";

export default function () {
  const phormal = usePhormal(
    { name: { label: 'Name' } },
    // { el: '#phormal-react'}
  );

  return <>
    <div style={{ width: '90%', maxWidth: '700px', margin: '0 auto' }}>
      <FormContent instance={phormal} />
      {/*<div id="phormal-react"></div>*/}
    </div>
  </>
}

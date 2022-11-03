import React, { useState } from 'react';
import { EuiSelect, useGeneratedHtmlId } from '@elastic/eui';

export default ({ options, value,setvalue}) => {
  
  const onChange = (e) => {
    setvalue(e.target.value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
      <EuiSelect
      compressed={true}
        size={'xs'}
        width={100}
        // id={basicSelectId}
        options={options}
        value={value}
        onChange={(e) => onChange(e)}
        aria-label="Use aria labels when no actual label is in use"
      />
  );
};
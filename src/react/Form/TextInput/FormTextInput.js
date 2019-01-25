import React from 'react';
import Input from 'src/react/Input/Input';

const FormTextInput = ({ onEnter, onSubmitEditing, ...props }) => {
  return (
    <Input
      onSubmitEditing={() => {
        if (onEnter) onEnter();
        if (onSubmitEditing) onSubmitEditing();
      }}
      {...props}
    />
  );
};

export default FormTextInput;

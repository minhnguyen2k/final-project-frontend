import { TextField, TextFieldProps } from '@mui/material';
import { Field, FieldProps, getIn } from 'formik';
import React, { FC } from 'react';

const TextFieldFormik: FC<TextFieldProps> = (props) => {
  return <Field {...props} component={TextFieldWrapper} />;
};

const TextFieldWrapper: FC<FieldProps> = ({ field, form, children, ...props }) => {
  const helperText: string = getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <TextField
      variant="outlined"
      size="medium"
      fullWidth
      required
      autoComplete={field.name}
      id={field.name}
      {...field}
      {...props}
      error={Boolean(helperText)}
      helperText={helperText}
    >
      {children}
    </TextField>
  );
};

export default TextFieldFormik;

import * as Yup from 'yup';

export const validateInput = (input, objectToUpdate) => {
  const { message, name, type, isRequired } = input;

  switch (type) {
    case 'email':
      objectToUpdate[name] = Yup.string()
        .email('Please enter a valid email address')
        .required(message);
      break;

    case 'string':
      objectToUpdate[name] = isRequired
        ? Yup.string().required(message)
        : Yup.string().typeError('enter a num');
      break;

    case 'number':
      objectToUpdate[name] = isRequired
        ? Yup.number()
            .typeError('Please enter a number')
            .positive('Must be a positive number')
            .required('This field is required')
        : Yup.number().typeError('Please enter a number').positive('Must be a positive number');
      break;

    default:
      break;
  }
};

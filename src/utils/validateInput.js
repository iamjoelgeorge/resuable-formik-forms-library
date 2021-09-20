import * as Yup from 'yup';

const MAX_FILE_SIZE = 217100001;

export const validateInput = (input, objectToUpdate) => {
  const {
    message,
    name,
    type,
    formats,
    maxSize = MAX_FILE_SIZE,
    isRequired = false,
    minChars = {},
    maxChars = {},
  } = input;

  // [ToDo]: This function needs to be cleaned up
  const validateString = () => {
    if (isRequired) {
      if (minChars.num && maxChars.num) {
        objectToUpdate[name] = Yup.string()
          .min(minChars?.num, minChars?.message)
          .max(maxChars?.num, maxChars?.message)
          .required(message);
      } else if (minChars.num) {
        objectToUpdate[name] = Yup.string().min(minChars.num, minChars.message).required(message);
      } else if (maxChars.num) {
        objectToUpdate[name] = Yup.string().max(maxChars.num, maxChars.message).required(message);
      } else {
        objectToUpdate[name] = Yup.string().required(message);
      }
    } else {
      if (minChars.num && maxChars.num) {
        objectToUpdate[name] = Yup.string()
          .min(minChars?.num, minChars?.message)
          .max(maxChars?.num, maxChars?.message);
      } else if (minChars.num) {
        objectToUpdate[name] = Yup.string().min(minChars.num, minChars.message);
      } else if (maxChars.num) {
        objectToUpdate[name] = Yup.string().max(maxChars.num, maxChars.message);
      }
    }
  };

  switch (type) {
    case 'email':
      objectToUpdate[name] = Yup.string()
        .email('Please enter a valid email address')
        .required(message);
      break;

    case 'checkbox':
      objectToUpdate[name] = Yup.bool().oneOf([true], message);
      break;

    case 'checkbox_group':
      objectToUpdate[name] = Yup.array().min(1, message);
      break;

    case 'radio_button_group':
      objectToUpdate[name] = Yup.string().required(message);
      break;

    case 'string':
      validateString();
      break;

    case 'number':
      objectToUpdate[name] = isRequired
        ? Yup.number()
            .typeError('Please enter a number')
            .positive('Must be a positive number')
            .required(message)
        : Yup.number().typeError('Please enter a number').positive('Must be a positive number');
      break;

    case 'file':
      objectToUpdate[name] = isRequired
        ? Yup.array()
            .min(1, message)
            .of(
              Yup.mixed()
                .test('fileSize', 'File Size is too large', (value) => value.size <= maxSize)
                .test('fileType', formats.message, (value) => formats.formats.includes(value.type)),
            )
        : Yup.array().of(
            Yup.mixed()
              .test('fileSize', 'File Size is too large', (value) => value.size <= maxSize)
              .test('fileType', formats.message, (value) => formats.formats.includes(value.type)),
          );
      break;

    case 'calendar_datepicker':
      objectToUpdate[name] = isRequired
        ? Yup.string().nullable().required(message)
        : Yup.string().nullable();
      break;

    default:
      break;
  }
};

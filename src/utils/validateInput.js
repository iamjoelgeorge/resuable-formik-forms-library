import * as Yup from 'yup';

const MAX_FILE_SIZE = 217100001;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const fileSizeErrorMessage = `Only the following formats are allowed: ${SUPPORTED_FORMATS.join(
  ', ',
)}`;

export const validateInput = (input, objectToUpdate) => {
  const { message, name, type, isRequired } = input;

  switch (type) {
    case 'email':
      objectToUpdate[name] = Yup.string()
        .email('Please enter a valid email address')
        .required(message);
      break;

    case 'checkbox':
      objectToUpdate[name] = Yup.bool().oneOf([true], message);
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

    case 'file':
      objectToUpdate[name] = isRequired
        ? Yup.array()
            .min(1, 'Please upload a file')
            .of(
              Yup.mixed()
                .test('fileSize', 'File Size is too large', (value) => value.size <= MAX_FILE_SIZE)
                .test('fileType', fileSizeErrorMessage, (value) =>
                  SUPPORTED_FORMATS.includes(value.type),
                ),
            )
        : Yup.array().of(
            Yup.mixed()
              .test('fileSize', 'File Size is too large', (value) => value.size <= MAX_FILE_SIZE)
              .test('fileType', fileSizeErrorMessage, (value) =>
                SUPPORTED_FORMATS.includes(value.type),
              ),
          );
      break;

    default:
      break;
  }
};

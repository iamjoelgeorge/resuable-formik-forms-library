import * as Yup from 'yup';
import { dateValidation } from '../constants/strings';
import { getFullDate } from './utils';

const {
  minDateOnly,
  maxDateOnly,
  maxDaysInThePastOnly,
  maxDaysInTheFutureOnly,
  minDateAndMaxDate,
  minDateAndMaxDaysInFuture,
  maxDaysInPastAndMaxDate,
  maxDaysInPastAndMaxDaysInFuture,
} = dateValidation;

const MAX_FILE_SIZE = 217100001;

export const validateInput = (validation, objectToUpdate) => {
  const {
    message,
    name,
    type,
    formats,
    maxSize = MAX_FILE_SIZE,
    isRequired = false,
    minChars = {},
    maxChars = {},
  } = validation;

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

  const getCaseToValidateTheDate = (validationObj) => {
    if (validationObj?.maxDaysInThePast?.num && validationObj?.maxDaysInTheFuture?.num)
      return maxDaysInPastAndMaxDaysInFuture;
    if (validationObj?.maxDaysInThePast?.num && validationObj?.maxDate?.date)
      return maxDaysInPastAndMaxDate;
    if (validationObj?.minDate?.date && validationObj?.maxDaysInTheFuture?.num)
      return minDateAndMaxDaysInFuture;
    if (validationObj?.maxDaysInThePast?.num) return maxDaysInThePastOnly;
    if (validationObj?.maxDaysInTheFuture?.num) return maxDaysInTheFutureOnly;
    if (validationObj?.minDate?.date && validationObj?.maxDate?.date) return minDateAndMaxDate;
    if (validationObj?.minDate?.date) return minDateOnly;
    if (validationObj?.maxDate?.date) return maxDateOnly;
  };

  const validateDate = (caseToValidate) => {
    objectToUpdate[name] = isRequired && Yup.date().nullable().required(message);

    const today = new Date();

    switch (caseToValidate) {
      case maxDaysInPastAndMaxDaysInFuture:
        let pastDateOne = getFullDate(today, validation.maxDaysInThePast.num, false);
        let futureDateOne = getFullDate(today, validation.maxDaysInTheFuture.num);

        objectToUpdate[name] = Yup.date()
          .transform((value) => value)
          .min(pastDateOne, validation.maxDaysInThePast.message)
          .max(futureDateOne, validation.maxDaysInTheFuture.message);
        break;

      case maxDaysInPastAndMaxDate:
        const pastDateTwo = getFullDate(today, validation.maxDaysInThePast.num, false);

        objectToUpdate[name] = Yup.date()
          .transform((value) => value)
          .min(new Date(pastDateTwo), validation.maxDaysInThePast.message)
          .max(new Date(validation.maxDate.date), validation.maxDate.message);
        break;

      case minDateAndMaxDaysInFuture:
        let futureDateTwo = getFullDate(today, validation.maxDaysInTheFuture.num);

        objectToUpdate[name] = Yup.date()
          .transform((value) => value)
          .min(new Date(validation.minDate.date), validation.minDate.message)
          .max(futureDateTwo, validation.maxDaysInTheFuture.message);
        break;

      case minDateAndMaxDate:
        objectToUpdate[name] = Yup.date()
          .transform((value) => value)
          .min(new Date(validation.minDate.date), validation.minDate.message)
          .max(new Date(validation.maxDate.date), validation.maxDate.message);
        break;

      case maxDaysInThePastOnly:
        const pastDateThree = getFullDate(today, validation.maxDaysInThePast.num, false);
        objectToUpdate[name] = Yup.date()
          .transform((value) => value)
          .min(pastDateThree, validation.maxDaysInThePast.message);
        break;

      case maxDaysInTheFutureOnly:
        const futureDateThree = getFullDate(today, validation.maxDaysInTheFuture.num);
        objectToUpdate[name] = Yup.date()
          .transform((value) => value)
          .max(futureDateThree, validation.maxDaysInTheFuture.message);
        break;

      case minDateOnly:
        objectToUpdate[name] = Yup.date()
          .transform((value) => value)
          .min(new Date(validation.minDate.date), validation.minDate.message);
        break;

      case maxDateOnly:
        objectToUpdate[name] = Yup.date()
          .transform((value) => value)
          .max(new Date(validation.maxDate.date), validation.maxDate.message);
        break;

      default:
        break;
    }
  };

  // Main switch case for validation
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

    case 'dropdown':
      objectToUpdate[name] = isRequired ? Yup.string().required(message) : Yup.string();
      break;

    case 'custom_dropdown':
      objectToUpdate[name] = isRequired
        ? Yup.object()
            .nullable()
            .shape({
              label: Yup.string(),
              value: Yup.string(),
            })
            .required(message)
        : Yup.object().nullable().shape({
            label: Yup.string(),
            value: Yup.string(),
          });
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
    case 'dropdown_datepicker':
      const caseToValidate = getCaseToValidateTheDate(validation);
      validateDate(caseToValidate);
      break;

    default:
      break;
  }
};

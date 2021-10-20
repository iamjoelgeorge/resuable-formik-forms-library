import * as Yup from 'yup';
import { commonValidation, dateValidation, switchCases } from '../constants/strings';
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

const { minAndMax, onlyMax, onlyMin, noLimits } = commonValidation;

const MAX_FILE_SIZE = 217100001;

export const validateInput = (validation, objectToUpdate) => {
  const {
    isRequiredDependsOnField,
    message,
    name,
    type,
    formats,
    maxSize = MAX_FILE_SIZE,
    isRequired = false,
    minChars = {},
    maxChars = {},
  } = validation;

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
        const pastDateOne = getFullDate(today, validation.maxDaysInThePast.num, false);
        const futureDateOne = getFullDate(today, validation.maxDaysInTheFuture.num);

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
        const futureDateTwo = getFullDate(today, validation.maxDaysInTheFuture.num);

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

  const getCaseToValidate = () => {
    if (minChars.num && maxChars.num) return minAndMax;
    if (minChars.num) return onlyMin;
    if (maxChars.num) return onlyMax;
    return noLimits;
  };

  const validateNumber = (onlyPositiveWithZero = false) => {
    const regexForAllIntegers = /^-?([0]{1}\.{1}[0-9]+|[1-9]{1}[0-9]*\.{1}[0-9]+|[0-9]+|0)$/;
    const regexForOnlyPositiveIntegersIncludingZero = /^[0-9]+$/;

    return Yup.string().matches(
      onlyPositiveWithZero ? regexForOnlyPositiveIntegersIncludingZero : regexForAllIntegers,
      'Please enter a valid number',
    );
  };

  const validate = (type) => {
    const caseToValidate = getCaseToValidate();

    switch (caseToValidate) {
      case minAndMax:
        return type === switchCases.number
          ? validateNumber()
              .min(minChars?.num, minChars?.message)
              .max(maxChars?.num, maxChars?.message)
          : type === switchCases.positiveIntegerIncludingZero
          ? validateNumber(true)
              .min(minChars?.num, minChars?.message)
              .max(maxChars?.num, maxChars?.message)
          : Yup[type]().min(minChars?.num, minChars?.message).max(maxChars?.num, maxChars?.message);

      case onlyMin:
        return type === switchCases.number
          ? validateNumber().min(minChars?.num, minChars?.message)
          : type === switchCases.positiveIntegerIncludingZero
          ? validateNumber(true).min(minChars?.num, minChars?.message)
          : Yup[type]().min(minChars.num, minChars.message);

      case onlyMax:
        return type === switchCases.number
          ? validateNumber().max(maxChars?.num, maxChars?.message)
          : type === switchCases.positiveIntegerIncludingZero
          ? validateNumber(true).max(maxChars?.num, maxChars?.message)
          : Yup[type]().max(maxChars.num, maxChars.message);

      default:
        return type === switchCases.number
          ? validateNumber()
          : type === switchCases.positiveIntegerIncludingZero
          ? validateNumber(true)
          : Yup[type]();
    }
  };

  const dropdownSelectionIsRequired = () =>
    Yup.object()
      .nullable()
      .shape({
        label: Yup.string(),
        value: Yup.string().required(message),
      })
      .required(message);

  const validateSwitchCase = (yupValidation) => {
    return !!isRequiredDependsOnField
      ? yupValidation.when(isRequiredDependsOnField, (theOtherField) => {
          if (!!theOtherField) return yupValidation.required(message);
        })
      : isRequired
      ? yupValidation.required(message)
      : yupValidation;
  };

  // Main switch case for validation
  switch (type) {
    case switchCases.email:
      objectToUpdate[name] = validateSwitchCase(
        validate(switchCases.string).email('Please enter your email address'),
      );
      break;

    case switchCases.checkbox:
      objectToUpdate[name] = !!isRequiredDependsOnField
        ? Yup.bool().when(isRequiredDependsOnField, (theOtherField) => {
            if (!!theOtherField) return Yup.bool().oneOf([true], message);
          })
        : isRequired
        ? Yup.bool().oneOf([true], message)
        : Yup.bool();
      break;

    case switchCases.checkboxGroup:
      objectToUpdate[name] = !!isRequiredDependsOnField
        ? Yup.array().when(isRequiredDependsOnField, (theOtherField) => {
            if (!!theOtherField) return Yup.array().min(1, message);
          })
        : isRequired
        ? Yup.array().min(1, message)
        : Yup.array();
      break;

    case switchCases.radioButtonGroup:
      objectToUpdate[name] = validateSwitchCase(Yup.string());
      break;

    case switchCases.string:
      objectToUpdate[name] = validateSwitchCase(validate(switchCases.string));
      break;

    case switchCases.number:
      objectToUpdate[name] = validateSwitchCase(validate(switchCases.number));
      break;

    case switchCases.positiveIntegerIncludingZero:
      objectToUpdate[name] = validateSwitchCase(validate(switchCases.positiveIntegerIncludingZero));
      break;

    case switchCases.dropdown:
      objectToUpdate[name] = !!isRequiredDependsOnField
        ? Yup.object().when(isRequiredDependsOnField, (theOtherField) => {
            if (!!theOtherField) return dropdownSelectionIsRequired();
          })
        : isRequired
        ? dropdownSelectionIsRequired()
        : Yup.object().nullable().shape({
            label: Yup.string(),
            value: Yup.string(),
          });
      break;

    case switchCases.file:
      const validateFile = Yup.array().of(
        Yup.mixed()
          .test('fileSize', 'File Size is too large', (value) => value.size <= maxSize)
          .test('fileType', formats.message, (value) => formats.formats.includes(value.type)),
      );

      objectToUpdate[name] = !!isRequiredDependsOnField
        ? validateFile.when(isRequiredDependsOnField, (theOtherField) => {
            if (!!theOtherField) return validateFile.min(1, message);
          })
        : isRequired
        ? validateFile.min(1, message)
        : validateFile;
      break;

    case switchCases.calendarDatepicker:
    case switchCases.dropdownDatepicker:
      const caseToValidate = getCaseToValidateTheDate(validation);
      validateDate(caseToValidate);
      break;

    default:
      break;
  }
};

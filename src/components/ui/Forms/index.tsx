import {withFormFieldWrapper} from './FormField';

import CheckBox from './Inputs/CheckBox';
import ImageInput from './Inputs/ImageInput';
import DatePickerInput from './Inputs/DatePickerInput';
import Input from './Inputs/Input';
import RadioInput from './Inputs/RadioInput';
import SplitInput from './Inputs/SplitInput';

export const FormInput = withFormFieldWrapper(Input);
export const FormImageInput = withFormFieldWrapper(ImageInput);
export const FormDatePickerInput = withFormFieldWrapper(DatePickerInput);
export const FormCheckBoxInput = withFormFieldWrapper(CheckBox);
export const FormRadioInput = withFormFieldWrapper(RadioInput);
export const FormSplitInput = withFormFieldWrapper(SplitInput);

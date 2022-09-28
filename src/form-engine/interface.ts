import { FormInstance } from 'antd/lib/form/hooks/useForm';
import React from 'react';
import { FormLayout } from 'antd/es/form/Form';

export enum QuestionType {
  select = 'select',
  textInput = 'textInput',
  checkbox = 'checkbox',
  radio = 'radio',
  title = 'title',
}

export enum AlignDirection {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export interface Question {
  label: string;
  name?: string;
  type: QuestionType;
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  selectOptions?: SelectOption[];
  required?: boolean;
  optionDirection?: AlignDirection;
  conditionalExtra?: Question;
  dependentKeys?: string | string[];
  toMatchValue?: any;
  determineFn?: (form: FormInstance) => boolean;
}

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface IFormEngine {
  questions: Question[];
  formName: string;
  form: FormInstance;
  onFinish: (values: any) => void;
  footer?: React.ReactElement;
  layout?: FormLayout;
}

import React from 'react';
import { Select, Form, Checkbox, Col, Row, Input, Radio } from 'antd';
import { Question, IFormEngine, QuestionType, AlignDirection } from './interface';
import { useDynamicForm } from '../hooks/useDynamicForm';
import styled from 'styled-components';

const FollowingQuestionWrapper = styled.div`
  margin-top: -24px;
  margin-left: 24px;
`;

export const FormEngine = ({
  questions,
  formName,
  form,
  onFinish,
  footer,
  layout = 'vertical',
}: IFormEngine) => {
  const { ConditionWrapper } = useDynamicForm(form);

  const renderSelect = ({
    selectOptions,
    label,
    disabled,
    multiple,
    name,
    placeholder,
    required,
  }: Question) => {
    return (
      <Form.Item label={label} name={name} required={required} key={name}>
        <Select
          disabled={disabled}
          placeholder={placeholder}
          mode={multiple ? 'multiple' : undefined}
          options={selectOptions}
        />
      </Form.Item>
    );
  };

  const renderSectionTitle = ({ label }: Question) => {
    return <h2 key={label}>{label}</h2>;
  };

  const renderCheckbox = ({
    selectOptions,
    label,
    disabled,
    name,
    required,
    optionDirection,
  }: Question) => {
    const DirectionWrapper = optionDirection === AlignDirection.vertical ? Col : Row;
    const Direction = optionDirection === AlignDirection.vertical ? Row : Col;
    return (
      <Form.Item label={label} name={name} required={required} key={name}>
        <Checkbox.Group disabled={disabled}>
          <DirectionWrapper>
            {selectOptions?.map((o) => (
              <Direction key={o.value}>
                <Checkbox value={o.value}>{o.label}</Checkbox>
              </Direction>
            ))}
          </DirectionWrapper>
        </Checkbox.Group>
      </Form.Item>
    );
  };

  const renderTextInput = ({ label, disabled, name, required }: Question) => {
    return (
      <Form.Item label={label} name={name} required={required} key={name}>
        <Input disabled={disabled} />
      </Form.Item>
    );
  };

  const renderRadio = ({
    selectOptions,
    label,
    disabled,
    name,
    required,
    optionDirection = AlignDirection.horizontal,
  }: Question) => {
    const DirectionWrapper = optionDirection === AlignDirection.vertical ? Col : Row;
    const Direction = optionDirection === AlignDirection.vertical ? Row : Col;
    return (
      <Form.Item label={label} name={name} required={required} key={name}>
        <Radio.Group disabled={disabled}>
          <DirectionWrapper>
            {selectOptions?.map((o) => (
              <Direction key={o.value}>
                <Radio value={o.value}>{o.label}</Radio>
              </Direction>
            ))}
          </DirectionWrapper>
        </Radio.Group>
      </Form.Item>
    );
  };

  const renderFlow: { [key in QuestionType]?: (question: Question) => React.ReactElement } = {
    select: renderSelect,
    title: renderSectionTitle,
    checkbox: renderCheckbox,
    radio: renderRadio,
    textInput: renderTextInput,
  };

  const renderByType = (question: Question) => {
    const { conditionalExtra, name } = question;
    return (
      <React.Fragment key={name}>
        {renderFlow[question.type]?.(question)}
        {conditionalExtra && (
          <FollowingQuestionWrapper>
            <ConditionWrapper
              dependentKeys={conditionalExtra.dependentKeys!}
              determineFn={conditionalExtra.determineFn!}
            >
              {renderByType(conditionalExtra)}
            </ConditionWrapper>
          </FollowingQuestionWrapper>
        )}
      </React.Fragment>
    );
  };

  return (
    <Form name={formName} form={form} onFinish={onFinish} layout={layout}>
      {questions.map((q) => {
        return renderByType(q);
      })}
      {footer}
    </Form>
  );
};

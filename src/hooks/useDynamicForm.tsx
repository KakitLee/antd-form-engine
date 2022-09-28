import { Form } from 'antd';
import React, { FC } from 'react';
import { FormInstance } from 'antd/lib/form/hooks/useForm';

interface ConditionProps {
  children: React.ReactElement | undefined | null;
  dependentKeys: string | string[];
  toMatchValue?: any;
  showWhenMatched?: boolean;
  determineFn?: (form: FormInstance) => boolean;
}

export const useDynamicForm = (form: FormInstance) => {
  const ConditionWrapper: FC<ConditionProps> = ({
    children,
    dependentKeys,
    toMatchValue,
    showWhenMatched = true,
    determineFn,
  }) => {
    const currentValues = Form.useWatch(dependentKeys, form);

    /**
     *  If there is no custom determineFn to determine how to show this field,
     *  we just consider that when current value(dependentKeys value) match the toMatchValue then
     */
    if (!determineFn) {
      if (
        (currentValues === toMatchValue && showWhenMatched) ||
        (!showWhenMatched && currentValues !== toMatchValue)
      ) {
        return <>{children}</>;
      } else {
        return null;
      }
    } else {
      return determineFn(form) ? <>{children}</> : null;
    }
  };

  return { ConditionWrapper };
};

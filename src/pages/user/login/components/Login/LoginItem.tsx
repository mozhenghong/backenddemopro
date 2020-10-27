import { Form, Input } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { GetFieldDecoratorOptions } from 'antd/es/form/Form';

import ItemMap from './map';
import LoginContext, { LoginContextProps } from './LoginContext';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type WrappedLoginItemProps = Omit<LoginItemProps, 'form' | 'type' | 'updateActive'>;
export type LoginItemKeyType = keyof typeof ItemMap;
export interface LoginItemType {
  UserName: React.FC<WrappedLoginItemProps>;
  Password: React.FC<WrappedLoginItemProps>;
}

export interface LoginItemProps extends GetFieldDecoratorOptions {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  buttonText?: React.ReactNode;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  countDown?: number;
  updateActive?: LoginContextProps['updateActive'];
  type?: string;
  defaultValue?: string;
  form?: FormComponentProps['form'];
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tabUtil?: LoginContextProps['tabUtil'];
}

interface LoginItemState {}

const FormItem = Form.Item;

class WrapFormItem extends Component<LoginItemProps, LoginItemState> {
  static defaultProps = {};

  interval: number | undefined = undefined;

  constructor(props: LoginItemProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { updateActive, name = '' } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getFormItemOptions = ({ onChange, defaultValue, customProps = {}, rules }: LoginItemProps) => {
    const options: {
      rules?: LoginItemProps['rules'];
      onChange?: LoginItemProps['onChange'];
      initialValue?: LoginItemProps['defaultValue'];
    } = {
      rules: rules || (customProps.rules as LoginItemProps['rules']),
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  render() {
    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
    const {
      onChange,
      customProps,
      defaultValue,
      rules,
      name,
      updateActive,
      type,
      form,
      tabUtil,
      ...restProps
    } = this.props;
    if (!name) {
      return null;
    }
    if (!form) {
      return null;
    }
    const { getFieldDecorator } = form;
    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);
    const otherProps = restProps || {};
    return (
      <FormItem>
        {getFieldDecorator(name, options)(<Input {...customProps} {...otherProps} />)}
      </FormItem>
    );
  }
}

const LoginItem: Partial<LoginItemType> = {};

Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  LoginItem[key] = (props: LoginItemProps) => (
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </LoginContext.Consumer>
  );
});

export default LoginItem as LoginItemType;

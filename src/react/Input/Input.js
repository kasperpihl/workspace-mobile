import React, { PureComponent } from 'react';
import FormLabel from 'src/react/FormLabel/FormLabel';
import SW from './Input.swiss';

export default class Input extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
      secureTextEntry: props.secureTextEntry || false,
    };
    this.displayToggle = props.secureTextEntry || false;
  }
  render() {
    const { label, textContentType, ...rest } = this.props;
    const { secureTextEntry } = this.state;

    return (
      <SW.Wrapper>
        <FormLabel label={label} />
        <SW.PassToggle
          display={this.displayToggle}
          onPress={() => {
            this.setState({ secureTextEntry: !secureTextEntry });
          }}
        />
        <SW.TextInput
          secureTextEntry={secureTextEntry}
          textContentType={textContentType}
          autoCapitalize={'none'}
          {...rest}
        />
      </SW.Wrapper>
    );
  }
}

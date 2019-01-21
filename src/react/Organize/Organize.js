import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import withRequests from 'swipes-core-js/components/withRequests';
import { Text } from 'react-native';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import SW from './Organize.swiss';

const addButton = {
  id: 'Add',
  component: {
    name: 'IconTouchableWrapper',
    passProps: {
      icon: 'add',
      fill: 'blue',
      width: '17',
      height: '17',
      onPress: () => {
        Navigation.showModal(navigationComponents.ProjectAdd);
      },
    },
  },
};

@withRequests(
  {
    project: {
      request: {
        url: 'project.list',
        body: {},
        resPath: 'projects',
      },
      cache: {
        path: props => ['projects'],
      },
    },
  },
  { renderLoader: () => <Text>loading</Text> }
)
export default class Organize extends PureComponent {
  constructor(props) {
    super(props);

    console.log(props);
  }
  componentWillMount() {
    Navigation.mergeOptions('Organize', {
      topBar: {
        rightButtons: [addButton],
      },
    });
  }
  render() {
    return (
      <SW.Wrapper>
        <SW.HeaderText>Organize</SW.HeaderText>
      </SW.Wrapper>
    );
  }
}

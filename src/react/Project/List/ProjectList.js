import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import withRequests from 'swipes-core-js/components/withRequests';
import { FlatList, ActivityIndicator } from 'react-native';
import ProjectListItem from 'src/react/Project/List/Item/ProjectListItem';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import SW from './ProjectList.swiss';

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
    projects: {
      request: {
        url: 'project.list',
        resPath: 'projects',
      },
      cache: {
        path: ['projectList'],
      },
    },
  },
  {
    renderLoader: () => (
      <SW.LoaderContainer>
        <ActivityIndicator size="large" color="#007AFF" />
      </SW.LoaderContainer>
    ),
  }
)
class ProjectList extends PureComponent {
  render() {
    const { projects } = this.props;

    return (
      <SW.FlatListWrapper>
        <FlatList
          data={projects ? projects.toJS() : []}
          keyExtractor={item => item.project_id}
          renderItem={({ item }) => <ProjectListItem {...item} />}
        />
      </SW.FlatListWrapper>
    );
  }
}

export default class ProjectListWrapper extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    Navigation.mergeOptions('ProjectList', {
      topBar: {
        rightButtons: [addButton],
      },
    });
  }
  render() {
    const { projects } = this.props;

    return (
      <SW.Wrapper>
        <SW.HeaderText>Projects</SW.HeaderText>
        <ProjectList projects={projects} />
      </SW.Wrapper>
    );
  }
}

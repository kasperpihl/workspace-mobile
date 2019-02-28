import React, { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';
import usePaginationRequest from 'core/react/_hooks/usePaginationRequest';
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

export default function ProjectList() {
  useEffect(() => {
    Navigation.mergeOptions('ProjectList', {
      topBar: {
        rightButtons: [addButton],
      },
    });
  }, []);

  const req = usePaginationRequest(
    'project.list',
    {},
    {
      cursorKey: 'skip',
      idAttribute: 'project_id',
      resultPath: 'projects',
    }
  );

  const renderLoader = () => {
    if (req.error || req.loading) {
      return (
        <SW.LoaderContainer>
          <ActivityIndicator size="large" color="#007AFF" />
        </SW.LoaderContainer>
      );
    }
  };

  const renderList = () => {
    if (!req.error || !req.loading) {
      const projects = req.items;

      return (
        <SW.FlatListWrapper>
          <FlatList
            data={projects ? projects : []}
            keyExtractor={item => item.project_id}
            renderItem={({ item }) => <ProjectListItem {...item} />}
            onEndReached={() => req.fetchNext()}
            onEndReachedThreshold={0}
          />
        </SW.FlatListWrapper>
      );
    }
  };

  return (
    <SW.Wrapper>
      <SW.HeaderText>Projects</SW.HeaderText>
      {renderLoader()}
      {renderList()}
    </SW.Wrapper>
  );
}

import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import merge from 'deepmerge';
import orgGetBelonging from 'swipes-core-js/utils/org/orgGetBelonging';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import ProgressCircle from 'src/react/ProgressCircle/ProgressCircle';
import SW from './ProjectListItem.swiss';

export default class ProjectListItem extends PureComponent {
  handleListClick = projectId => () => {
    Navigation.push('ProjectList', {
      component: merge(navigationComponents.ProjectOverview, {
        passProps: {
          projectId,
        },
      }),
    });
  };
  render() {
    const { project_id, name, owned_by, completion_percentage } = this.props;

    return (
      <TouchableOpacity onPress={this.handleListClick(project_id)}>
        <SW.Wrapper>
          <SW.LeftSide>
            <ProgressCircle percent={completion_percentage} />
          </SW.LeftSide>
          <SW.Middle>
            <SW.LineOfText numberOfLines={1} topic>
              {name}
            </SW.LineOfText>
            <SW.LineOfText numberOfLines={1}>
              {orgGetBelonging(owned_by)}
            </SW.LineOfText>
          </SW.Middle>
        </SW.Wrapper>
      </TouchableOpacity>
    );
  }
}

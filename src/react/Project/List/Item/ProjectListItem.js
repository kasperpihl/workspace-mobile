import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import merge from 'deepmerge';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import orgGetBelonging from 'swipes-core-js/utils/org/orgGetBelonging';
import navigationComponents from 'src/utils/navigationComponentsSettings';
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
            <AnimatedCircularProgress
              size={22}
              width={11}
              backgroundWidth={11}
              fill={completion_percentage}
              tintColor="#05A851"
              duration={0}
              rotation={0}
              backgroundColor="#D5EDD1"
            />
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

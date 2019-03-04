import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import merge from 'deepmerge';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import orgGetBelonging from 'core/utils/org/orgGetBelonging';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import colors from 'src/utils/colors';
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
    const { project_id, title, owned_by, completion_percentage } = this.props;

    return (
      <TouchableOpacity onPress={this.handleListClick(project_id)}>
        <SW.Wrapper>
          <SW.LeftSide>
            <AnimatedCircularProgress
              size={22}
              width={11}
              backgroundWidth={11}
              fill={completion_percentage}
              tintColor={colors['green']}
              duration={0}
              rotation={0}
              backgroundColor={colors['green5']}
            />
          </SW.LeftSide>
          <SW.Middle>
            <SW.LineOfText numberOfLines={1} topic>
              {title}
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

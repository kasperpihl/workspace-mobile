import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import merge from 'deepmerge';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import teamGetBelonging from 'core/utils/team/teamGetBelonging';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import colors from 'src/utils/colors';
import SW from './ProjectListItem.swiss';

export default class ProjectListItem extends PureComponent {
  handleListClick = (projectId, projectTitle) => () => {
    Navigation.push('ProjectList', {
      component: merge(navigationComponents.ProjectOverview, {
        passProps: {
          projectId,
          projectTitle,
        },
      }),
    });
  };
  render() {
    const { project_id, title, owned_by, completion_percentage } = this.props;

    return (
      <TouchableOpacity onPress={this.handleListClick(project_id, title)}>
        <SW.Wrapper>
          <SW.LeftSide>
            <AnimatedCircularProgress
              size={22}
              width={11}
              backgroundWidth={11}
              fill={completion_percentage}
              tintColor={colors['green1']}
              duration={0}
              rotation={0}
              backgroundColor={colors['green4']}
            />
          </SW.LeftSide>
          <SW.Middle>
            <SW.LineOfText numberOfLines={1} topic>
              {title}
            </SW.LineOfText>
            <SW.LineOfText numberOfLines={1}>
              {teamGetBelonging(owned_by)}
            </SW.LineOfText>
          </SW.Middle>
        </SW.Wrapper>
      </TouchableOpacity>
    );
  }
}

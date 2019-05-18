import mixpanel from 'react-native-mixpanel';
import getGlobals from 'src/utils/getGlobals';
import { mixpanelToken } from 'src/utils/configKeys';

const globals = getGlobals();

export default class Analytics {
  constructor(store) {
    mixpanel.sharedInstanceWithToken(mixpanelToken);
    this.store = store;
    this.userId = null;
    store.subscribe(this.storeChange);
  }
  getDefaultEventProps() {
    const version = globals.get('version');
    const platform = globals.get('platform');
    const defs = {
      sw_client: 'mobile',
      sw_version: version,
      sw_platform: platform,
    };

    return defs;
  }
  logout() {
    mixpanel.reset();
  }
  sendEvent = (name, ownedBy, data) => {
    if (typeof ownedBy === 'object') {
      data = ownedBy;
      ownedBy = null;
    }
    const defs = this.getDefaultEventProps();
    const props = Object.assign(defs, data);
    props['Team ID'] = 'Personal';
    if (typeof ownedBy === 'string' && ownedBy.startsWith('T')) {
      props['Team ID'] = ownedBy;
    }
    mixpanel.trackWithProperties(name, props);
  };
  storeChange = () => {
    const { me, teams } = this.store.getState();

    if (me && me.get('user_id') && me.get('user_id') !== this.userId) {
      this.userId = me.get('user_id');
      mixpanel.identify(this.userId);
      mixpanel.setOnce({
        $email: me.get('email'), // only special properties need the $
        $created: me.get('created_at'),
        $first_name: me.get('first_name'),
        $last_name: me.get('last_name'),
      });
      // don't have getGroup method for now
      // teams.forEach(team => {
      //   mixpanel.get_group('team_id', team.get('team_id')).set({
      //     name: team.get('name'),
      //     'Number of users': team.get('users').size,
      //     'Is paying': !!team.get('stripe_subscription_id'),
      //   });
      // });
    }
  };
}

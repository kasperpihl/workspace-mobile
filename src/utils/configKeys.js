const isDev = __DEV__;
let mixpanelToken = '280f53ea477a89ca86e0f7c8825528ca';

if (isDev) {
  mixpanelToken = 'cdb182baa17a94f1a4ace32ad04c2322';
}

export { mixpanelToken };

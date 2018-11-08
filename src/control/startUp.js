import Vue from 'vue';
import axios from 'axios';
import DeviceStateTracker from 'seng-device-state-tracker';
import VueExposePlugin from '../util/VueExposePlugin';
import { URLNames, PropertyNames, VariableNames } from '../data/enum/configNames';
import { RouteNames } from '../router/routes';
import { createPath } from '../util/routeUtils';
import Params from '../data/enum/Params';
import { getValue } from '../util/injector';
import { CONFIG_MANAGER, GATEWAY } from '../data/Injectables';
import localeLoader from '../util/localeLoader';
import { mediaQueries, deviceState } from '../data/mediaQueries.json';
import bowser from '../util/bowser';

const initPlugins = () => {
  const configManager = getValue(CONFIG_MANAGER);

  document.documentElement.setAttribute('data-browser', bowser.browser.name);
  document.documentElement.setAttribute('data-browserVersion', bowser.browser.version);
  document.documentElement.setAttribute('data-device', bowser.platform.type);
  document.documentElement.setAttribute('data-os', bowser.os.name);
  document.documentElement.setAttribute('data-env', process.env.NODE_ENV);

  const cleanMediaQueries = Object.keys(mediaQueries).reduce((result, key) => {
    result[key] = mediaQueries[key].replace(/'/g, '');
    return result;
  }, {});

  // expose objects to the Vue prototype for easy access in your vue templates and components
  Vue.use(VueExposePlugin, {
    $config: configManager,
    $gateway: getValue(GATEWAY),
    $http: axios,
    $isTablet: bowser.platform.type === 'tablet',
    $isMobile: bowser.platform.type === 'mobile',
    $isDesktop: bowser.platform.type === 'desktop',
    $browser: bowser.browser.name,
    $browserVersion: bowser.browser.version,
    $os: bowser.os.name,
    $versionRoot: configManager.getVariable(VariableNames.VERSIONED_STATIC_ROOT),
    $staticRoot: configManager.getVariable(VariableNames.STATIC_ROOT),
    URLNames,
    PropertyNames,
    VariableNames,
    RouteNames,
    Params,
    createPath,
    $deviceStateTracker: new DeviceStateTracker({
      mediaQueries: cleanMediaQueries,
      deviceState,
      showStateIndicator: process.env.NODE_ENV !== 'production',
    }),
    DeviceState: deviceState,
  });
};

const waitForLocale = store =>
  new Promise(resolve => {
    if (localeLoader.isLoaded(store.getters.currentLanguage.code)) {
      resolve();
    } else {
      localeLoader.setLoadCallback(locale => {
        if (locale === store.getters.currentLanguage.code) {
          resolve();
        }
      });
    }
  });

const startUp = store => {
  // Initialise plugins
  initPlugins();

  const configManager = getValue(CONFIG_MANAGER);

  // Add async methods to the Promise.all array
  return Promise.all([
    configManager.getVariable(VariableNames.LOCALE_ENABLED)
      ? waitForLocale(store)
      : Promise.resolve(),
  ]);
};

export default startUp;

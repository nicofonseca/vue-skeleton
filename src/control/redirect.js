import bowser from '../util/bowser';

const browser = bowser.browser.name;
const browserVersion = bowser.browser.version;
let redirect = false;

if (
  (browser === 'Chrome' && browserVersion < '60') ||
  (browser === 'Firefox' && browserVersion < '55') ||
  (browser === 'Safari' && browserVersion < '10') ||
  browser === 'Internet Explorer' ||
  (browser === 'Microsoft Edge' && browserVersion < '16') ||
  browser === 'Opera'
) {
  redirect = true;
}

if (redirect) {
  window.location.href = 'http://outdatedbrowser.com/en';
}

import bowser from 'bowser';

export default bowser.getParser(window.navigator.userAgent).parsedResult;

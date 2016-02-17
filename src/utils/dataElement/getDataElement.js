var state = require('../../state');
var cleanText = require('./../string/cleanText');

module.exports = function(variable, suppressDefault, dataDef) {
  dataDef = dataDef || state.getDataElementDefinition(variable);

  if (!dataDef) {
    return state.getPropertyConfig().undefinedVarsReturnEmpty ? '' : null;
  }

  var storeLength = dataDef.settings.storeLength;
  var delegate = state.getDelegate(dataDef.delegateId);
  var value = delegate.exports(dataDef.settings);

  // TODO: Move this to data element delegates?
  if (dataDef.settings.cleanText) {
    value = cleanText(value);
  }

  if (value === undefined && storeLength) {
    value = state.getCachedDataElement(variable, storeLength);
  } else if (value !== undefined && storeLength) {
    state.cacheDataElement(variable, storeLength, value);
  }

  if (value === undefined && !suppressDefault) {
    // Have to wrap "default" in quotes since it is a keyword.
    /*eslint-disable dot-notation*/
    value = dataDef.settings['default'] || '';
    /*eslint-enable dot-notation*/
  }

  // TODO: Move this to data element delegates?
  if (dataDef.settings.forceLowerCase && value.toLowerCase) {
    value = value.toLowerCase();
  }

  return value;
};

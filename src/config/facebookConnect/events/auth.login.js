extensions.facebookConnect[0].loadSDKPromise.then(function() {
  FB.Event.subscribe('auth.login', function(response) {
    next(eventSettingsCollection, response);
  });
});
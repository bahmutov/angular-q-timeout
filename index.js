angular.module('ng-q-timeout', [])
.config(['$provide', function ($provide) {
  // I wish we could inject $timeout into config function
  // instead of using setTimeout directly.
  $provide.decorator('$q', function decorateQ($delegate) {
    var defer = $delegate.defer;
    $delegate.defer = function () {
      var deferred = defer();
      deferred.promise.timeout = function (ms, cb) {
        if (typeof cb === 'function') {
          setTimeout(angular.bind(null, cb, deferred), ms);
        } else {
          setTimeout(function () {
            deferred.reject(cb);
          }, ms);
        }
        return this;
      };
      return deferred;
    };
    return $delegate;
  });
}]);

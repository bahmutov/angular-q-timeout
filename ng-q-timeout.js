angular.module('ng-q-timeout', [])
.config(['$provide', function ($provide) {
  // I wish we could inject $timeout into config function
  // instead of using setTimeout directly.
  $provide.decorator('$q', ['$delegate', function decorateQ($delegate) {
    var _defer = $delegate.defer;

    $delegate.defer = function () {
      var deferred = _defer();
      var pending = true;

      var _resolve = deferred.resolve;
      deferred.resolve = function () {
        pending = false;
        return _resolve.apply(deferred, arguments);
      };

      deferred.promise.timeout = function (ms, cb) {
        if (typeof cb === 'function') {
          setTimeout(function () {
            if (pending) {
              cb(deferred);
            }
          }, ms);
        } else {
          setTimeout(function () {
            if (pending) {
              deferred.reject(cb);
            }
          }, ms);
        }
        return this;
      };
      return deferred;
    };
    return $delegate;
  }]);
}]);

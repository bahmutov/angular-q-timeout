describe('ng-q-timeout', function () {
  var q, rootScope;

  function foo() {
    var defer = q.defer();
    setTimeout(function () {
      defer.resolve('ok');
    }, 1000);
    return defer.promise;
  }

  function fooFail() {
    var defer = q.defer();
    setTimeout(function () {
      defer.reject('failed');
    }, 1000);
    return defer.promise;
  }

  beforeEach(function () {
    module('ng-q-timeout');
  });

  beforeEach(inject(function ($q, $rootScope) {
    q = $q;
    rootScope = $rootScope;
  }));

  it('has $q', function () {
    expect(q).toBeDefined();
  });

  it('creates deferred', function () {
    var defer = q.defer();
    expect(defer).toBeDefined('deferred');
    expect(defer.promise).toBeDefined('promise');
  });

  it('adds timeout method', function () {
    var defer = q.defer();
    expect(defer.promise.timeout).toBeDefined('timeout');
    expect(typeof defer.promise.timeout).toEqual('function');
  });

  it('still works', inject(function ($rootScope) {
    var defer = q.defer();
    var value;
    expect(value).not.toBeDefined();
    defer.promise.then(function (val) {
      value = val;
    });
    defer.resolve('foo');
    $rootScope.$apply();
    expect(value).toEqual('foo');
  }));

  it('resolves after delay', function () {
    var value;

    foo().then(function (val) {
      value = val;
    });

    expect(value).not.toBeDefined();

    waitsFor(function () {
      rootScope.$apply();
      return value;
    });
    runs(function () {
      expect(value).toEqual('ok');
    });
  });

  it('rejects after timeout', function () {
    var value;

    foo()
    .timeout(100)
    .then(function () {
      throw new Error('Not timed out!');
    }, function () {
      value = true;
    });

    expect(value).not.toBeDefined();

    waitsFor(function () {
      rootScope.$apply();
      return value;
    });
    runs(function () {
      expect(value).toEqual(true);
    });
  });

  it('runs a callback on timeout', function () {
    var value;

    foo()
    .timeout(100, function (defer) {
      defer.reject(true);
      value = 1;
    })
    .then(function () {
      throw new Error('Not timed out!');
    }, function () {
      value += 1;
    });

    expect(value).not.toBeDefined();

    waitsFor(function () {
      rootScope.$apply();
      return value;
    });
    runs(function () {
      expect(value).toEqual(2);
    });
  });

  it('does not run timeout callback if promise has already been resolved', function () {
    var done;

    setTimeout(function () {
      done = true;
    }, 2000);

    foo()
    .timeout(1500, function () {
      throw new Error('Time out callback reached');
    })
    .then(function (val) {
      expect(val).toEqual('ok');
    }, function () {
      throw new Error('Failed promise');
    });

    waitsFor(function () {
      rootScope.$apply();
      return done;
    });
  });

  it('does not run timeout callback if promise has already been rejectd', function () {
    var done;

    setTimeout(function () {
      done = true;
    }, 2000);

    fooFail()
    .timeout(1500, function () {
      throw new Error('Time out callback reached');
    })
    .then(function () {
      throw new Error('Not failed!');
    }, function (val) {
      expect(val).toEqual('failed');
    });

    waitsFor(function () {
      rootScope.$apply();
      return done;
    });
  });
});

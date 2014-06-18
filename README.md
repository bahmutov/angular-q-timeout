# angular-q-timeout

> Adds .timeout method to promises returned by Angular $q service

[![Build status][angular-q-timeout-ci-image] ][angular-q-timeout-ci-url]
[![Coverage Status][angular-q-timeout-coverage-image]][angular-q-timeout-coverage-url]
[![dependencies][angular-q-timeout-dependencies-image] ][angular-q-timeout-dependencies-url]
[![devdependencies][angular-q-timeout-devdependencies-image] ][angular-q-timeout-devdependencies-url]

## Example

```js
// module('my module', ['ng-q-timeout'])

foo()
.timeout(100, function (defer) {
  defer.reject('foo timed out');
  // probably run $scope.$apply here too
})
.then(function () {
  // foo has finished ok
}, function (msg) {
  // foo has failed or timed out.
});
```

Inspired by [Extending Q promises](http://dorp.io/blog/extending-q-promises.html), I have
decided to add timeout method to promises returned by the [$q](https://docs.angularjs.org/api/ng/service/$q)
service.

## Install

`bower install ng-q-timeout`

include the script after angular

    <script src="bower_components/angular/angular.js"></script>
    <script src="ng-q-timeout.js"></script>

add `ng-q-timeout` module as a dependency to your application

    angular.module('Example', ['ng-q-timeout'])

## Limitations

Currently only the first promise returned by the `$q.defer()` is extended with `timeout` method.
Thus always set timeout first, like the example above. This will NOT work

```js
foo()
.then(...)
.timeout(100, function (defer) {
  defer.reject('foo timed out');
});
// throws an error, timeout should go before .then
```

I am using `window.setTimeout` internally, which means the timeout callback happens outside
the *$apply* loop. If you need to update the ui in the callback function, call `$scope.$apply` there.

### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/angular-q-timeout/issues) on Github

## MIT License

Copyright (c) 2014 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[angular-q-timeout-icon]: https://nodei.co/npm/angular-q-timeout.png?downloads=true
[angular-q-timeout-url]: https://npmjs.org/package/angular-q-timeout
[angular-q-timeout-ci-image]: https://travis-ci.org/bahmutov/angular-q-timeout.png?branch=master
[angular-q-timeout-ci-url]: https://travis-ci.org/bahmutov/angular-q-timeout
[angular-q-timeout-coverage-image]: https://coveralls.io/repos/bahmutov/angular-q-timeout/badge.png
[angular-q-timeout-coverage-url]: https://coveralls.io/r/bahmutov/angular-q-timeout
[angular-q-timeout-dependencies-image]: https://david-dm.org/bahmutov/angular-q-timeout.png
[angular-q-timeout-dependencies-url]: https://david-dm.org/bahmutov/angular-q-timeout
[angular-q-timeout-devdependencies-image]: https://david-dm.org/bahmutov/angular-q-timeout/dev-status.png
[angular-q-timeout-devdependencies-url]: https://david-dm.org/bahmutov/angular-q-timeout#info=devDependencies

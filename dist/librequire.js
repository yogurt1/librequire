var Fetch,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Fetch = (function() {
  Fetch.prototype.json = function(response) {
    return response.json();
  };

  Fetch.prototype.status = function(response) {
    var i, ref, results;
    if (ref = response.status, indexOf.call((function() {
      results = [];
      for (i = 200; i <= 300; i++){ results.push(i); }
      return results;
    }).apply(this), ref) >= 0) {
      Promise.resolve(response);
      return console.log("1");
    } else {
      console.log("2");
      return Promise.reject(new Error(response.statusText));
    }
  };

  Fetch.prototype.request = function() {
    return new Request(this.address, {
      method: this.method
    });
  };

  function Fetch(address, method, callback) {
    this.address = address;
    this.method = method != null ? method : "get";
    this.request = bind(this.request, this);
    fetch(this.request()).then(this.json).then(function(data) {
      return callback(data);
    }).then(null, function(err) {
      throw new Error(err);
    });
  }

  return Fetch;

})();

var Require,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Require = (function(superClass) {
  extend(Require, superClass);

  function Require(address, callback) {
    this.address = address;
    this.method = get;
    fetch(this.request()).then(function(response) {
      return response.text();
    }).then(function(data) {
      return callback(data);
    }).then(null, function(err) {
      throw new Error(err);
    });
  }

  return Require;

})(Fetch);

console.log(require('test'));

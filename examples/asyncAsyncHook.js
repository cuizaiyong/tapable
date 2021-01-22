const { AsyncSeriesHook } = require("../");

const hook = new AsyncSeriesHook(["name", "age"]);

hook.tapAsync("FooPlugin", (name, age, cb) => {
	console.log("FooPlugin ---->", name, age);
	cb();
});

hook.tapAsync("BarPlugin", (name, age, cb) => {
	console.log("BarPlugin ---->", name, age);
	cb();
});

hook.tap("HelloPlugin", (name, age) => {
	console.log("HelloPlugin ---->", name, age);
});

hook.tapPromise("WorldPlugin", async (name, age) => {
	console.log("WorldPlugin ---->", name, age);
});

// (function anonymous(name, age, _callback) {
// 	"use strict";
// 	var _context;
// 	var _x = this._x;
// 	function _next0() {
// 		var _fn1 = _x[1];
// 		_fn1(name, age, function(_err1) {
// 			if (_err1) {
// 				_callback(_err1);
// 			} else {
// 				_callback();
// 			}
// 		});
// 	}
// 	var _fn0 = _x[0];
// 	_fn0(name, age, function(_err0) {
// 		if (_err0) {
// 			_callback(_err0);
// 		} else {
// 			_next0();
// 		}
// 	});
// });

hook.callAsync("cuvee", 30, e => {
	console.log(e);
});

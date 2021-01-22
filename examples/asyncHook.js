const { AsyncSeriesHook } = require("../");

const hook = new AsyncSeriesHook(["name", "age"]);

hook.tap("FooPlugin", (name, age) => {
	console.log("FooPlugin ---->", name, age);
});

hook.tap("BarPlugin", (name, age) => {
	console.log("BarPlugin ---->", name, age);
});

// (function anonymous(name, age, _callback) {
// 	"use strict";
// 	var _context;
// 	var _x = this._x;
// 	var _fn0 = _x[0];
// 	var _hasError0 = false;
// 	try {
// 		_fn0(name, age);
// 	} catch (_err) {
// 		_hasError0 = true;
// 		_callback(_err);
// 	}
// 	if (!_hasError0) {
// 		var _fn1 = _x[1];
// 		var _hasError1 = false;
// 		try {
// 			_fn1(name, age);
// 		} catch (_err) {
// 			_hasError1 = true;
// 			_callback(_err);
// 		}
// 		if (!_hasError1) {
// 			_callback();
// 		}
// 	}
// });

hook.callAsync("cuvee", 30, e => {
	console.log(e);
});

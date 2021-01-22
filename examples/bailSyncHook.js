/**
 * 与SyncHook的区别是
 * 一旦某个钩子函数由返回值，后面的钩子函数将不再执行
 */
const { SyncBailHook } = require("../");

const hook = new SyncBailHook(["name", "age"]);

hook.tap("FooPlugin", (name, age) => {
	console.log("FooPlugin", name, age);
});

hook.tap("BarPlugin", (name, age) => {
	console.log("BarPlugin", name, age);
});

// (function anonymous(name, age) {
// 	"use strict";
// 	var _context;
// 	var _x = this._x;
// 	var _fn0 = _x[0];
// 	var _result0 = _fn0(name, age);
// 	if (_result0 !== undefined) {
// 		return _result0;
// 	} else {
// 		var _fn1 = _x[1];
// 		var _result1 = _fn1(name, age);
// 		if (_result1 !== undefined) {
// 			return _result1;
// 		} else {
// 		}
// 	}
// });

hook.call("cuvee", 30);

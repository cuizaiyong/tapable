/**
 * 与SyncHook的区别是
 * 一旦某个钩子函数的返回值不是undefined的，那么这个钩子函数将循环执行
 */
const { SyncLoopHook } = require("../");

const hook = new SyncLoopHook(["name", "age"]);

let count = 10;
hook.tap("FooPlugin", (name, age) => {
	console.log("FooPlugin", name, age);
	if (count > 0) {
		console.log(count);
		return count--;
	}
});

hook.tap("BarPlugin", (name, age) => {
	console.log("BarPlugin", name, age);
});

// (function anonymous(name, age) {
// 	"use strict";
// 	var _context;
// 	var _x = this._x;
// 	var _loop;
// 	do {
// 		_loop = false;
// 		var _fn0 = _x[0];
// 		var _result0 = _fn0(name, age);
// 		if (_result0 !== undefined) {
// 			_loop = true;
// 		} else {
// 			var _fn1 = _x[1];
// 			var _result1 = _fn1(name, age);
// 			if (_result1 !== undefined) {
// 				_loop = true;
// 			} else {
// 				if (!_loop) {
// 				}
// 			}
// 		}
// 	} while (_loop);
// });

hook.call("cuvee", 30);

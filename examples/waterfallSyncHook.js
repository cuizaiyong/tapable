/**
 * 与SyncHook的区别是
 * 下一个钩子函数依赖上一个钩子函数的返回值
 */
const { SyncWaterfallHook } = require("../");

const hook = new SyncWaterfallHook(["name", "age"]);

hook.tap("FooPlugin", (name, age) => {
	console.log("FooPlugin ---->", name, age);
	return "cui";
});

hook.tap("BarPlugin", (name, age) => {
	console.log("BarPlugin ---->", name, age);
});
/**
 * (function anonymous(name, age) {
      "use strict";
      var _context;
      var _x = this._x;
      var _fn0 = _x[0];
      var _result0 = _fn0(name, age);
      if(_result0 !== undefined) {
        name = _result0;
      }
      var _fn1 = _x[1];
      var _result1 = _fn1(name, age);
      if(_result1 !== undefined) {
        name = _result1;
      }
      return name;
    })
 */
hook.call("cuvee", 30);

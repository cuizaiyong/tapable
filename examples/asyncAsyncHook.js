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

hook.callAsync("cuvee", 30, e => {
	console.log(e);
});

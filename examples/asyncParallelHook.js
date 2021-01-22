const { AsyncParallelHook } = require("..");

const hook = new AsyncParallelHook(["name", "age"]);

hook.tap("FooPlugin", (name, age) => {
	console.log("FooPlugin ---->", name, age);
});

hook.tap({ name: "BarPlugin", context: true }, (context, name, age) => {
	console.log(context);
	console.log("BarPlugin ---->", name, age);
});

hook.tapAsync("HelloPlugin", (name, age) => {
	console.log("HelloPlugin ---->", name, age);
	// setTimeout(() => {
	// 	cb();
	// }, 2000);
});

hook.tapAsync("WorldPlugin", (name, age) => {
	console.log("WorldPlugin ---->", name, age);
	// cb();
});

hook.intercept({
	context: true,
	call: (name, age) => {
		console.log("Enter call intercept ---->");
	},
	tap: (context, tap) => {
		context.author = "cuvee";
		console.log("Enter tap intercept ---->");
	},
	loop: (...args) => {
		console.log("Enter loop intercept ---->");
	},
	register: tap => {
		console.log("Enter register intercept ---->");
		return tap;
	}
});
// hook.callAsync("cuvee", 30, e => {
// 	console.log(e);
// });
hook.promise("cuvee", 30).then(res => {
	console.log(res);
});

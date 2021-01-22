const { HookMap, SyncHook } = require("..");

const keyedHook = new HookMap(key => new SyncHook(["name", "age"]));

keyedHook.for("info").tap("FooPlugin", (name, age) => {
	console.log("FooPlugin", name, age);
});

const hook = keyedHook.get("info");

if (hook) {
	hook.call("cuvee", 30);
}

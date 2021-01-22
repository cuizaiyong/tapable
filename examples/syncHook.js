/**
 * SyncHook
 * 同步钩子
 * 只能通过tap注册回调函数
 * 只能通过call调用函数
 * 回到函数的执行顺序为注册顺序
 */
const { SyncHook } = require("../");

const hook = new SyncHook(["name", "age"]);

/**
 * hook.taps = [
 *  { type: 'sync', name: 'BarPlugin', fn: async (name, age) => {} }
 * ]
 */
let count = 0;
hook.tap("BarPlugin", async (name, age) => {
	console.log("BarPlugin---->", name, age);
	// ? promise的执行顺序
	const res = await Promise.resolve("Bar").then(res => {
		console.log("Async<----", res, count++);
		return res;
	});
	console.log(res, count);
});
/**
 * hooks.taps = [
 *  { type: 'sync', name: 'BarPlugin', fn: async (name, age) => {} },
 *  { type: 'sync', name: 'BarPlugin', fn: (name, age) => {} }
 * ]
 */
hook.tap("FooPlugin", (name, age) => {
	console.log("FooPlugin---->", name, age);
});

(async () => {
	await Promise.resolve("name").then(res => {
		console.log(res);
	});
	// _createCall()
	/**
   * (function anonymous(name, age
      ) {
        "use strict";
        var _context;
        var _x = this._x;
        var _fn0 = _x[0];
        _fn0(name, age);
        var _fn1 = _x[1];
        _fn1(name, age);
      })
   */
	// hook.call("cuvee", 30);

	// hook.call("jason", 33);
})();

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
	constructor(execute) {
		this.status = PENDING;
		this.fulfilled = [];
		this.rejected = [];
		this.value = undefined;
		this.reason = undefined;
		execute(this._resolve.bind(this), this._reject.bind(this));
	}
	_resolve(value) {
		if (this.status !== PENDING) return;
		this.status = FULFILLED;
		this.value = value;
		let fn;
		while ((fn = this.fulfilled.shift())) {
			fn(this.value);
		}
	}
	_reject(reason) {
		if (this.status !== PENDING) return;
		this.status = REJECTED;
		this.reason = reason;
		while ((fn = this.rejected.shift())) {
			fn(this.value);
		}
	}
	then(onfulfilled, onrejected) {
		return new MyPromise((resolve, reject) => {
			if (this.status === FULFILLED) {
				try {
					const result = onfulfilled(this.value);
					if (result instanceof MyPromise) {
						result.then(resolve, reject);
					} else {
						resolve(result);
					}
				} catch (e) {
					reject(e);
				}
			} else if (this.status === REJECTED) {
				try {
					const result = onrejected(this.reason);
					if (result instanceof MyPromise) {
						result.then(resolve, reject);
					} else {
						resolve(result);
					}
				} catch (e) {
					reject(e);
				}
			} else {
				this.fulfilled.push(value => {
					try {
						const result = onfulfilled(value);
						resolve(result);
					} catch (e) {
						reject(e);
					}
				});
				this.rejected.push(reason => {
					try {
						const result = onrejected(reason);
						resolve(result);
					} catch (e) {
						reject(e);
					}
				});
			}
		});
	}
}

new MyPromise((resolve, reject) => {
	console.log("test-my-promise");
	setTimeout(resolve.bind(null, 3333), 2000);
})
	.then(res => {
		console.log(res);
		return 4444;
	})
	.then(res => {
		console.log(res);
	});

console.log(123);

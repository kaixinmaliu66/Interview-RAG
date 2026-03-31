Function.prototype.myCall = function (context, ...args) {
  // 1. 确定 this 要指向谁
  context = context || window;

  // 2. 把当前函数（this）挂到 context 上
  const fn = Symbol();
  context[fn] = this;

  // 3. 执行并拿到结果
  const result = context[fn](...args);

  // 4. 删掉临时属性
  delete context[fn];

  return result;
};
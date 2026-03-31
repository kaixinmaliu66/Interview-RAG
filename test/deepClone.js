function deepClone(obj) {
  // 1. 不是对象直接返回（基础类型）
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 2. 区分对象/数组（你缺的）
  const clone = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    const item = obj[key];
    // 3. 递归后必须赋值！（你最关键缺的）
    clone[key] = deepClone(item);
  }

  return clone;
}
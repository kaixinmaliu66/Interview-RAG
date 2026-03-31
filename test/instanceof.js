function myInstanceof(left, right) {
  // 拿到左边的原型链
  let proto = left.__proto__;

  // 一直往上找
  while (proto) {
    // 找到了
    if (proto === right.prototype) {
      return true;
    }
    // 继续往上
    proto = proto.__proto__;
  }

  // 到头都没找到
  return false;
}
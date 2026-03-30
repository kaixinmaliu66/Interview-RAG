// 请你手动实现一个函数 flat(arr, depth?)，功能如下：
// 接收一个数组 arr 和一个可选参数 depth（扁平化深度，默认为 1）。
// 将多维数组按照指定深度进行扁平化，返回新数组。
// 不允许直接使用数组原生的 Array.prototype.flat()。
// 要求支持：
//     默认扁平化1 层
//     支持指定任意深度（包括 Infinity 全扁平化）
//     不修改原数组

// flat(arr);          // [1, 2, [3, [4]], 5]
// flat(arr, 1);       // 同上
// flat(arr, 2);       // [1, 2, 3, [4], 5]
// flat(arr, Infinity);// [1, 2, 3, 4, 5]

const arr = [1, [2, [3, [4]], 5]];



Array.prototype.myFlat = function (depth = 1) {
    // if(depth===)
    const _arr = [];
    (function flatten(arr, currentDepth) {
        for (item of arr) {
            if (Array.isArray(item) && currentDepth < depth) {
                flatten(item, currentDepth + 1)
            } else {
                _arr.push(item)
            }
        }
    })(this, 0)
    return _arr
}

console.log(arr.myFlat(1));


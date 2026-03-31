const arr = [1, 1, 2, 3, 3, 4]

function unique(arr) {
    let _arr = []
    for (const [index, item] of arr.entries()) {
        if (!_arr.includes(item)) {
            _arr.push(item)
        }
    }
    return _arr
}

// function debounce(fn, delay) {
//     let timer = null
//     return function (...args) {
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//             fn.apply(this, args)
//         }, delay);
//     }
// }

// function throttle(fn, interval) {
//     let lastTime = 0
//     return function (...args) {
//         const now = Date.now()
//         if (now - lastTime > interval) {
//             lastTime = now
//             fn.apply(this, args)
//         }
//     }
// }
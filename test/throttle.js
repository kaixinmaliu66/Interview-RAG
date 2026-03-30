function throttle(fn, interval) {

    let lastTime = 0

    return function (...args) {
        let now = Date.now()
        if (now - lastTime >= interval) {
            fn.apply(this, args)
            // 4. 更新上次执行时间
            lastTime = now
        }
    }
}

console.log("a" instanceof String);


function myInstanceof(A, B) {
    if (!A) return
    
}
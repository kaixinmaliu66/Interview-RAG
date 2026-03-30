function log() {
    console.log('执行了');
}

// 一定要用闭包 引用定时器实例

function debounce(fn, delay) {
    let timer = null
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay);
    }
}

const debouncedLog = debounce(log, 500);

debouncedLog()
debouncedLog()
debouncedLog()
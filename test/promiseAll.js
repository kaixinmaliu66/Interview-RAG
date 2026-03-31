function PromiseAll(promises) {
    // 你写
    return new Promise((resolve, reject) => {
        let count = 0
        const result = []
        for (const [index, item] of promises.entries()) {

            Promise.resolve(item).then(res => {
                result[index] = res
                count++
                if (count === promises.length) {
                    resolve(result)
                }
            }).catch(reject)

        }
    })
}

function PromiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (const item of promises) {
      Promise.resolve(item).then(resolve).catch(reject)
    }
  })
}
const arr = [1, 2, 3, 4, 5];
const target = 7;

function twoSum(nums, target) {
  const map = {};
  for (const [index, num] of nums.entries()) {
    const need = target - num;

    // ✅ 优化：严谨判断（不会漏 0 下标）
    if (need in map) {
      return [map[need], index];
    }

    map[num] = index;
  }
}

console.log(twoSum(arr, target)); // [2, 3]
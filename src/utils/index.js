/**
 * 通过传入的手势对象解析出我们想要的数据
 * 返回一个包含方向及力度的对象
 * 返回方向限定在 -60 ---- 60 度
 * 返回力量大概在 0---1  1----2 2--- 3三个返回， 分别对应 无力 适量 过力
 * 单独拆出去，只为页面测试用
 * @param {*} evt
 */
const analysis = (evt) => {
  if (!evt) return null
  const { angle, deltaX, deltaY } = evt
  const _angel = Math.round(angle + 90)
  const _strength = Math.round(Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)))

  return {
    angle: _angel,
    strength: _strength
  }
}

/**
 * 得分情况及命中信息
 * @param {*} data
 * score --- 得分
 * hit ---- 0 未命中 1 命中
 * postion ---- 位置 7个值  LT -- 1 LB -- 2 MT -- 3 MB -- 4 RT -- 5 RB -- 6 OUT -1
 */
const generate = (data) => {
  // 角度只有 +20 -20  力量值为 150>x>0 没提过去  151 -- 200  下    201 -- 250 上 暂定 >= 250 踢出场外
  if (!data) return null
  const { angle, strength } = data
  let record = null

  const Bthreshold = 150
  const Mthreshold = 200
  const Tthreshold = 250
  const LAngle = -30
  const LMAngle = -15
  const RMAngle = 15
  const RAngle = 30

  // 世界上最垃圾的代码在此，么有办法

  if (angle < LAngle) {
    // 左侧场外
    if (strength > Tthreshold) {
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else if (strength <= Tthreshold && strength >= Bthreshold) {
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else {
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    }
  } else if (angle >= LAngle && angle <= LMAngle) {
    // 门框左边

    // 踢过门框
    if (strength > Tthreshold) {
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else if (strength <= Tthreshold && strength >= Mthreshold) {
      // 方向是踢向 -> LT
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else if (strength < Mthreshold && strength >= Bthreshold) {
      // 方向是踢向 -> LB
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else {
      // 短了
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    }
  } else if (angle > LMAngle && angle < RMAngle) {
    // 门框中间

    // 踢过门框
    if (strength > Tthreshold) {
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else if (strength <= Tthreshold && strength >= Mthreshold) {
      // 方向是踢向 -> MT
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else if (strength < Mthreshold && strength >= Bthreshold) {
      // 方向是踢向 -> MB
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else {
      // 短了
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    }
  } else if (angle >= RMAngle && angle <= RAngle) {
    // 门框右间

    // 踢过门框
    if (strength > Tthreshold) {
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else if (strength <= Tthreshold && strength >= Mthreshold) {
      // 方向是踢向 -> RT
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else if (strength < Mthreshold && strength >= Bthreshold) {
      // 方向是踢向 -> RB
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else {
      // 短了
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    }
  } else if (angle > RAngle) {
    // 右侧场外
    if (strength > Tthreshold) {
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else if (strength <= Tthreshold && strength >= Bthreshold) {
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    } else {
      record = {
        score: 0,
        hit: 0,
        posititon: -1,
        points: []
      }
    }
  }
  return record
}

const positions = {
  out: {
    hitrate: 0,
    score: 0,
    putout: 0
  },
  lt: {
    hitrate: 50,
    score: 10,
    putout: 5
  },
  lb: {
    hitrate: 7,
    score: 70,
    putout: 10
  },
  mt: {
    hitrate: 90,
    score: 5,
    putout: 15
  },
  mb: {
    hitrate: 90,
    score: 5,
    putout: 15
  },
  rt: {
    hitrate: 50,
    score: 10,
    putout: 5
  },
  rb: {
    hitrate: 70,
    score: 7,
    putout: 10
  }
}

// 模拟的路径点点结合
// 这里用二阶贝塞尔 也就需要4个点位置
// 模拟点暂定为26个 左3 右3各为提出场外的路径点
const leftpaths = [
  [{ x: 100, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 100 }]
]
const hitpaths = [
  [{ x: 100, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 100 }]
]
const rightpaths = [
  [{ x: 100, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 100 }]
]
export { analysis, generate }

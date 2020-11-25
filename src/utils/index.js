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

  const Bthreshold = 100
  const Mthreshold = 250
  const Tthreshold = 400
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
        posititon: -11,
        points: []
      }
    } else if (strength <= Tthreshold && strength >= Bthreshold) {
      record = {
        score: 0,
        hit: 0,
        posititon: -11,
        points: []
      }
    } else {
      record = {
        score: 0,
        hit: 0,
        posititon: 12,
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
        posititon: 11,
        points: []
      }
    } else if (strength <= Tthreshold && strength >= Mthreshold) {
      // 方向是踢向 -> LT
      record = {
        score: 0,
        hit: 0,
        posititon: 1,
        points: []
      }
    } else if (strength < Mthreshold && strength >= Bthreshold) {
      // 方向是踢向 -> LB
      record = {
        score: 0,
        hit: 0,
        posititon: 2,
        points: []
      }
    } else {
      // 短了
      record = {
        score: 0,
        hit: 0,
        posititon: 12,
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
        posititon: 11,
        points: []
      }
    } else if (strength <= Tthreshold && strength >= Mthreshold) {
      // 方向是踢向 -> MT
      record = {
        score: 0,
        hit: 0,
        posititon: 3,
        points: []
      }
    } else if (strength < Mthreshold && strength >= Bthreshold) {
      // 方向是踢向 -> MB
      record = {
        score: 0,
        hit: 0,
        posititon: 4,
        points: []
      }
    } else {
      // 短了
      record = {
        score: 0,
        hit: 0,
        posititon: 12,
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
        posititon: 11,
        points: []
      }
    } else if (strength <= Tthreshold && strength >= Mthreshold) {
      // 方向是踢向 -> RT
      record = {
        score: 0,
        hit: 0,
        posititon: 5,
        points: []
      }
    } else if (strength < Mthreshold && strength >= Bthreshold) {
      // 方向是踢向 -> RB
      record = {
        score: 0,
        hit: 0,
        posititon: 6,
        points: []
      }
    } else {
      // 短了
      record = {
        score: 0,
        hit: 0,
        posititon: 12,
        points: []
      }
    }
  } else if (angle > RAngle) {
    // 右侧场外
    if (strength > Tthreshold) {
      record = {
        score: 0,
        hit: 0,
        posititon: -21,
        points: []
      }
    } else if (strength <= Tthreshold && strength >= Bthreshold) {
      record = {
        score: 0,
        hit: 0,
        posititon: -21,
        points: []
      }
    } else {
      record = {
        score: 0,
        hit: 0,
        posititon: 12,
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

const inside = (point, vs) => {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

  var x = point[0]; var y = point[1]

  var inside = false
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0]; var yi = vs[i][1]
    var xj = vs[j][0]; var yj = vs[j][1]

    var intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
    if (intersect) inside = !inside
  }

  return inside
}

const randomNum = (minNum, maxNum) => {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}

// 门框范围内 随机点
const getAreaPointByPos = (actualwidth, goalwidth, goalheight, goalbottom, pos) => {
  const posLT = [randomNum(actualwidth * 0.5 - goalwidth * 0.5, actualwidth * 0.5 - goalwidth * 0.5 + goalwidth * 0.33), randomNum(
    goalbottom + goalheight * 0.5,
    goalheight + goalbottom
  )]

  const posLB = [randomNum(actualwidth * 0.5 - goalwidth * 0.5, actualwidth * 0.5 - goalwidth * 0.5 + goalwidth * 0.33), randomNum(
    goalbottom,
    goalbottom + goalheight * 0.5
  )]

  const posMT = [randomNum(actualwidth * 0.5 - goalwidth * 0.5 + goalwidth * 0.33, actualwidth * 0.5 - goalwidth * 0.5 + goalwidth * 0.66), randomNum(
    goalbottom + goalheight * 0.5,
    goalheight + goalbottom
  )]

  const posMB = [randomNum(actualwidth * 0.5 - goalwidth * 0.5 + goalwidth * 0.33, actualwidth * 0.5 - goalwidth * 0.5 + goalwidth * 0.66), randomNum(
    goalbottom,
    goalbottom + goalheight * 0.5
  )]

  const posRT = [randomNum(actualwidth * 0.5 - goalwidth * 0.5 + goalwidth * 0.66, actualwidth * 0.5 + goalwidth * 0.5), randomNum(
    goalbottom + goalheight * 0.5,
    goalheight + goalbottom
  )]

  const posRB = [randomNum(actualwidth * 0.5 - goalwidth * 0.5 + goalwidth * 0.66, actualwidth * 0.5 + goalwidth * 0.5), randomNum(
    goalbottom,
    goalbottom + goalheight * 0.5
  )]

  return pos === 1 ? posLT : pos === 2 ? posLB : pos === 3 ? posMT : pos === 4 ? posMB : pos === 5 ? posRT : pos === 6 ? posRB : [0, 0]
}

// 门框外随机点 包括左侧 中上 中下 右侧
const getOuterPointByPos = (actualwidth, goalwidth, goalheight, goalbottom, angle, stresh, ballPosX, ballPosY, pos) => {
  const posLT = [randomNum(actualwidth * -0.35, ballPosX - goalwidth * 0.3), randomNum(
    goalbottom,
    goalheight + goalbottom
  )]

  const posLB = [randomNum(ballPosX - goalwidth * 0.3, ballPosX - goalwidth * 0.5), ballPosY + (goalbottom - ballPosY) * stresh / 100]

  const posMT = [ballPosX + angle * goalwidth / 30, randomNum(
    goalbottom + goalheight + 10,
    goalbottom + goalheight + 50
  )]

  const posMB = [Math.round(ballPosX + angle * goalwidth / 100), Math.round(ballPosY + (goalbottom - ballPosY) * stresh / 100)]

  const posRT = [Math.round(randomNum(actualwidth * 1.35, ballPosX + goalwidth * 0.3)), Math.round(randomNum(
    goalbottom,
    goalheight + goalbottom
  ))]

  const posRB = [randomNum(ballPosX + goalwidth * 0.3, ballPosX + goalwidth * 0.5), ballPosY + (goalbottom - ballPosY) * stresh / 100]

  return pos === -11 ? posLT : pos === -12 ? posLB : pos === 11 ? posMT : pos === 12 ? posMB : pos === -21 ? posRT : pos === -22 ? posRB : [0, 0]
}

// 模拟的路径点点结合
// 这里用二阶贝塞尔 也就需要4个点位置
// 模拟点暂定为26个 左3 右3各为提出场外的路径点

export { analysis, generate, inside, randomNum, getAreaPointByPos, getOuterPointByPos }

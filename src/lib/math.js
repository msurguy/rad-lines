import { create, all } from 'mathjs';

const math = create(all);

const customFunctions = {
  // // arithmetic
  // add: (a, b) => a + b,
  // subtract: (a, b) => a - b,
  // multiply: (a, b) => a * b,
  // divide: (a, b) => a / b,
  // mod: (a, b) => a % b,
  // unaryPlus: (a) => a,
  // unaryMinus: (a) => -a,

  // // bitwise
  // bitOr: (a, b) => a | b,
  // bitXor: (a, b) => a ^ b,
  // bitAnd: (a, b) => a & b,
  // bitNot: (a) => ~a,
  // leftShift: (a, b) => a << b,
  // rightArithShift: (a, b) => a >> b,
  // rightLogShift: (a, b) => a >>> b,

  // // logical
  // or: (a, b) => !!(a || b),
  // xor: (a, b) => !!a !== !!b,
  // and: (a, b) => !!(a && b),
  // not: (a) => !a,

  // // relational
  // equal: (a, b) => a === b,
  // unequal: (a, b) => a !== b,
  // smaller: (a, b) => a < b,
  // larger: (a, b) => a > b,
  // smallerEq: (a, b) => a <= b,
  // largerEq: (a, b) => a >= b,

  // // constants
  // pi: Math.PI,
  // e: Math.E,
  // true: true,
  // false: false,
  // null: null,
};

math.import(customFunctions);

export default math;
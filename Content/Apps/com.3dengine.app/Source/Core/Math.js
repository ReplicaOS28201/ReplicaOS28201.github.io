const CoreMath = {
  clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  },

  lerp(start, end, amount) {
    return start + (end - start) * amount;
  },
};

export default Object.freeze(CoreMath);

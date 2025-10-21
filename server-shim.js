if (typeof global !== 'undefined') {
  const gl = global;
  if (typeof gl.localStorage !== 'undefined' && typeof gl.localStorage.getItem !== 'function') {
    console.warn('Applying temporary shim for global.localStorage in Node dev process');
    const orig = gl.localStorage || {};
    gl.localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      ...orig,
    };
  }
}
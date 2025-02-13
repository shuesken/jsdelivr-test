function generateHandler(name) {
  return {
    apply(actualFetch, that, args) {
      console.log("intercepted", name)
      console.log(args?.at(1)?.headers?.get('authorization'))
      const result = Reflect.apply(actualFetch, that, args);
      return result;
    }
  }
}

// window.fetch = new Proxy(window.fetch, generateHandler("window window"))
// window.parent.fetch = new Proxy(window.parent.fetch, generateHandler("parent parent"))
window.parent.fetch = new Proxy(fetch, generateHandler("parent window"))
window.parent.parent.fetch = new Proxy(fetch, generateHandler("parent window"))
window.parent.parent.parent.fetch = new Proxy(fetch, generateHandler("parent window"))
// window.fetch = new Proxy(window.parent.fetch, generateHandler("window parent"))


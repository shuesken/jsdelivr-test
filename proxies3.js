function generateHandler(name) {
  return {
    apply(actualFetch, that, args) {
      console.log("intercepted", name)
      const result = Reflect.apply(actualFetch, that, args);
      return result;
    }
  }
}

window.fetch = new Proxy(window.fetch, generateHandler("window"))
window.parent.fetch = new Proxy(window.parent.fetch, generateHandler("window.parent"))
window.parent.parent.fetch = new Proxy(window.parent.parent.fetch, generateHandler("window.parent.parent.fetch"))
fetch = new Proxy(fetch, generateHandler("fetch"))

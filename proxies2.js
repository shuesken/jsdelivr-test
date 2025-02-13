function generateHandler(name) {
  return {
    apply(actualFetch, that, args) {
      console.log("intercepted", name)
      const result = Reflect.apply(actualFetch, that, args);
      return result;
    }
  }
}

new Proxy(window.fetch, generateHandler("window"))
new Proxy(window.parent.fetch, generateHandler("window.parent"))
new Proxy(window.parent.parent.fetch, generateHandler("window.parent.parent.fetch"))
new Proxy(fetch, generateHandler("fetch"))

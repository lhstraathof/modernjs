// url (required), options (optional)
fetch('https://url.dev/some/url', {
	method: 'get'
}).then( response => response.json())
.then( data => {
	// do something with data
}).catch(function(err) {
	// Error :(
});
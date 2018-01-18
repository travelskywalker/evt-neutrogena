var myEnvironment = 'idoplayer.idomoo.com/17/';

window.IdmEngineCallback = function () {

	Idm.Engine.init({
		domain: myEnvironment,
		url : localStorage.vid,
		"autostart": '1',
		"analytics": [
		["idm-cta-btn1","Button 1"],
		["idm-cta-btn2","Button 2"],
		["idm-cta-btn3","{{cta3}}"]
		]
	});
};
(function (d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = '//' + myEnvironment + '/assets/js/eng.js';
	js.async = false;
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'idomooEngine'));
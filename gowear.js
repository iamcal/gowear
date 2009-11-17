// $Id$
// ==UserScript==
// @name           Gowear Export
// @namespace      http://iamcal.com/
// @include        http://activitymanager.bodymedia.com/balance/tab.do
// @include        http://activitymanager.bodymedia.com/balance/index.do*
// ==/UserScript==

unsafeWindow['window'].handleInsertLoader = function(obj){

	var status = '???';
	var color = 'pink';

	if (obj.ok){
		status = 'Data stored at MYDOMAIN.com in '+obj.elapsed+'ms';
		color = '#cfc';
	}else{
		status = 'Hmm, we failed with the error '+obj.error;
		color = '#fcc';
	}

	var d = document.getElementById('dataPusherStatus');

	d.style.backgroundColor = color;
	d.innerHTML = status;
}

window.addEventListener('load', function(event) {

	var args = {
		date: unsafeWindow['window'].dojo.query("#CurrentDisplayDateId")[0].innerHTML,
		burn: unsafeWindow['window'].dojo.query(".burnactualbg > .actual-bar-number")[0].innerHTML,
		acti: unsafeWindow['window'].dojo.query(".physicalactualbg > .actual-bar-number")[0].innerHTML,
		step: unsafeWindow['window'].dojo.query(".stepsactualbg > .actual-bar-number")[0].innerHTML,
		slee: unsafeWindow['window'].dojo.query(".sleepactualbg > .actual-bar-number")[0].innerHTML
	};

	var args2 = [];
	for (var i in args){ args2.push(encodeURIComponent(i)+'='+encodeURIComponent(args[i])); }

	var url = 'http://www.MYDOMAIN.com/gowear.php?'+args2.join('&');

	var d = document.createElement('div');
	d.innerHTML = 'Sending data to MYDOMAIN.com...';
	d.style.position = 'absolute';
	d.style.left = '10px';
	d.style.top = '10px';
	d.style.border = '2px solid #000';
	d.style.padding = '4px';
	d.style.backgroundColor = '#ccf';
	d.id = 'dataPusherStatus';

	var s = document.createElement('script');
	s.src = url;

	unsafeWindow['document'].body.appendChild(d);
	unsafeWindow['document'].body.appendChild(s);

}, 'false');


function createCORSRequest(method, url) {

	var req = new XMLHttpRequest();
	if('withCredentials' in req) {
		req.open(method, url, true);
	}
	else if (typeof XDomainRequest != 'undefined') {
		req = new XDomainRequest();
		req.open(method, url);
	}
	else {
		req = null;
	}
	return req;
}

function clearContent(elementID) {
	document.getElementById(elementID).innerHTML = "";
}

function setContent(elementID, html) {
	document.getElementById(elementID).innerHTML = html;
}

function addContent(elementID, html) {
	document.getElementById(elementID).innerHTML += html;
}

function buildHTML(tag, attrs, html) {

	var h = '<' + tag;
	for(attr in attrs) {
		h += ' ' + attr + '="' + attrs[attr] + '"';
	} 
	return h + '>' + html + '</' + tag + '>';
}

function buildFile(name, date, size, filetype) {
	return ''
}

function buildFolder(name, date, contents) {
	return ''
}

function makeFilesClickable() {
	var fileList = document.getElementById('1');
	var buttons = fileList.getElementsByClassName('file');

	for(var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function() {
			var current = document.getElementsByClassName('active');
			if(current.length == 0) {
				this.className += ' active';
			}
			else {
				current[0].className = current[0].className.replace(' active', '');
				this.className += ' active';
			}
		});
	}
}

window.onload = function() {

	http = new XMLHttpRequest();
	url = 'http://localhost:3000';
	//url = 'http://ec2-34-230-17-245.compute-1.amazonaws.com:3000';

	var html;
	http.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			html = this.responseText;

			addContent(1, html);
			makeFilesClickable();
		}
	};

	http.open('GET', url + '/test', true);
	http.send();
}

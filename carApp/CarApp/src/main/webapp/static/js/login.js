/*
 * This file is going to make sure that someone is logged in
 * on whatever page i happen to go to.
 */
 loadJS = function(url, location){

    let scriptTag = document.createElement('script');
    scriptTag.src = url;
    location.appendChild(scriptTag);
};

 let navbar = `
<nav id ="navbar" style = "background-color: #A43530   " class="navbar navbar-expand-lg navbar-light nav-fill w-100">
	<a class="navbar-brand">
        <span width><img src = "static/images/trmslogoyellowbevel.png" width = "64" height = "64"></span>
    </a>
	<ul class="navbar-nav ml-auto" id="authent">
	</ul>
</nav>
`;
let unauthenticated = `
	<li class="nav-item">
		Username: <input type="text" id="username">
	</li>
	<li class="nav-item">
		Password: <input type="password" id="password">
	</li>
	<li class="nav-item">
		<button class="btn btn-primary" id="login">Login</button>
	</li>
    `;
let authenticated = `
	<li class="nav-item">
		Welcome <span id="authUserName"></span> 
	</li>
	<li class="nav-item">
		<button class="btn btn-danger" id="logout">Logout</button>
	</li>`;
employee = null;

baseURL = '/Project1/';

window.onload = () => {
	addNavBar();
	
}


	
	
function addNavBar() {
	console.log('adding nav bar');
	let body = document.getElementsByTagName('body')[0];
	body.style.background = "#D1FFF7 url(static/images/loginbg.png)";
	body.style.backgroundSize = "cover";
	let div = document.createElement('div');
	div.id = 'navbardiv';
	div.innerHTML = navbar;
	body.insertBefore(div, body.childNodes[0]);
	
	let authent = document.getElementById('authent');
	authent.innerHTML = unauthenticated;
	
	// add event listeners
	document.getElementById('login').addEventListener('click', authenticate);
	document.getElementById('password').onkeydown = checkPasswordEnter;
	authenticate();
}

function checkPasswordEnter() {
	if (event.which === 13) {
		authenticate();
	}
}

function authenticate() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = loginSuccess;
	xhttp.open('POST', baseURL+'login');
	xhttp.setRequestHeader('Content-type',
			'application/x-www-form-urlencoded');
	let user = document.getElementById('username').value;
	let pass = document.getElementById('password').value;
	xhttp.send('user='+user+'&pass='+pass);
	
	function loginSuccess() {
		if (xhttp.readyState === 4 && xhttp.status === 200) {
			let data = JSON.parse(xhttp.responseText);
			console.log(data);
			employee = data.employee;
			login = data.login;
			document.getElementById('authent').innerHTML=authenticated;
			document.getElementById('logout').onclick=logout;
			loadJS('/Project1/static/js/main.js', document.body);
			let body = document.getElementsByTagName('body')[0];
			body.style.background = "#D1FFF7 url(static/images/mainbg.png)";
			body.style.backgroundSize = "auto";

			if (employee) {

				supVar = null;
titleVar = null;
if(employee.title == 'BENCO' && !employee.sup){
    titleVar = 'PRINCIPAL';
    supVar = 'You rule the land.'
}else{
    titleVar = employee.title;
}
if (!employee.sup){
    supVar = 'You, but BENCO Principal Oro rules all.';
}
if (employee.sup){
	supVar = employee.sup.firstName + " " + employee.sup.lastName;
}
				document.getElementById('authUserName').innerHTML = 
					titleVar+': '+employee.firstName + ' ' + employee.lastName;
				let btns = document.getElementsByClassName('emp-btn');
				for (let i = 0 ; i< btns.length; i++){
					btns[i].disabled = false;
				}
			}
		}
	}
}

function logout() {
	console.log("logging out");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = finish;
    xhttp.open("DELETE", baseURL + "login");
    xhttp.send();
    
    function finish() {
    	if (xhttp.readyState === 4 && xhttp.status === 204) {
            document.getElementById("authent").innerHTML = unauthenticated;
            let btns = document.getElementsByClassName("emp-btn");
            for (let i = 0; i < btns.length; i++) {
                btns[i].disabled = true;
            }
            document.getElementById("login").addEventListener("click", authenticate);
            document.getElementById("password").onkeydown = checkPasswordEnter;
        }
    }
	backtohome();
}
function backtohome(){
	window.location.href=baseURL;
}
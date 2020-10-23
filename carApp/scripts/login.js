
 loadJS = function(url, location){

    let scriptTag = document.createElement('script');
    scriptTag.src = url;
    location.appendChild(scriptTag);
};
let navbar2 = `
<header id="navbar">
        <nav class="navbar-container container">
          <button type="button" class="navbar-toggle" aria-label="Open navigation menu">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
          <div class="navbar-menu detached">
            <ul class="navbar-links">
                <h3> Vehicle Search</h3>
              <li class="navbar-item">
                    <label for="class">Class:</label>
                    <select id = "class" class="navbar-link">
                        <option value="Military">Military</option>
                        <option value="Civilian">Civilian</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
              </li>
              <li class="navbar-item">
                    <label for="mode">Mode:</label>
                    <select id = "mode" class="navbar-link">
                        <option value="Land">Land</option>
                        <option value="Sea">Sea</option>
                        <option value="Air">Air</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
              </li>
              <li class="navbar-item">
                    <label for="model">Model:</label>
                    <select id = "model" class="navbar-link">
                    <option value="tank">Tank</option>
                    </select>
              </li>
              <li class="navbar-item">
                    <label for="price">Price:</label>
                    <span class = "nav-price-span">
                        <select id = "price" class="navbar-link">
                            <option value="min">Min</option>
                        </select>
                        <select id = "price2" class="navbar-link">
                        <option value="min">Max</option>
                        </select>
                    </span>
              </li>
              <button>Search</button>
            </ul>
          </div>
          <a href="index.html" class="home-link">
          <div class="navbar-logo"><img id ="logopic" src = "assets/logo.png"></div>
        </a>
        <a class = "authent-container" id="authent">
        </a>
        </nav>
    </header>
`;

let unauthenticated = `
	
		<input class= "navbar-box" type="text" id="username" placeholder = "User Name">
		<input class= "navbar-box" type="password" id="password" placeholder = "Password">
		<button id="login">GO</button>
    `;
let authenticated = `
	
		Welcome <span id="authUserName"></span> 
		<button id="logout">Logout</button>
	`;
employee = null;

baseURL = 'index.html';

window.onload = () => {
	addNavBar();	
}

document.getElementById("navbar-div").innerHTML = navbar2;
const navbar = document.getElementById("navbar");
const navbarToggle = navbar.querySelector(".navbar-toggle");

function addNavBar() {
    console.log('adding nav bar');	

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

	let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let data = {
        firstName: "Ternce",
        lastName: "Bron"
    }
    loginSuccess();
	
    function loginSuccess() {
		if (user) {
			console.log(data);
			document.getElementById('authent').innerHTML=authenticated;
			document.getElementById('logout').onclick=logout;
            document.getElementById('authUserName').innerHTML = 
            '  '+data.firstName + '  ' + data.lastName + '  ';
        }
    }
}    



function openSidebar() {
  navbar.classList.add("opened");
  navbarToggle.setAttribute("aria-label", "Close navigation menu.");
}

function closeSidebar() {
  navbar.classList.remove("opened");
  navbarToggle.setAttribute("aria-label", "Open navigation menu.");
}

navbarToggle.addEventListener("click", () => {
  if (navbar.classList.contains("opened")) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

const navbarMenu = navbar.querySelector(".navbar-menu");
const navbarLinksContainer = navbar.querySelector(".navbar-links");

navbarLinksContainer.addEventListener("click", (clickEvent) => {
  clickEvent.stopPropagation();
});

navbarMenu.addEventListener("click", closeSidebar);
const navType = "left sidebar";
navbarMenu.classList = "navbar-menu " + navType;

function logout() {
	console.log("logging out");   
	backtohome();
}
function backtohome(){
	window.location.href=baseURL;
}
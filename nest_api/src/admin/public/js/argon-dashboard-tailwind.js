var page = window.location.pathname.split('/').pop().split('.')[0];
var aux = window.location.pathname.split('/');
// var to_build = aux.includes('pages') || aux.includes('docs') ? '../' : './';
var to_build = '';
// var root = window.location.pathname.split('/');
if (!aux.includes('pages')) {
  page = 'dashboard';
}

loadStylesheet(to_build + '/admin/public/css/perfect-scrollbar.css');
loadJS(to_build + '/admin/public/js/perfect-scrollbar.js', true);

if (document.querySelector('[slider]')) {
  loadJS(to_build + '/admin/public/js/carousel.js', true);
}

if (document.querySelector('nav [navbar-trigger]')) {
  loadJS(to_build + '/admin/public/js/navbar-collapse.js', true);
}

if (document.querySelector("[data-target='tooltip']")) {
  loadJS(to_build + '/admin/public/js/tooltips.js', true);
  loadStylesheet(to_build + '/admin/public/css/tooltips.css');
}

if (document.querySelector('[nav-pills]')) {
  loadJS(to_build + '/admin/public/js/nav-pills.js', true);
}

if (document.querySelector('[dropdown-trigger]')) {
  loadJS(to_build + '/admin/public/js/dropdown.js', true);
}

if (document.querySelector('[fixed-plugin]')) {
  loadJS(to_build + '/admin/public/js/fixed-plugin.js', true);
}

if (
  document.querySelector('[navbar-main]') ||
  document.querySelector('[navbar-profile]')
) {
  if (document.querySelector('[navbar-main]')) {
    loadJS(to_build + '/admin/public/js/navbar-sticky.js', true);
  }
  if (document.querySelector('aside')) {
    loadJS(to_build + '/admin/public/js/sidenav-burger.js', true);
  }
}

if (document.querySelector('canvas')) {
  loadJS(to_build + '/admin/public/js/charts.js', true);
}

if (document.querySelector('.github-button')) {
  loadJS('https://buttons.github.io/buttons.js', true);
}

function loadJS(FILE_URL, async) {
  let dynamicScript = document.createElement('script');

  dynamicScript.setAttribute('src', FILE_URL);
  dynamicScript.setAttribute('type', 'text/javascript');
  dynamicScript.setAttribute('async', async);

  document.head.appendChild(dynamicScript);
}

function loadStylesheet(FILE_URL) {
  let dynamicStylesheet = document.createElement('link');

  dynamicStylesheet.setAttribute('href', FILE_URL);
  dynamicStylesheet.setAttribute('type', 'text/css');
  dynamicStylesheet.setAttribute('rel', 'stylesheet');

  document.head.appendChild(dynamicStylesheet);
}

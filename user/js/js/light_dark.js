const body = document.querySelector('body');
const btn_light_dark = document.querySelector('.btn_light_dark');
const icon = document.querySelector('.btn_icon');
function store(value){
	localStorage.setItem('dark_mode', value);
}


function load(){
	const dark_mode = localStorage.getItem('dark_mode');
	if(!dark_mode){
		store(false);
		icon.classList.add('fa-sun');
	} else if( dark_mode == 'true'){ //if the dark mode is activated
		body.classList.add('dark_mode');
		icon.classList.add('fa-moon');
	} else if(dark_mode == 'false'){ //if the dark mode exists but is disabled
		icon.classList.add('fa-sun');
	}
}

load();
btn_light_dark.addEventListener('click', () => {
	body.classList.toggle('dark_mode');
	icon.classList.add('animated');
	//save true or false
	store(body.classList.contains('dark_mode'));
	if(body.classList.contains('dark_mode')){
		icon.classList.remove('fa-sun');
		icon.classList.add('fa-moon');
	}else{
		icon.classList.remove('fa-moon');
		icon.classList.add('fa-sun');
	}
	setTimeout( () => {
		icon.classList.remove('animated');
	}, 5000)
})
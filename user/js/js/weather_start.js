const Weather_start = document.querySelector('.btn_started');

Weather_start.addEventListener('click',function(){
	document.querySelector('.home_page').classList.add('active');
	document.querySelector('.container').classList.add('active');
})
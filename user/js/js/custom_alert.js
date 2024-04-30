window.alert = function(message,timeout=null){
	const alert = document.createElement('div');
	const alert_active = document.createElement('li');
	alert.classList.add('alert');
	alert_active.innerHTML = '';
	alert.setAttribute('style',
		`
		font-family: "Kalam", cursive;
		position: absolute;
		top: 180px;
		right: 0;
		padding: 20px;
		overflow: hidden;
		justify-content: center;
		border-radius: 5px 20px;
		box-shadow: 0px 2px 2px 0px ;
		background-color: rgba(255, 255, 255, 0.4);  
		max-width: 100%;
		height: 90px;
		color: #000;
		text-align: center;
		font-size: 20px;
		font-style: normal;
		font-weight: 300;
		display: flex;
		flex-direction: column;
		border: 1px solid #000;
		animation : show_alert 1s ease forwards ;
		animation : hide_alert 2s ease forwards ;
		`		
	);
	alert_active.setAttribute('style',
		`
		background: #000;  
		background: -webkit-linear-gradient(to left, #FF0000, #FFF200, #1E9600); 
		background: linear-gradient(to left, #FF0000, #FFF200, #1E9600); 					 
		width: 300px;
		height: 1px;
		display: flex;
		animation : timeOut 1.5s linear 1 forwards ;
		`		
	);
	alert.innerHTML = `<span style="margin-bottom:12px">${message}<span>`;
	alert.appendChild(alert_active);
	alert.addEventListener('click',(e)=>{
		alert.remove();
	})
	if(timeout != null){
		setTimeout(()=>{
			alert.remove()
		},Number(timeout))
	}
	document.body.appendChild(alert);
}
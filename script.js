$(document).ready(function(){
	$("a").on("click", function(event){
		if (this.hash != "") {
			event.preventDefault();
			var id = this.hash;
			var start = this;
			var target = document.getElementById(id.substring(1));
			var distance = getDistance(start, target);
			var speed = 1500/1000;
			var time = distance / speed;
			console.log(time);
			$('html, div.container').animate({
				scrollTop: $(id).offset().top
			}, 500, function(){
				window.location.hash = id;
			});
		}
	});
});

function getDistance(element1, element2) {
	console.log(element1);
	console.log(element2);
	var aPosition = getPositionAtCenter(element1);
	var bPosition = getPositionAtCenter(element2);
	var aSquared = Math.pow(aPosition.x - bPosition.x, 2);
	var bSquared = Math.pow(aPosition.y - bPosition.y, 2);
	var distance = Math.sqrt(aSquared + bSquared);
	return distance;
}

function getPositionAtCenter(element) {
	var data = element.getBoundingClientRect();
	return {
		x: data.left + data.width / 2,
		y: data.top + data.height / 2
	};
}
var area;
var radius;
var circunference;

let calculate = function() {
	radius = parseFloat(document.getElementsByName('radiusInput')[0].value);
	area = Math.PI * Math.pow(radius ,2);
	circunference = 2 * Math.PI * radius;
	document.getElementsByName('areaInput')[0].value = area.toFixed(2);
	let circInput = document.getElementsByName('circunferenceInput')[0];
	circInput.value = circunference.toFixed(2);
};

let keyPress = function(key) {
	if (key.code == "Enter")
		calculate();
}

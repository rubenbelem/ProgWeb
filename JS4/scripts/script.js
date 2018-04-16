var area;
var radius;
var circunference;

let calculate = function() {
	radius = parseFloat(document.getElementsByName('radiusInput')[0].value);
	area = Math.PI * radius * radius;
	circunference = 2 * Math.PI * radius;
	document.getElementsByName('areaInput')[0].value = area.toFixed(2);
	document.getElementsByName('circunferenceInput')[0].value = circunference.toFixed(2);
};

let keyPress = function(key) {
	if (key.code == "Enter")
		calculate();
}

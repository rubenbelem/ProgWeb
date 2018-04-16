let calculate = function() {
	let radius = parseFloat(document.getElementsByName('radiusInput')[0].value);
	let area = Math.PI * radius * radius;
	let circunference = 2 * Math.PI * radius;

	document.getElementsByName('areaInput')[0].value = area.toFixed(2);
	document.getElementsByName('circunferenceInput')[0].value = circunference.toFixed(2);
};

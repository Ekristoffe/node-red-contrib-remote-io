// scales number (the scaled number can be outside the range of point A and B)
function scale(x, xA, xB, yA, yB) {
	// find the slope m
	let _m = (yB - yA) / (xB - xA);
	// find the intercept p
	let _p = yA - (_m * xA);
	// calculate the y
	let _y = (_m * x) + _p;
	
	return(_y);
}

// limit number
function limit(lo, val, hi) {
	if (val < lo) {
		return(lo);
	} else {
		if (val > hi) {
			return(hi);
		} else {
			return(val);
		}
	}
}

function signedMask(resolution) {
	let _mask = Math.pow(2,15) >>> 0;
	
	switch(resolution){
		case "4_Bit":
			_mask = Math.pow(2,3) >>> 0;
			break;
		case "8_Bit":
			_mask = Math.pow(2,7) >>> 0;
			break;
		case "12_Bit":
			_mask = Math.pow(2,11) >>> 0;
			break;
		case "16_Bit":
			_mask = Math.pow(2,15) >>> 0;
			break;
		case "20_Bit":
			_mask = Math.pow(2,19) >>> 0;
			break;
		case "24_Bit":
			_mask = Math.pow(2,23) >>> 0;
			break;
		case "28_Bit":
			_mask = Math.pow(2,27) >>> 0;
			break;
		case "32_Bit":
			_mask = Math.pow(2,31) >>> 0;
			break;
	}
  return _mask;
}

function signedSub(resolution) {
	let _sub = Math.pow(2,16) >>> 0;
	
	switch(resolution){
		case "4_Bit":
			_sub = Math.pow(2,4) >>> 0;
			break;
		case "8_Bit":
			_sub = Math.pow(2,8) >>> 0;
			break;
		case "12_Bit":
			_sub = Math.pow(2,12) >>> 0;
			break;
		case "16_Bit":
			_sub = Math.pow(2,16) >>> 0;
			break;
		case "20_Bit":
			_sub = Math.pow(2,20) >>> 0;
			break;
		case "24_Bit":
			_sub = Math.pow(2,24) >>> 0;
			break;
		case "28_Bit":
			_sub = Math.pow(2,28) >>> 0;
			break;
		case "32_Bit":
			_sub = Math.pow(2,32) >>> 0;
			break;
	}
  return _sub;
}
		
function fromSigned(resolution, num, raw2Complement) {
	let _mask = signedMask(resolution);
	let _sub = signedSub(resolution);
	let _num = num;
	if (num < 0) {
		if (raw2Complement !== false) {
			_num = num + _sub;
		} else {
			_num = (num & ~_mask) * -1;
		}
	}
	return _num;
}

function toSigned(resolution, num, raw2Complement) {
	let _mask = signedMask(resolution);
	let _sub = signedSub(resolution);
	let _num = num;
	if ((num & _mask) !== 0) {
		if (raw2Complement !== false) {
			_num = num - _sub;
		} else {
			_num = (num & ~_mask) * -1;
		}
	}
	return _num;
}

function toFixed(num, precision) {
	return (+(Math.round(+(num + "e" + precision)) + "e" + -precision)).toFixed(precision);
}

exports.scale = scale;
exports.limit = limit;
exports.fromSigned = fromSigned;
exports.toSigned = toSigned;
exports.toFixed = toFixed;

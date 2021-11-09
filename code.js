const showBtn = document.querySelector('.show-btn')
const timeInput = document.querySelector('.time_inp')
let dataFromClient = []

showBtn.addEventListener('click', function () {
	let timeInArr = timeInput.value.split('/').map(Number)
	let d = new Date()
	if (timeInput.value
		&& (timeInArr[2] >= d.getFullYear()
			|| (timeInArr[2] >= d.getFullYear() && timeInArr[1] >= d.getMonth() + 1)
			|| (timeInArr[2] >= d.getFullYear() && timeInArr[1] >= d.getMonth() + 1 && timeInArr[0] >= d.getDate()))) {
		if (timeInArr[1] <= 12 && timeInArr[0] <= 31) {
			document.querySelector('.countdown').style.display = 'block'
			document.querySelector('.home').style.display = 'none'
			document.querySelector(".countdown-to").innerHTML = document.querySelector('.title_inp').value

			dataFromClient = [timeInArr[0], timeInArr[1], timeInArr[2]]

			setTime()
			setInterval(() => {
				setTime()
			}, 1000)
		}
	}
})

function setTime() {
	let date = new Date()

	let nowTime = {
		day: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
		hours: date.getHours(),
		mins: date.getMinutes(),
		secs: date.getSeconds(),
	}

	let resultData = {
		day: dataFromClient[0] - nowTime.day,
		month: dataFromClient[1] - nowTime.month,
		year: dataFromClient[2] - nowTime.year,
		hours: 24 - nowTime.hours,
		mins: 60 - nowTime.mins,
		secs: 60 - nowTime.secs,
	}

	if (resultData.secs > 0) resultData.mins -= 1
	if (resultData.mins > 0) resultData.hours -= 1
	if (resultData.hours > 0) resultData.day -= 1

	if (resultData.year > 1) resultData.day += (resultData.year - 1) * 365
	if (dataFromClient[1] > nowTime.month) resultData.day += resultData.month * 30
	else {
		resultData.day += (12 - nowTime.month + dataFromClient[1]) * 30
	}

	document.querySelector('.day').innerHTML = resultData.day
	document.querySelector('.hour').innerHTML = resultData.hours
	document.querySelector('.min').innerHTML = resultData.mins
	document.querySelector('.sec').innerHTML = resultData.secs
}

document.querySelector('.time_inp').addEventListener('input', function (e) {
	let inpValue = e.target.value
	let withoutSlash = inpValue.split('/').join('')

	if (inpValue.length < 11) {
		if (Number(withoutSlash) != withoutSlash || inpValue[inpValue.length - 1] == ' ') {
			inpValue = inpValue.split('')
			inpValue.pop()
			document.querySelector('.time_inp').value = inpValue.join('')
		} else if ((inpValue.length == 2 || inpValue.length == 5) && inpValue[inpValue.length - 1] != '/') {
			document.querySelector('.time_inp').value += '/'
		}
	} else {
		inpValue = inpValue.split('')
		inpValue.pop()
		document.querySelector('.time_inp').value = inpValue.join('')
	}
})
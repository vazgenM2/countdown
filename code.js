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
	let res = [0, 0, 0, 0]
	let nowDate = new Date().getTime()
	let clientDate = new Date(dataFromClient[2], dataFromClient[1] - 1, dataFromClient[0]).getTime()
	let dateBySec = Math.round((clientDate - nowDate) / (1000))

	while (dateBySec > 86400) {
		dateBySec -= 86400
		res[0]++
	}
	while (dateBySec > 3600) {
		dateBySec -= 3600
		res[1]++
	}
	while (dateBySec > 60) {
		dateBySec -= 60
		res[2]++
	}
	res[3] = dateBySec
	dateBySec = 0

	res.map(time => {
		if (time < 0) time = 0
	})
	document.querySelector('.day').innerHTML = res[0]
	document.querySelector('.hour').innerHTML = res[1]
	document.querySelector('.min').innerHTML = res[2]
	document.querySelector('.sec').innerHTML = res[3]
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
var request = new XMLHttpRequest()
request.open('GET','https://aqs.epa.gov/data/api/monitors/byState?email=hahahahah&key=hahahhahaha&param=88101,42101,42602,44201&bdate=20150501&edate=20200101&state=24', true)

const ozone = document.getElementById('OZ')
const co = document.getElementById('CO')
const so2 = document.getElementById('SO')
const no2 = document.getElementById('NO')

//should have just auto generated these instead of being stupid but there you go 

request.onload = function() {
var data = JSON.parse(this.response)
if (request.status >= 200 && request.status < 400) {
	data['Data'].forEach((element) =>{
		console.log(element.address);
		console.log(element.county_name);
		const p = document.createElement('p');
		p.textContent = element.address + "; " + element.county_name;

		if (element.parameter_code=="88101"){	
			no2.appendChild(p);
		}else if (element.parameter_code=="42101"){
			co.appendChild(p);
		}else if (element.parameter_code=="42602"){
			so2.appendChild(p);
		}else if (element.parameter_code=="44201"){
			ozone.appendChild(p);
		}
	})

}else {
    console.log('error')
  }

}

request.send()

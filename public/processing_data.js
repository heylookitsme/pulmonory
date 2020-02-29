var request = new XMLHttpRequest()
request.open('GET','https://aqs.epa.gov/data/api/monitors/byState?email=rachelwu.47@gmail.com&key=aquahawk43&param=88101,42101,42602,44201&bdate=20150501&edate=20200101&state=24', true)

const ozone = document.getElementById('OZ')
const co = document.getElementById('CO')
const so2 = document.getElementById('SO')
const no2 = document.getElementById('NO')
ozone.setAttribute('class', 'container')
co.setAttribute('class', 'container')
no2.setAttribute('class', 'container')
so2.setAttribute('class', 'container')

request.onload = function() {
var data = JSON.parse(this.response)
if (request.status >= 200 && request.status < 400) {

	data['Data'].forEach((element) =>{

	const station = document.createElement('div');
		station.setAttribute('class', 'station');
		const p = document.createElement('p');
		p.textContent = element.address + "; " + element.county_name + " county";
		const h3 = document.createElement("h3");
		h3.textContent = element.local_site_name + ": " +element.monitoring_agency;
		if (element.parameter_code=="88101"){	
			no2.appendChild(station);
		}else if (element.parameter_code=="42101"){
			co.appendChild(station);
		}else if (element.parameter_code=="42602"){
			so2.appendChild(station);
		}else if (element.parameter_code=="44201"){
			ozone.appendChild(station);
		}
		station.appendChild(h3);
		station.appendChild(p);

	var req = new XMLHttpRequest()
	caddr = element.county_name.split(" ").filter(function(e){return e});
	req.open('GET', 'https://pixabay.com/api/?key=15436289-22d82262166aaefc085c0a426&q='+caddr[0]+'&image_type=photo', true)
	var imag = "http://fotw.fivestarflags.com/images/m/mn1.gif"
	req.onload = function() {
	var data = JSON.parse(this.response)
	if (data['hits'][0]==null){
		imag = "http://fotw.fivestarflags.com/images/m/mn1.gif";
	}else{
		imag = data['hits'][0].previewURL;
	}
	const statimg = document.createElement('img');
	statimg.setAttribute("width","200px");
	statimg.src=imag;
	station.appendChild(statimg);

	}
	req.send()
	
	})

}else {
    console.log('error')
  }

}

request.send()

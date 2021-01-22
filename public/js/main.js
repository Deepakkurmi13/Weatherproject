const submitbtn = document.getElementById('submitbtn');
const cityname = document.getElementById("cityname");
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');
const datahide = document.querySelector('.middle_layer');
const getInfo = async(event) => {

    event.preventDefault();

    let cityvalue = cityname.value;

    if (cityvalue == "") {

        city_name.innerText = 'please write the name before search';
        datahide.classList.add('data_hide');

    } else {
        try {

            let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityvalue + '&units=metric&appid=caef3f3987277fefdc683fd2389514de';
            const responce = await fetch(url);
            const data = await responce.json();
            const arrData = [data];
            city_name.innerText = arrData[0].name + arrData[0].sys.country;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempmood = arrData[0].weather[0].main;

            //condition to check cloud or sunny

            if (tempmood == "Clear") {

                temp_status.innnerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";

            } else if (tempmood == "Clouds") {
                temp_status.innnerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";

            } else if (tempmood == "Rain") {
                temp_status.innnerHTML = "<i class='fas fa-rain' style='color: #a4b0be;'></i>";

            } else {
                temp_status.innnerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";

            }

            datahide.classList.remove('data_hide');

        } catch {

            city_name.innerText = 'please enter the city name proper';
            datahide.classList.add('data_hide');
        }
    }
}


submitbtn.addEventListener("click", getInfo);
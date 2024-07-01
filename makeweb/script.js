const contrycard = document.querySelector("#countryboxes");

const regions = document.querySelectorAll(".region");
const inputbox = document.querySelector(".inputbox input");



function filtercard(data) {
  data.forEach((country) => {
    // console.log(country.flags.svg)

    const popu = country.population;
    const res = popu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const countryCardList = document.createElement("a");
    countryCardList.href = `country.htm?name=${country.name.common}`;
    countryCardList.classList.add("firstcountry");

    countryCardList.innerHTML = ` <img src="${country.flags.svg}" alt="${country.name.common}">
                      <div class="country-details">
                          <h3 class="contry-name">${country.name.common}</h3>
                          <p><b>popultion: </b><span>${res}</span></p>
                          <p><b>region: </b><span>${country.region}</span></p>
                          <p><b>capital :</b> <span>${country.capital}</span></p>
                      </div>
      `;

    contrycard.appendChild(countryCardList);
  });
}




//default country view
let allcountrydats = fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    filtercard(data)
    allcountrydats = data
  });


//select filter view  
regions.forEach((data) => {
  console.log(data.id);
  data.addEventListener("click", () => {
    fetch(`https://restcountries.com/v3.1/region/${data.id}`)
      .then((res) => res.json())
      .then((data) => {
        contrycard.innerHTML = "";
        filtercard(data)
      });
  });
});




//this  is  country filter  line below-----

const arrow = document.querySelector(".arrow");
const filterbox = document.querySelector(".filterboxlist");
arrow.addEventListener("mouseover", () => {
  filterbox.classList.toggle("openarrow");
});

document.body.addEventListener("click", () => {
  filterbox.classList.remove("openarrow");
});



inputbox.addEventListener('input', (e) => {
  let contrysearch = e.target.value;

  const allcountrysearch = allcountrydats.filter(data => data.name.common.toLocaleLowerCase().includes(contrysearch));

  contrycard.innerHTML = ''
  filtercard(allcountrysearch)

})


const lightmode = document.querySelector(".lightmode");
const darkmode = document.querySelector(".darkmode");


lightmode.addEventListener('click',()=>{
  document.body.classList.add("mode");
  darkmode.style.display= 'block'
  lightmode.style.display= 'none'

})

darkmode.addEventListener('click',()=>{
  document.body.classList.remove("mode");
  darkmode.style.display= 'none'
  lightmode.style.display= 'block'
})

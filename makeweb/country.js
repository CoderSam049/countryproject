let contryName = new URLSearchParams(location.search).get("name");
const bordercountry= document.querySelector('.bordercountry')
fetch(`https://restcountries.com/v3.1/name/${contryName}/?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    const borderdata = data[0].borders;
    // console.log(borderdata);
    if (borderdata) {
      borderdata.forEach((element) => {
        console.log(element);
        fetch(`https://restcountries.com/v3.1/alpha/${element}`)
          .then((res) => res.json())
          .then(([bordercontrydata]) => {
            console.log(bordercontrydata);
            const bordercountrytag = document.createElement("a");
            bordercountrytag.classList.add('btn');
          
            bordercountrytag.innerText = bordercontrydata.name.common;
            bordercountrytag.href= `country.htm?name=${bordercontrydata.name.common}`
            bordercountry.appendChild(bordercountrytag)
            console.log(bordercountrytag);
          });
      });
    }

    const countryName = data[0].name.common;
    console.log(countryName);

    const countryimg = document.querySelector("img");
    countryimg.src = data[0].flags.svg;

    const countryall = document.querySelector(".allcountry");

    const countryh2 = document.querySelector(".countryh2");
    countryh2.innerText = countryName;

    // Handle multiple native names if they exist

    const nativeNameKey = Object.keys(data[0].name.nativeName)[0];
    const nativeName = data[0].name.nativeName[nativeNameKey].common;

    // Handle multiple currencies if they exist

    const currencyKey = Object.keys(data[0].currencies)[0];
    const currencyName = data[0].currencies[currencyKey].name;

    // Handle multiple languages if they exist
    const languageKey = Object.keys(data[0].languages)[0];
    const languageName = data[0].languages[languageKey];

    // Handle top-level domains
    const topLevelDomain = data[0].tld.join("_");
    console.log(topLevelDomain);


    countryall.innerHTML = `
      <div class="country-details country-details-gap">
        <h2 class="countryh2">${countryName}</h2>
        <p><b>Native Name:</b> &nbsp;&nbsp;<span>${nativeName}</span></p>
        <p><b>Population:</b> &nbsp;&nbsp;<span>${data[0].population}</span></p>
        <p><b>Region:</b> &nbsp;&nbsp;<span>${data[0].region}</span></p>
        <p><b>Sub-region:</b> &nbsp;&nbsp;<span>${data[0].subregion}</span></p>
        <p><b>Capital:</b> &nbsp;&nbsp;<span>${data[0].capital[0]}</span></p>
      </div>
      <div class="country-details">
        <p><b>Top Level Domain:</b> &nbsp;&nbsp;<span>${topLevelDomain}</span></p>
        <p><b>Currencies:</b> &nbsp;&nbsp;<span>${currencyName}</span></p>
        <p><b>Language:</b> &nbsp;&nbsp;<span>${languageName}</span></p>
      </div>
    `;
  });



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
  
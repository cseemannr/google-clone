const inputEL = document.querySelector("input[type='text']");
const localEl = document.querySelector(".local");
const offeredEl = document.querySelector(".offered-language");

inputEL.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    const inputValue = inputEL.value;
    window.location.href = `https://www.google.com/search?q=${inputValue}&hl=en&sxsrf=ALiCzsaXff9bZrvDRZVm0ww5GmARCQiVTA%3A1669664998751&source=hp&ei=5hCFY8fqKZTakwXf6KWADg&iflsig=AJiK0e8AAAAAY4Ue9hXcmyFJWwShAUvXxgoY1I2WiEkU&ved=0ahUKEwjH9Y_p0tH7AhUU7aQKHV90CeAQ4dUDCAg&uact=5&oq=${inputValue}&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBwgAEIAEEAoyBQgAEIAEMgUIABCGAzIFCAAQhgM6CwguEIAEEMcBENEDOgQIIxAnOgUIABCRAlAAWIAiYJokaABwAHgAgAFciAGVBpIBAjEwmAEAoAEB&sclient=gws-wiz`;
  }
});

window.onload = function () {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(geoApiUrl)
      .then((res) => res.json())
      .then((data) => {
        localEl.textContent = data.countryName;
        offeredEl.textContent = data.localityInfo.informative[4].name;
      });
  };

  const error = () => {
    localEl.textContent = "Unable to retrieve your location";
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=XXXXXXXXXXXX&longitude=XXXXXXXXXXXX&localityLanguage=en

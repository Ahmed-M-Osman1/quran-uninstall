const paramLang = new URLSearchParams( window.location.href).get("lang");
const availableLang = ["ar", "en", "fr", "tr"];

if(availableLang.includes(paramLang)){
  const allLangTags = document.querySelectorAll(`.${paramLang}`);
  allLangTags.forEach(ele => ele.classList.remove(`${paramLang}`))
  loadSubmitTextAreaContent(paramLang)
  document.getElementById('languageSelect').value = paramLang;
} else {
  const allLangTags = document.querySelectorAll(".en");
  allLangTags.forEach(ele => ele.classList.remove("en"))
}

function enableSubmission() {
  const isChecked = Array.from(document.querySelectorAll('input[type="checkbox"]'));
  const enableSubmitBtn = isChecked.some((checkbox) => checkbox.checked);
  const submitBtn = document.querySelector('.submission-btn')
  if(enableSubmitBtn) {
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = "rgb(67,130,247)"
    submitBtn.style.border = "solid 2px rgb(67,130,247)"
  } else {
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "rgb(128,128,128)"
    submitBtn.style.border = "solid 2px rgb(128,128,128)"
  }
}
function loadSubmitTextAreaContent (lang){
switch (lang){
  case "ar":
    document.querySelector(".tell-us-more").placeholder = "نود أن نسمع المزيد منك. هل يمكنك أن تقول لنا المزيد..."
    document.querySelector(".submission-btn").innerHTML = "ارسال"
    document.querySelector(".body-card").style.fontFamily = "Tajawal_Medium, sans-serif";
    document.querySelector(".reinstall-ar").style.fontFamily = "Tajawal_Medium, sans-serif";
    document.querySelector(".submission-btn").style.fontFamily = "Tajawal_Medium, sans-serif";
    document.querySelector("body").style.direction = "rtl";
    document.querySelector("form").style.textAlign = "justify"
    document.querySelector(".icon").style.float = "right"
    document.querySelector(".questions").style.float = "left"
    break;
  case "fr":
    document.querySelector(".tell-us-more").placeholder = "Nous aimerions en savoir plus de votre part. Pourriez-vous nous en dire plus..."
    document.querySelector(".submission-btn").innerHTML = "Soumettre"
    break
  case "tr":
    document.querySelector(".tell-us-more").placeholder = "sizden daha fazlasını duymak isteriz. lütfen bize daha fazlasını anlatır mısınız..."
    document.querySelector(".submission-btn").innerHTML = "Gönder"
    break
  default:
    break
  }
}

function redirectToLang(lang) {
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.set('lang', lang);
  window.location.href = currentURL.toString();
}

function browserDetect(){
  let userAgent = navigator.userAgent;
  if(userAgent.match(/firefox|fxios/i)){
    window.location.href = "https://addons.mozilla.org/en-US/firefox/addon/quran-tab-firefox/"
  } else if(userAgent.match(/edg/i)){
    window.location.href = "https://microsoftedge.microsoft.com/addons/detail/quran-tab/hnfepfakgcalolgicjdfmaaellnondji?hl=es-ES"
  }else{
    window.location.href = "https://chromewebstore.google.com/detail/quran-tab/afaihcdgkjebgabomemccdneglknjkdd"
  }
}


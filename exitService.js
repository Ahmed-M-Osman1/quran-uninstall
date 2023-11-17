const params = new URLSearchParams(window.location.search);
const paramLang = params.get("lang");
const availableLang = ["ar", "en", "fr", "tr"];

function updateLanguage(lang) {
  const langTags = document.querySelectorAll(`.${lang}`);

  langTags.forEach(ele => ele.classList.remove(lang));
  loadSubmitTextAreaContent(lang);
  document.getElementById("languageSelect").value = lang;
}

if (availableLang.includes(paramLang)) {
  updateLanguage(paramLang);
} else {
  updateLanguage("en");
}

function enableSubmission() {
  const isChecked = Array.from(document.querySelectorAll("input[type='checkbox']"));
  const enableSubmitBtn = isChecked.some(checkbox => checkbox.checked);
  const submitBtn = document.querySelector(".submission-btn");

  submitBtn.disabled = !enableSubmitBtn;
  submitBtn.style.backgroundColor = enableSubmitBtn ? "rgb(67,130,247)" : "rgb(128,128,128)";
  submitBtn.style.border = `solid 2px ${enableSubmitBtn ? "rgb(67,130,247)" : "rgb(128,128,128)"}`;
}

function loadSubmitTextAreaContent(lang) {
  if (lang === "en") return;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  const placeholders = {
    ar: "نود أن نسمع المزيد منك. هل يمكنك أن تقول لنا المزيد...",
    fr: "Nous aimerions en savoir plus de votre part. Pourriez-vous nous en dire plus...",
    tr: "sizden daha fazlasını duymak isteriz. lütfen bize daha fazlasını anlatır mısınız...",
  };

  const submitTexts = {
    ar: "إرسال",
    fr: "Soumettre",
    tr: "Gönder",
  };

  document.querySelector(".tell-us-more").placeholder = placeholders[lang] || "";
  document.querySelector(".submission-btn").innerHTML = submitTexts[lang] || "";
}

function redirectToLang(lang) {
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.set("lang", lang);
  window.location.href = currentURL.toString();
}

function browserDetect() {
  window.location.href = navigator.userAgent.includes("Edg")
      ? "https://microsoftedge.microsoft.com/addons/detail/quran-tab/hnfepfakgcalolgicjdfmaaellnondji?hl=es-ES"
      : "https://chromewebstore.google.com/detail/quran-tab/afaihcdgkjebgabomemccdneglknjkdd";
}
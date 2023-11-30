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

function redirectToLang(lang, toThankYouPage) {
  const currentURL = toThankYouPage ?  new URL(window.location.origin + '/thankyou') : new URL(window.location.href);
  currentURL.searchParams.set("lang", lang);
  window.location.href = currentURL.toString();
}

function browserDetect() {
  window.location.href = navigator.userAgent.includes("Edg")
      ? "https://microsoftedge.microsoft.com/addons/detail/quran-tab/hnfepfakgcalolgicjdfmaaellnondji?hl=es-ES"
      : "https://chromewebstore.google.com/detail/quran-tab/afaihcdgkjebgabomemccdneglknjkdd";
}


const SUPABASE_URL = 'https://uakfujmfwhamfievqpof.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVha2Z1am1md2hhbWZpZXZxcG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzNDEwOTYsImV4cCI6MjAxNjkxNzA5Nn0.GlYDaPCqGcq4bEZEFt1yGqD00KvVTMc2XYs6B2R6Av4'

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function submitSubscriptionForm(){
  const bugs = document.getElementById("bugs").checked;
  const design = document.getElementById("design").checked;
  const color = document.getElementById("color").checked;
  const features = document.getElementById("features").checked;
  const responsive = document.getElementById("responsive").checked;
  const other = document.getElementById("other").checked;
  const textArea = document.getElementById("text-area").value;
  const location = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const browserType = navigator.userAgent.includes("Edg") ? "Edg" : "Chrome";
  const { data, error } = await _supabase
      .from('uninstall_feedback')
      .insert([ {it_had_bugs: bugs, design_is_unconformable_to_me:design, color_is_unconformable_to_me: color,  i_was_expecting_more_features : features, The_extension_was_slow_or_unresponsive:responsive, other:other, tell_us_more:  textArea, location: location, browserType: browserType}])
  redirectToLang(paramLang, true)
}
const language = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu"
}
  
  
  
  let selectTag = document.querySelectorAll("select");
  let fromText = document.querySelector('.fromText');
  let transText= document.querySelector('.toTranslate');
  let fromVoice = document.querySelector('.from');
  let toVoice = document.querySelector('.to');
  let cpyBtn = document.querySelector('.bx-copy');
  let countValue = document.querySelector(.code_length);
  let exchangeLang = document.querySelector('.bx-transfer');
  selectTag.forEach((tag, id) => {
    for (let lang_code in language) {
      let selected =
        id == 0
          ? lang_code == "en-GB"
            ? "selected"
            : ""
          : lang_code == "fa-IR"
          ? "selected"
          : "";
      let option = `<option ${selected} value="${lang_code}">${language[lang_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option);
    }
  });
  
  
    
  

fromText.addEventListener("input", () => {
  if (!fromText.value) {
    transText.value = "";
  }
});
fromText.addEventListener("input", () => {
  let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
  if (!text) return;
  transText.setAttribute("placeholder", "Translating...");
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      transText.value = data.responseData.translatedText;
      data.matches.forEach((data) => {
        if (data.id === 0) {
          transText.value = data.translation;
        }
      });
      transText.setAttribute("placeholder", "Translation");
    });
});
 
fromVoice.addEventListener('click', function(){
  let fromTalk;
  fromTalk= new SpeechSynthesisUtterance(fromText.value);
  fromTalk.lang = selectTag[0].value;
  speechSynthesis.speak(fromTalk); 
});

toVoice.addEventListener('click' , function(){
  let toTalk;
  toTalk = new SpeechSynthesisUtterance(transText.value);
  toTalk.lang = selectTag[1].value;
  speechSynthesis.speak(toTalk); 
});
cpyBtn.addEventListener('click' , function(){
  navigator.clipboard.writeText(transText.value);
});
fromText.addEventListener('keyup' , function(){
  countValue.innerHTML = '${fromText.value.length}/5,000' ;
});
exchangeLang.addEventListener('click' , function(){
  let tempText= fromText.value;
  fromText.value= transText.value;
  transText.value = tempText;

  let tempOpt = langOption[0].value;
  langOption[0].value = langOption[1].value;
  langOption[1].value= tempOpt;
});
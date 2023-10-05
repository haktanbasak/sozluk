const url = "https://sozluk.gov.tr/gts?ara=";
// const audioUrl = "https://sozluk.gov.tr/yazim?ara="
//const url = "htpps://api.dictionaryapi.dev/api/v2/entries/en" Yabancı sözlük api

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
var ornek = "";

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
        if (data[0].anlamlarListe[0].orneklerListe) 
        {
             ornek = data[0].anlamlarListe[0].orneklerListe[0].ornek;
        }
        else
        {
            ornek = "";
        }
          
        var tekilMi = "";
        if(data[0].cogul_mu == 0)
        {
            tekilMi = "Tekil";
        }
        else
        {
            tekilMi = "Çoğul"
        }

      console.log(data);
      result.innerHTML = `
        <div class="word">
            <h3>${inpWord}</h3>
            <button>
                <i id="btnAudio" class="fa-solid fa-volume-high"></i>
            </button>
        </div>
        <div class="details">
            <p>${data[0].anlamlarListe[0].ozelliklerListe[0].tam_adi}</p>
            <p>/${tekilMi}/</p>
        </div>
            <p class="word-meaning">
                ${data[0].anlamlarListe[0].anlam}
            </p>
            <p class="word-example">
                ${ornek}
            </p>`;
    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Kelime bulunamadı</h3>`;
    })
});

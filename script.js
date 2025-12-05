const flower = document.getElementById("flower");
const center = document.getElementById("center");
const blowBtn = document.getElementById("blowBtn");
const messageBox = document.getElementById("messageBox");

const messages = [
    "Şu an yanımda olmanı çok isterdim,\nAma değilsin.\nSen oradasın; ve orası,\nNe kadar şanslı olduğunu bilmiyor.",
    "Seni özlemek zor değil,\nZor olan, sensiz geçen zaman.\nAma şunu bil ki,\nHer saniye beni sana daha fazla bağlıyor.",
    "Baktığımız gökyüzü aynı,\nAynı Ay, aynı Güneş, aynı yıldızlar.\nAma sen başka yerde bense bambaşka.\nBen burda gökyüzüne bakarak seni düşünürken,\nSenin bulunduğun yer biraz daha güzelleşiyor.",
    "Bazen kapatıyorum gözlerimi,\nVe hayal ediyorum yanımda seni,\nSanki o an zaman yavaşlıyor gibi geliyor.\nVe o an, ben biraz daha sakinleşiyorum.",
    "Belki uzaktayız,\nBelki farklı şehirlerdeyiz,\nAma kalplerimizin hep beraber olduğunu hissediyorum.\nVe bu his beni sana her seferinde biraz daha aşık ediyor.",
    "Gün içinde rastgele bir an,\nGeliyorsun aniden aklıma.\nVe o an,\nKalbim bana seni ne kadar sevdiğimi tekrar hatırlatıyor.",
    "Seni düşündüğümde, gölgeymişsin gibi hissediyorum.\nHep yanımdasın ama dokunamıyorum.\nAma bil ki, bu gölge,\nGördüğüm en parlak gölge.",
    "Seni düşünmek artık bir alışkanlık haline geldi.\nFarkında olmadan yaptığım.\nVe bu alışkanlık,\nKalbimin en sessiz ve güzel bağımlılığı.",
    "Bazen içimde bir rüzgar esiyor,\nAdını taşıyan bir rüzgar.\nBen o rüzgarda seni hissediyorum,\nVe bu his içimdeki tüm fırtınaları hafif bir esintiye dönüştürüyor.",
    "Seni düşünmek bazen acıtıyor,\nAma bu acı bile tatlı geliyor.\nÇünkü bu acı,\nKalbimde sakladığım sevgiyi yeniden hatırlatıyor.",
    "Sana dair her şey, içimde bir iz bırakıyor.\nSilinmeyen bir iz.\nGülüşün, bakışın, sesin...\nHatta yokluğun bile.",
    "Sana söylemek istediğim çok şey var,\nAma en çok şunu bil;\nİçimdeki tüm o karanlıkta bile,\nSana ait bir parıltı var."
];

// ✅ Çiçeği oluştur
function createFlower() {

    center.textContent = "";  

    const stem = flower.querySelector(".stem");
    stem.classList.add("grow");

    const oldPetals = flower.querySelectorAll(".petal");
    oldPetals.forEach(p => p.remove());

    for (let i = 0; i < 12; i++) {
        const petal = document.createElement("div");
        petal.className = "petal start";
        petal.dataset.message = messages[i];
        petal.style.setProperty("--angle", `${i * 30}deg`);

        petal.addEventListener("animationend", () => {
            petal.classList.remove("start");
            petal.classList.add("final");
            petal.classList.add("button-mode");
        });

        flower.appendChild(petal);
    }

    setTimeout(() => {
        blowBtn.classList.add("show");
    }, 2000);

    setTimeout(() => {
        const rightVein = document.getElementById("right-vein");
        const leftVein = document.getElementById("left-vein");

        rightVein.style.transition = "stroke-dashoffset 1.5s ease-out";
        leftVein.style.transition = "stroke-dashoffset 1.5s ease-out";

        rightVein.style.strokeDashoffset = "0";
        leftVein.style.strokeDashoffset = "0";
    }, 1500);
}

center.addEventListener("click", createFlower);

// ✅ Üfleme animasyonu
blowBtn.addEventListener("click", () => {
    blowBtn.remove();

    center.style.opacity = "0";
    center.style.transform = "scale(0.3)";
    center.style.transition = "opacity 1s ease, transform 1s ease";

    const petals = document.querySelectorAll(".petal.final");

    requestAnimationFrame(() => {

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        petals.forEach(p => {

            // ✅ Transform'u tamamen sıfırla (kritik)
            p.style.transform = "none";
            p.style.transformOrigin = "center center";

            const rect = p.getBoundingClientRect();
            const startX = rect.left;
            const startY = rect.top;
            const width = rect.width;
            const height = rect.height;

            const angle = Math.random() * 2 * Math.PI;

            // ✅ Sabit savrulma mesafesi: 400px
            const dist = 400;

            let endX = startX + Math.cos(angle) * dist;
            let endY = startY + Math.sin(angle) * dist;

            // ✅ EKRAN DIŞINA ÇIKMAYI TAMAMEN ENGELLEYEN KİLİT
            if (endX < 0) endX = 0;
            if (endX > screenW - width) endX = screenW - width;

            if (endY < 0) endY = 0;
            if (endY > screenH - height) endY = screenH - height;

            // ✅ RASTGELE EKSTRA DÖNÜŞ (radyan)
            const randomSpin = Math.random() * 2 * Math.PI;

            // ✅ Yaprağı gerçek pozisyona al
            p.style.position = "fixed";
            p.style.left = startX + "px";
            p.style.top = startY + "px";

            // ✅ Yumuşak savrulma animasyonu
            p.style.transition =
                "left 2s cubic-bezier(.25,.46,.45,.94), " +
                "top 2s cubic-bezier(.25,.46,.45,.94), " +
                "transform 2s ease-out";

            // ✅ Hedef pozisyon
            p.style.left = endX + "px";
            p.style.top = endY + "px";

            // ✅ Artık her yaprak farklı bir açıyla bitiyor
            p.style.transform = `rotate(${randomSpin}rad)`;
        });
    });

    const stem = document.querySelector(".stem");
    stem.style.transition = "opacity 1.5s ease, transform 1.5s ease";
    stem.style.opacity = "0";
    stem.style.transform = "translateX(-50%) translateY(300px) scaleY(0.6)";
});

// ✅ Yaprak seçme ve mesaj gösterme
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("petal")) return;

    const selected = e.target;
    const petals = document.querySelectorAll(".petal");

    petals.forEach(p => {
        if (p !== selected) {
            p.style.transition = "transform 1.5s ease-in, opacity 1.5s";
            p.style.transform += " translateY(400px)";
            p.style.opacity = "0";
        }
    });

    setTimeout(() => {
        selected.style.transition = "opacity 1.5s, transform 1.5s";
        selected.style.opacity = "0";
        selected.style.transform += " scale(0.5)";

        messageBox.textContent = selected.dataset.message;
        messageBox.style.opacity = "1";
    }, 1500);
});
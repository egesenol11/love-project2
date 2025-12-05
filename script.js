const flower = document.getElementById("flower");
const center = document.getElementById("center");
const blowBtn = document.getElementById("blowBtn");

const messages = [
    "Şu an yanımda olmanı çok isterdim,\nAma değilsin.\nSen oradasın; ve orası,\nNe kadar şanslı olduğunu bilmiyor.",
    "Seni özlemek zor değil,\nZor olan, sensiz geçen zaman.\nAma şunu bil ki,\nHer saniye beni sana daha fazla bağlıyor.",
    "Baktığımız gökyüzü aynı,\nAynı Ay, aynı Güneş, aynı yıldızlar.\nAma sen başka yerde ben ise bambaşka.\nBen burda gökyüzüne bakarak seni düşünürken,\nSenin bulunduğun yer biraz daha güzelleşiyor.",
    "Bazen kapatıyorum gözlerimi,\nVe hayal ediyorum yanımda seni,\nSanki o an zaman yavaşlıyor gibi geliyor.\nVe ben biraz daha sakinleşiyorum.",
    "Belki uzaktayız,\nBelki farklı şehirlerdeyiz,\nAma kalplerimizin hep beraber olduğunu hissediyorum.\nVe bu his,\nbeni sana her seferinde biraz daha aşık ediyor.",
    "Gün içinde bir an,\nGeliyorsun aklıma.\nVe o an,\nKalbim, bana seni ne kadar sevdiğimi hatırlatıyor.",
    "Seni düşündüğümde, gölgeymişsin gibi hissediyorum.\nHep yanımdasın ama dokunamıyorum.\nAma bil ki, bu gölge,\nGördüğüm en parlak gölge.",
    "Seni düşünmek, artık bir alışkanlık haline geldi.\nFarkında olmadan yaptığım.\nVe bu alışkanlık,\nKalbimin en sessiz ve güzel bağımlılığı.",
    "Bazen içimde bir rüzgar esiyor,\nAdını taşıyan bir rüzgar.\nBen o rüzgarda seni hissediyorum,\nVe bu his içimdeki tüm fırtınaları hafif bir esintiye dönüştürüyor.",
    "Seni düşünmek bazen acıtıyor,\nAma bu acı bile tatlı geliyor.\nÇünkü bu acı,\nKalbimde sakladığım sevgiyi yeniden hatırlatıyor.",
    "Sana dair her şey, içimde bir iz bırakıyor.\nSilinmeyen bir iz.\nGülüşün, bakışın, sesin...\nHatta yokluğun bile.",
    "Sana söylemek istediğim çok şey var,\nAma en çok şunu bil;\nİçimdeki tüm o karanlıkta bile,\nSana ait bir parıltı var."
];

function createFlower() {
    // ✅ Sadece yazı kayboluyor
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
        });

        flower.appendChild(petal);
    }

    setTimeout(() => {
        blowBtn.classList.remove("hidden");
        blowBtn.classList.add("show");
    }, 2000);
}

center.addEventListener("click", createFlower);

blowBtn.addEventListener("click", () => {
    blowBtn.remove();

    const petals = document.querySelectorAll(".petal.final");
    petals.forEach(p => {
        const angle = Math.random() * 360;
        const distance = 200 + Math.random() * 200;

        p.style.transition = "transform 2s ease-out, opacity 2s";
        p.style.transform = `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px) rotate(${angle}deg)`;
    });

    // ✅ Üfle → merkez nokta yok olur
    center.style.transition = "opacity 1.5s ease, transform 1.5s ease";
    center.style.opacity = "0";
    center.style.transform = "translate(-50%, -50%) scale(0.3)";

    // ✅ Sap aşağı kayar
    const stem = document.querySelector(".stem");
    stem.style.transition = "transform 2s ease-in";
    stem.style.transform = "translateX(-50%) scaleY(1) translateY(400px)";
});

document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("petal")) return;

    navigator.vibrate(100);
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
        selected.style.transition = "opacity 1.5s, transform 1.5s cubic-bezier(.25,.46,.45,.94)";
        selected.style.opacity = "0";
        selected.style.transform += " scale(0.4)";

        showMessage(selected.dataset.message);
    }, 1500);
});

function showMessage(text) {
    const box = document.getElementById("messageBox");
    box.textContent = text;
    box.classList.add("show");
}
const tree = document.getElementById("tree");
const question = document.getElementById("question");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const letter = document.getElementById("letter");
const counter = document.getElementById("counter");

let fallingInterval;

// =====================
// CONTADOR
// =====================
function updateCounter(){
    const startDate = new Date("2024-07-05T00:00:00");
    const now = new Date();
    const diff = now - startDate;

    if(diff < 0){
        counter.textContent = "Aún no ha comenzado";
        return;
    }

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    counter.textContent = `${days} días ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCounter,1000);
updateCounter();


// =====================
// CREAR CORAZÓN
// =====================
function createHeart(){

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 1.75	- 120;

    const scale = 15;

    for(let t = 0; t < Math.PI * 2; t += 0.05){

        const x = 16 * Math.pow(Math.sin(t),3);
        const y = 
            13 * Math.cos(t)
            - 5 * Math.cos(2*t)
            - 2 * Math.cos(3*t)
            - Math.cos(4*t);

        const leaf = document.createElement("div");
        leaf.className = "leaf";

        const size = 8 + Math.random()*10;
        leaf.style.width = size + "px";
        leaf.style.height = size + "px";

        leaf.style.position = "absolute";

        leaf.style.left = centerX + x * scale + "px";
        leaf.style.top = centerY - y * scale + "px";

        // Colores rojizos variados
        const red = 200 + Math.random()*55;
        const green = Math.random()*80;
        const blue = Math.random()*80;

        leaf.style.background = `rgb(${red},${green},${blue})`;

        leaf.style.opacity = "0";
        leaf.style.transform = "rotate(-45deg) scale(0)";
        leaf.style.transition = "all 0.6s ease-out";

        document.body.appendChild(leaf);

        setTimeout(()=>{
            leaf.style.opacity = "1";
            leaf.style.transform = "rotate(-45deg) scale(1)";
        }, Math.random()*800);
    }

    startFallingLeaves();

    setTimeout(()=>{
        question.classList.remove("hidden");
    },3000);
}


// =====================
// HOJAS CAYENDO
// =====================
function startFallingLeaves(){

    fallingInterval = setInterval(()=>{

        const falling=document.createElement("div");
        falling.className="leaf";

        const size = 12 + Math.random()*15;

        falling.style.width=size+"px";
        falling.style.height=size+"px";

        const red = 200 + Math.random()*55;
        const green = Math.random()*80;
        const blue = Math.random()*80;

        falling.style.background=`rgb(${red},${green},${blue})`;

        falling.style.left=Math.random()*window.innerWidth+"px";
        falling.style.top="-20px";
        falling.style.position="fixed";

        document.body.appendChild(falling);

        falling.animate([
            { transform:"translateY(0px) rotate(0deg)" },
            { transform:`translateY(${window.innerHeight+50}px) rotate(360deg)` }
        ],{
            duration:3000 + Math.random()*3000,
            easing:"ease-in"
        });

        setTimeout(()=> falling.remove(),8000);

    },150);
}

function startFallingLeaves(){

    fallingInterval = setInterval(()=>{

        const falling=document.createElement("div");
        falling.className="leaf";

        const size = 6 + Math.random()*15;

        falling.style.width=size+"px";
        falling.style.height=size+"px";

        const red = 200 + Math.random()*55;
        const green = Math.random()*80;
        const blue = Math.random()*80;

        falling.style.background=`rgb(${red},${green},${blue})`;

        falling.style.left=Math.random()*window.innerWidth+"px";
        falling.style.top="-20px";
        falling.style.position="fixed";

        document.body.appendChild(falling);

        falling.animate([
            { transform:"translateY(0px) rotate(0deg)" },
            { transform:`translateY(${window.innerHeight+50}px) rotate(360deg)` }
        ],{
            duration:3000 + Math.random()*3000,
            easing:"ease-in"
        });

        setTimeout(()=> falling.remove(),8000);

    },150);
}

// =====================
// BOTÓN SÍ
// =====================
const loveSong = document.getElementById("loveSong");

yesBtn.addEventListener("click",()=>{

    question.style.display="none";
    letter.classList.remove("hidden");

    loveSong.currentTime = 0;
    loveSong.volume = 0.5;
    loveSong.play();
});

// =====================
// BOTÓN NO (no se sale)
// =====================
noBtn.addEventListener("mouseenter", () => {

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const safeMargin = 20;

    const maxX = window.innerWidth - btnWidth - safeMargin;
    const maxY = window.innerHeight - btnHeight - safeMargin;

    const newX = Math.max(safeMargin, Math.random() * maxX);
    const newY = Math.max(safeMargin, Math.random() * maxY);

    noBtn.style.position = "fixed";
    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";
});

// INICIAR
createHeart();


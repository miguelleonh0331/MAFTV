// NUMEROS viene inyectado desde PHP como objeto {0: {italiano, pronuncia}, ...}

const btnGenerar   = document.getElementById('btnGenerar');
const btnCalificar = document.getElementById('btnCalificar');
const contenedor   = document.getElementById('ejercicios');
const resultado    = document.getElementById('resultado');

let ejerciciosActuales = []; // [{numero, italiano, pronuncia}]

/* ──────────────────────────────────────── */
/*  Generar 10 números aleatorios únicos    */
/* ──────────────────────────────────────── */
function generarEjercicios() {
    const claves = Object.keys(NUMEROS);
    const seleccion = [];

    while (seleccion.length < 10) {
        const idx = claves[Math.floor(Math.random() * claves.length)];
        if (!seleccion.includes(idx)) seleccion.push(idx);
    }

    ejerciciosActuales = seleccion.map(k => ({
        numero:    parseInt(k),
        italiano:  NUMEROS[k].italiano,
        pronuncia: NUMEROS[k].pronuncia,
    }));

    renderEjercicios();
    resultado.classList.add('hidden');
    btnCalificar.disabled = false;
}

/* ──────────────────────────────────────── */
/*  Render de tarjetas                      */
/* ──────────────────────────────────────── */
function renderEjercicios() {
    contenedor.innerHTML = '';

    ejerciciosActuales.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.setProperty('--i', i);
        card.dataset.italiano = item.italiano.toLowerCase();

        card.innerHTML = `
            <div>
                <div class="num">${item.numero}</div>
            </div>
            <div class="input-wrap">
                <input
                    type="text"
                    placeholder="Escribe en italiano…"
                    autocomplete="off"
                    spellcheck="false"
                >
                <div class="respuesta-correcta">✎ ${item.italiano} <em style="color:#aaa">(${item.pronuncia})</em></div>
            </div>
            <div class="icono-estado"></div>
        `;

        contenedor.appendChild(card);
    });

    // Foco en el primero
    const primerInput = contenedor.querySelector('input');
    if (primerInput) primerInput.focus();
}

/* ──────────────────────────────────────── */
/*  Calificar respuestas                    */
/* ──────────────────────────────────────── */
function calificar() {
    const cards = contenedor.querySelectorAll('.card');
    let correctas = 0;

    cards.forEach(card => {
        const input    = card.querySelector('input');
        const icono    = card.querySelector('.icono-estado');
        const respuesta = input.value.trim().toLowerCase();
        const esperada  = card.dataset.italiano;

        input.disabled = true;
        card.classList.add('calificada');

        if (respuesta === esperada) {
            input.classList.add('correcto');
            icono.textContent = '✓';
            icono.style.color = '#1a6b3a';
            correctas++;
        } else {
            input.classList.add('incorrecto');
            icono.textContent = '✗';
            icono.style.color = '#b82c2c';
        }
    });

    mostrarResultado(correctas);
    btnCalificar.disabled = true;
}

/* ──────────────────────────────────────── */
/*  Mostrar puntaje final                   */
/* ──────────────────────────────────────── */
function mostrarResultado(correctas) {
    const pct = Math.round((correctas / 10) * 100);

    const mensajes = {
        100: "🏆 Perfetto! Sei un campione!",
        80:  "🌟 Molto bene! Quasi perfetto.",
        60:  "👍 Bene! Continua ad esercitarti.",
        40:  "📚 Dai, puoi farcela! Riprova.",
        0:   "💪 Non mollare, riprova ancora!",
    };

    const umbral = [100, 80, 60, 40, 0].find(u => pct >= u);

    resultado.classList.remove('hidden');
    resultado.innerHTML = `
        <div class="puntaje">${correctas}/10</div>
        <div class="mensaje">${mensajes[umbral]}</div>
    `;

    resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ──────────────────────────────────────── */
/*  Eventos                                 */
/* ──────────────────────────────────────── */
btnGenerar.addEventListener('click', generarEjercicios);
btnCalificar.addEventListener('click', calificar);

// Enter avanza al siguiente input
contenedor.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const inputs  = [...contenedor.querySelectorAll('input:not(:disabled)')];
    const actual  = document.activeElement;
    const idx     = inputs.indexOf(actual);
    if (idx !== -1 && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
    } else if (idx === inputs.length - 1) {
        calificar();
    }
});

const categories = [
  'Nombre de niña', 'Nombre de varón', 'Nombre de mascota', 'Comida', 'Fruta', 'Verdura', 'Golosina', 'Helado', 'Bebida', 'Postre',
  'Algo que se come con cuchara', 'Algo que se come con la mano', 'Algo rico', 'Animal', 'Animal de granja', 'Animal salvaje', 'Animal que vuela', 'Animal que vive en el agua', 'Animal de cuatro patas', 'Animal pequeño',
  'Animal grande', 'Animal que da miedo', 'Animal que te gustaría tener', 'Juguete', 'Cosa de la escuela', 'Cosa de la casa', 'Cosa de la cocina', 'Cosa del baño', 'Prenda de ropa', 'Algo que llevás en una mochila',
  'Algo que encontrás en una plaza', 'Algo que hay en un dormitorio', 'Algo que usás todos los días', 'Personaje de dibujitos', 'Superhéroe o superheroína', 'Princesa', 'Personaje de película', 'Personaje de Disney', 'Personaje de anime', 'Villano',
  'Personaje que te da risa', 'Personaje que te gustaría conocer', 'Personaje que te gustaría ser', 'País', 'Ciudad', 'Lugar de vacaciones', 'Lugar de la casa', 'Lugar donde jugar', 'Lugar donde hace frío', 'Lugar donde hace calor',
  'Lugar donde te gustaría viajar', 'Lugar donde hay muchos animales', 'Lugar donde hay agua', 'Deporte', 'Juego', 'Juego de mesa', 'Algo que sirve para jugar', 'Algo que te gusta', 'Algo que no te gusta', 'Algo que te hace reír',
  'Algo que te da miedo', 'Algo que te pone feliz', 'Algo que te gustaría tener', 'Algo que te gustaría aprender', 'Algo que te gustaría hacer', 'Algo que te gustaría comer', 'Algo que te gustaría regalar', 'Algo que hacés cuando estás aburrido', 'Algo que hacés antes de dormir', 'Algo que llevás de vacaciones',
  'Algo que hay en una fiesta', 'Algo que hace ruido', 'Algo que tiene ruedas', 'Color', 'Algo de la naturaleza', 'Algo de la escuela', 'Algo de la casa', 'Algo de un viaje', 'Algo de la playa', 'Algo del campo',
  'Algo del parque', 'Objeto redondo', 'Objeto cuadrado', 'Algo suave', 'Algo duro', 'Algo frío', 'Algo caliente', 'Algo que brilla', 'Algo que huele bien', 'Algo que huele mal',
  'Algo que se puede abrir', 'Algo que se puede cerrar', 'Algo que se puede romper', 'Algo que se puede coleccionar', 'Algo que encontrás en la calle', 'Algo que hay en una tienda', 'Algo que llevás en el bolsillo', 'Algo que te ponés en la cabeza', 'Algo que tiene botones', 'Algo que se usa en invierno'
];

const app = document.querySelector('#app');
let deck = [];
let current = null;
let isDrawing = false;

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function resetGame() {
  deck = shuffle(categories);
  current = null;
  render();
}

function drawCard() {
  if (isDrawing || deck.length === 0) return;
  isDrawing = true;
  const card = document.querySelector('.card');
  card?.classList.remove('card-pop');
  window.setTimeout(() => {
    current = deck.pop();
    isDrawing = false;
    render();
  }, 180);
}

function render() {
  const available = deck.length;
  const used = categories.length - available;
  const progress = Math.round((used / categories.length) * 100);
  const isFinished = available === 0 && current !== null;

  app.innerHTML = `
    <div class="page-shell">
      <header class="topbar">
        <a class="brand" href="/" aria-label="Basta Familiar, inicio">
          <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
          <span>Basta Familiar</span>
        </a>
        <div class="top-actions">
          <button class="icon-button" type="button" data-action="help" aria-label="Cómo jugar">?</button>
          <button class="restart-button" type="button" data-action="reset"><span aria-hidden="true">↻</span> Nueva partida</button>
        </div>
      </header>

      <main class="main-content">
        <section class="intro" aria-labelledby="page-title">
          <p class="eyebrow">Juego de palabras para compartir</p>
          <h1 id="page-title">Una categoría.<br /><em>Mil respuestas.</em></h1>
          <p class="lead">Sacá una tarjeta, pensá rápido y dejá que empiece la ronda.</p>
        </section>

        <section class="game-card" aria-live="polite">
          <div class="card-topline">
            <span class="round-label">${isFinished ? 'Partida completa' : current ? 'Categoría actual' : 'Tu turno comienza aquí'}</span>
            <span class="remaining-label">${available} ${available === 1 ? 'disponible' : 'disponibles'}</span>
          </div>
          <div class="card-body ${current ? 'has-category' : ''} ${isFinished ? 'is-finished' : ''}">
            <div class="card-stamp" aria-hidden="true">${isFinished ? '✓' : current ? '01' : '00'}</div>
            <p class="card-kicker">${isFinished ? '¡Ronda terminada!' : current ? 'Respondan todos' : '¿Listos?'}</p>
            <h2>${isFinished ? 'Salieron las 100 tarjetas.' : current || 'Sacá una tarjeta'}</h2>
            <p class="card-hint">${isFinished ? 'Volvé a mezclar para jugar otra vez.' : current ? 'Cuando todos respondan, saquen la siguiente.' : 'La primera respuesta puede ser la más divertida.'}</p>
          </div>
          <div class="card-footer">
            <div class="progress-wrap" aria-label="${progress}% de tarjetas utilizadas">
              <div class="progress-meta"><span>Progreso de la partida</span><strong>${used} / ${categories.length}</strong></div>
              <div class="progress-track"><span style="width: ${progress}%"></span></div>
            </div>
            <button class="draw-button" type="button" data-action="${isFinished ? 'reset' : 'draw'}">
              <span>${isFinished ? 'Empezar de nuevo' : current ? 'Siguiente tarjeta' : 'Sacar tarjeta'}</span>
              <b aria-hidden="true">→</b>
            </button>
          </div>
        </section>

        <section class="tips" aria-label="Consejos de juego">
          <div class="tip"><span class="tip-number">01</span><div><h3>Piensen juntos</h3><p>No hay respuestas correctas o incorrectas. La idea es pasarla bien.</p></div></div>
          <div class="tip"><span class="tip-number">02</span><div><h3>Sin repetir</h3><p>Cada tarjeta aparece una sola vez por partida.</p></div></div>
          <div class="tip"><span class="tip-number">03</span><div><h3>Para todas las edades</h3><p>Categorías simples, familiares y algunas para reírse.</p></div></div>
        </section>
      </main>
      <footer class="footer"><span>Basta Familiar</span><span>100 categorías para jugar sin pantallas complicadas.</span></footer>
    </div>
    <div class="modal-backdrop" data-action="close-help" hidden>
      <section class="help-modal" role="dialog" aria-modal="true" aria-labelledby="help-title">
        <button class="modal-close" type="button" data-action="close-help" aria-label="Cerrar">×</button>
        <p class="eyebrow">Cómo jugar</p>
        <h2 id="help-title">Una ronda en tres pasos.</h2>
        <ol><li>Toquen <strong>Sacar tarjeta</strong>.</li><li>Todos piensan una respuesta para la categoría.</li><li>Cuando terminen, pasen a la siguiente.</li></ol>
        <p class="modal-note">Las tarjetas no se repiten hasta que termina la partida. Pueden jugar con o sin una letra.</p>
      </section>
    </div>
  `;

  document.querySelectorAll('[data-action="draw"]').forEach((button) => button.addEventListener('click', drawCard));
  document.querySelectorAll('[data-action="reset"]').forEach((button) => button.addEventListener('click', resetGame));
  document.querySelector('[data-action="help"]')?.addEventListener('click', () => {
    const modal = document.querySelector('.modal-backdrop');
    if (modal) modal.hidden = false;
  });
  document.querySelectorAll('[data-action="close-help"]').forEach((button) => button.addEventListener('click', (event) => {
    if (event.target === event.currentTarget || event.currentTarget.classList.contains('modal-close')) {
      const modal = document.querySelector('.modal-backdrop');
      if (modal) modal.hidden = true;
    }
  }));
}

resetGame();
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));

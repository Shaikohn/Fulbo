/**
 * Interacciones básicas del layout:
 * - Fullscreen: intenta expandir #unity-container a pantalla completa
 * - Play: oculta el botón como placeholder de inicio
 *
 * Notas para integración:
 * - El build WebGL de Unity debe renderizarse dentro de #unity-content
 * - Ejemplo: document.getElementById('unity-content')
 * - Desde acá se puede enganchar la inicialización del loader de Unity
 */

document.addEventListener('DOMContentLoaded', () => {
  const fullscreenBtn = document.querySelector('.fullscreen-btn');
  const unityContainer = document.getElementById('unity-container');
  const playBtn = document.querySelector('.play-btn');

/* ========================= FULLSCREEN ========================= */
  if (fullscreenBtn && unityContainer) {
    fullscreenBtn.addEventListener('click', async () => {
      try {
        const element = unityContainer;

        if (!document.fullscreenElement) {
          if (element.requestFullscreen) {
            await element.requestFullscreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(); // Safari
          }
        } else {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen(); // Safari
          }
        }
      } catch (err) {
        console.error('Fullscreen error:', err);
      }
    });
  }

/* ========================= PLAY (PLACEHOLDER) ========================= */
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      /* Se oculta el boton de play como placeholder de inicio
      playBtn.classList.add('hidden');
      /* Aca se puede integrar la inicialización del loader de Unity. */
      document.dispatchEvent(new Event('unity:start'));
    });
  }
});
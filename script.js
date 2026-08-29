// Google Play – Google Photos Page Scripts

document.addEventListener('DOMContentLoaded', () => {

  // === INSTALL BUTTON ===
  const installBtn = document.getElementById('installBtn');
  let downloading = false;
  if (installBtn) {
    installBtn.addEventListener('click', (e) => {
      // If already downloaded and showing "Открыть", let standard link click happen and show toast
      if (installBtn.classList.contains('downloaded')) {
        showToast('✅ Файл скачан\n📁 Откройте «Загрузки», чтобы найти APK');
        return;
      }
      
      if (downloading) return;
      downloading = true;
      
      // DO NOT call e.preventDefault() here so the native browser download starts immediately
      
      let progress = 0;
      installBtn.style.pointerEvents = 'none'; // disable clicks during progress
      installBtn.innerHTML = 'Скачивание... 0%';

      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Create the semi-transparent message block with Google Material SVGs
          const msgBlock = document.createElement('div');
          msgBlock.className = 'download-msg-block';
          msgBlock.style.display = 'flex';
          msgBlock.style.flexDirection = 'column';
          msgBlock.style.gap = '8px';
          msgBlock.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; color: #01875f; font-weight: 600;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              <span>Файл скачан</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; color: var(--text2); font-size: 13px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
              <span>Откройте «Загрузки», чтобы установить</span>
            </div>
          `;
          
          // Replace the button in the DOM
          installBtn.parentNode.replaceChild(msgBlock, installBtn);
          
          showToast('✓ Файл скачан\n⬇ Откройте «Загрузки», чтобы установить');
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

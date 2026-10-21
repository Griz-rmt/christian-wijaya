/* ============================================================
   Christian Wijaya — script.js
   ============================================================ */

// ── Hamburger menu ──────────────────────────────────────────
const garis3 = document.querySelector('.garis3');
const menu = document.querySelector('.menu');

if (garis3 && menu) {
  garis3.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active');
    garis3.classList.toggle('active', isOpen);
    garis3.setAttribute('aria-expanded', isOpen);
  });

  // Tutup menu saat link diklik (mobile)
  menu.querySelectorAll('.link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      garis3.classList.remove('active');
      garis3.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Header scroll reveal ─────────────────────────────────────
const header = document.querySelector('header#header');

if (header) {
  const tulisan = document.querySelector('.tulisan');

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('show');
      tulisan && tulisan.classList.add('hide');
    } else {
      header.classList.remove('show');
      tulisan && tulisan.classList.remove('hide');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
}

// ── Scroll-to-top button ─────────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Toast notification ───────────────────────────────────────
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ── Gallery scroll ───────────────────────────────────────────
const galeri = document.getElementById('galeri');
const SCROLL_AMOUNT = 240;

function ScrollKiri() {
  if (galeri) galeri.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
}

function ScrollKanan() {
  if (galeri) galeri.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
}

// ── Quantity +/- ─────────────────────────────────────────────
function tambahValue(delta) {
  const input = document.getElementById('quantity');
  if (!input) return;
  const next = parseInt(input.value, 10) + delta;
  if (next >= parseInt(input.min, 10) && next <= parseInt(input.max, 10)) {
    input.value = next;
  }
}

// ── Produk form: keranjang & beli sekarang ───────────────────
const productForm = document.getElementById('productForm');

if (productForm) {
  const sizeSelect = document.getElementById('size');

  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (sizeSelect && sizeSelect.value === '') {
      showToast('Silakan pilih ukuran terlebih dahulu.');
      sizeSelect.focus();
      return;
    }
    showToast('Produk berhasil ditambahkan ke keranjang! 🛍');
  });
}

function beliSekarang() {
  const sizeSelect = document.getElementById('size');
  if (sizeSelect && sizeSelect.value === '') {
    showToast('Silakan pilih ukuran terlebih dahulu.');
    sizeSelect.focus();
    return;
  }
  showToast('Mengarahkan ke halaman pembayaran...');
}

// ── Model recruitment form ────────────────────────────────────
const modelForm = document.getElementById('modelForm');

if (modelForm) {
  modelForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset semua error
    ['namaError', 'emailError', 'tanggalError', 'genderError', 'termsError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    const resultEl = document.getElementById('result');
    if (resultEl) resultEl.textContent = '';

    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const genderChecked = document.querySelector('input[name="gender"]:checked');
    const termsChecked = document.getElementById('terms').checked;

    let valid = true;

    // Validasi nama
    if (nama.length < 3) {
      document.getElementById('namaError').textContent = 'Nama harus minimal 3 karakter.';
      valid = false;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Format email tidak valid.';
      valid = false;
    }

    // Validasi tanggal lahir
    if (!tanggalLahir) {
      document.getElementById('tanggalError').textContent = 'Tanggal lahir harus diisi.';
      valid = false;
    } else {
      const birthDate = new Date(tanggalLahir);
      const today = new Date();
      let umur = today.getFullYear() - birthDate.getFullYear();
      const bulanDiff = today.getMonth() - birthDate.getMonth();
      if (bulanDiff < 0 || (bulanDiff === 0 && today.getDate() < birthDate.getDate())) {
        umur--;
      }
      if (birthDate > today) {
        document.getElementById('tanggalError').textContent = 'Tanggal lahir tidak valid.';
        valid = false;
      } else if (umur < 17) {
        document.getElementById('tanggalError').textContent = 'Usia minimal 17 tahun.';
        valid = false;
      }
    }

    // Validasi gender
    if (!genderChecked) {
      document.getElementById('genderError').textContent = 'Pilih jenis kelamin.';
      valid = false;
    }

    // Validasi terms
    if (!termsChecked) {
      document.getElementById('termsError').textContent = 'Anda harus menyetujui syarat dan ketentuan.';
      valid = false;
    }

    if (valid) {
      if (resultEl) {
        resultEl.textContent = '✓ Pendaftaran berhasil! Kami akan menghubungi kamu segera.';
      }
      modelForm.reset();
      showToast('Pendaftaran berhasil dikirim! 🎉');
    }
  });
}

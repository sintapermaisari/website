document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf("/") + 1);
  
  
    
  
    // ====================
    // Halaman DAFTAR
    // ====================
    const formDaftar = document.getElementById("form-daftar");
    if (formDaftar) {
      formDaftar.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const nama = formDaftar.elements["nama"].value;
        const email = formDaftar.elements["email"].value;
        const username = formDaftar.elements["username"].value;
        const password = formDaftar.elements["password"].value;
  
        localStorage.setItem("userNama", nama);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userUsername", username);
        localStorage.setItem("userPassword", password);
  
        alert("Pendaftaran berhasil!");
        window.location.href = "login.html";
      });
    }
  
    // ====================
    // Halaman LOGIN
    // ====================
    const formLogin = document.getElementById("form-login");
    if (formLogin) {
      formLogin.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const email = formLogin.elements["email"].value;
        const password = formLogin.elements["password"].value;
  
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");
  
        if (!storedEmail || !storedPassword) {
          alert("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
          window.location.href = "daftar.html";
          return;
        }
  
        if (email === storedEmail && password === storedPassword) {
          localStorage.setItem("isLoggedIn", "true");
          alert("Login berhasil!");
          window.location.href = "home.html";
        } else {
          alert("Email atau password salah!");
        }
      });
    }
  
    // ====================
    // Halaman AKUN
    // ====================
    if (currentPage === "akun.html") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn !== "true") {
        alert("Silakan login terlebih dahulu.");
        window.location.href = "login.html";
        return;
      }
  
      const nama = localStorage.getItem("userNama");
      const email = localStorage.getItem("userEmail");
  
      const namaContainer = document.getElementById("nama-user");
      const emailContainer = document.getElementById("email-user");
  
      if (namaContainer) {
        namaContainer.textContent = `Nama: ${nama || '-'}`;
      }
      if (emailContainer) {
        emailContainer.textContent = `Email: ${email || '-'}`;
      }
  
      const logoutBtn = document.getElementById("logout");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
          localStorage.removeItem("isLoggedIn"); // hanya hapus status login
          window.location.href = "daftar.html";   // arahkan ke halaman login
        });
      }
    }
  
  });
   
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      window.scrollTo({
        top: targetElement.offsetTop - 100, 
        behavior: 'smooth'
      });
    });
  });
  
  document.querySelectorAll('.button-container button').forEach(button => {
    button.addEventListener('click', function () {
      const targetSelector = this.getAttribute('data-target');
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    let favorit = JSON.parse(localStorage.getItem("favoritProduk")) || [];
  
    // Cek setiap produk di halaman utama
    document.querySelectorAll(".kartu-produk-kecil").forEach(kartu => {
      const nama = kartu.querySelector(".nama-kecil").innerText;
      const heartIcon = kartu.querySelector(".heart i");
  
      const isFavorit = favorit.some(p => p.nama === nama);
      if (isFavorit) {
        heartIcon.classList.add("checked");
      } else {
        heartIcon.classList.remove("checked");
      }
    });
  
    // Untuk halaman fav.html
    const container = document.getElementById("produk-favorit");
    if (container) {
      if (favorit.length === 0) {
        container.innerText = "Belum ada produk favorit.";
        return;
      }
  
      favorit.forEach(produk => {
        const produkHTML = document.createElement("div");
        produkHTML.className = "kartu-produk-kecil";
        produkHTML.innerHTML = `
          <img src="${produk.img}" class="gambar-kecil" alt="${produk.nama}">
          <div class="nama-kecil">${produk.nama}</div>
          <div class="harga-kecil">${produk.harga}</div>
          <div class="star">
            <i class="bx bxs-star checked"></i>
            <i class="bx bxs-star checked"></i>
            <i class="bx bxs-star checked"></i>
            <i class="bx bxs-star checked"></i>
            <i class="bx bxs-star"></i>
          </div>
          <div class="btn-mini-container">
            <button class="btn-mini favorit-btn">
              <div class="heart">
                <i class="bx bxs-heart checked"></i>
              </div>
              Hapus Favorit
            </button>
            <button class="btn-mini" onclick="tambahKeranjang(this)">Tambah Keranjang</button>
          </div>
        `;
  
        produkHTML.querySelector(".favorit-btn").addEventListener("click", function () {
          hapusFavorit(produk.nama, produkHTML);
        });
  
        container.appendChild(produkHTML);
      });
    }
  });
  
  // Fungsi tambah/hapus favorit
  // =====================
  // Menambahkan Produk ke Favorit
  // =====================
  function tambahKeFavorit(button) {
    const heartIcon = button.querySelector(".heart i");
    const kartu = button.closest(".kartu-produk-kecil");
  
    const produk = {
      img: kartu.querySelector("img").getAttribute("src"),
      nama: kartu.querySelector(".nama-kecil").innerText,
      harga: kartu.querySelector(".harga-kecil").innerText
    };
  
    let favorit = JSON.parse(localStorage.getItem("favoritProduk")) || [];
    const index = favorit.findIndex(p => p.nama === produk.nama);
  
    if (index === -1) {
      favorit.push(produk);
      heartIcon.classList.add("checked");
    } else {
      favorit.splice(index, 1);
      heartIcon.classList.remove("checked");
    }
  
    localStorage.setItem("favoritProduk", JSON.stringify(favorit));
  }
  
  // =====================
  // Menghapus Produk dari Favorit (di halaman fav.html)
  // =====================
  function hapusFavorit(namaProduk, elemenProduk) {
    let favorit = JSON.parse(localStorage.getItem("favoritProduk")) || [];
    favorit = favorit.filter(p => p.nama !== namaProduk);
    localStorage.setItem("favoritProduk", JSON.stringify(favorit));
  
    const heartIcon = elemenProduk.querySelector(".heart i");
    heartIcon.classList.remove("checked");
    elemenProduk.remove();
  
    if (favorit.length === 0) {
      document.getElementById("produk-favorit").innerText = "Belum ada produk favorit.";
    }
  }
  
  // =====================
  // Menambahkan Produk ke Keranjang
  // =====================
  function tambahKeranjang(el) {
    const card = el.closest('.kartu-produk-kecil');
    const nama = card.querySelector('.nama-kecil').innerText;
    const harga = parseInt(card.querySelector('.harga-kecil').innerText.replace(/[^\d]/g, ''));
    const gambar = card.querySelector('img').src;
  
    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    const sudahAda = keranjang.find(item => item.nama === nama);
  
    if (sudahAda) {
      alert('Produk sudah ada di keranjang!');
      return;
    }
  
    keranjang.push({ nama, harga, gambar, jumlah: 1 });
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
  
    tampilkanNotif();
    renderKeranjang();
  }
  
  // =====================
  // Tampilkan Daftar Keranjang (Halaman Keranjang)
  // =====================
  function renderKeranjang() {
    const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    const container = document.getElementById('daftar-keranjang');
  
    if (!container) return; // Kalau halaman tidak punya daftar-keranjang, abaikan
  
    container.innerHTML = '';
  
    if (keranjang.length === 0) {
      container.innerHTML = '<p style="color: red;">Masukkan produk ke keranjang terlebih dahulu!</p>';
      if (document.getElementById('total')) {
        document.getElementById('total').innerText = 'Total: Rp 0';
      }
      return;
    }
  
    let total = 0;
  
    keranjang.forEach((item, index) => {
      const subtotal = item.harga * item.jumlah;
      total += subtotal;
  
      const div = document.createElement('div');
      div.className = 'keranjang-item';
      div.innerHTML = `
        <img src="${item.gambar}" />
        <div class="info">
          <div>${item.nama}</div>
          <div>Rp ${item.harga.toLocaleString('id-ID')}</div>
        </div>
        <div class="jumlah">
          <button onclick="ubahJumlah(${index}, -1)">-</button>
          <span style="margin: 0 10px">${item.jumlah}</span>
          <button onclick="ubahJumlah(${index}, 1)">+</button>
        </div>
        <div>Rp ${subtotal.toLocaleString('id-ID')}</div>
        <div class="hapus-btn" onclick="hapusItem(${index})">
          <i class="fas fa-trash-alt"></i>
        </div>
      `;
      container.appendChild(div);
    });
  
    if (document.getElementById('total')) {
      document.getElementById('total').innerText = 'Total: Rp ' + (total + 10000).toLocaleString('id-ID');
    }
  }
  
  // =====================
  // Render Tabel Keranjang (Halaman Invoice)
  // =====================
  function renderTabelKeranjang() {
    const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    const tbody = document.getElementById('keranjang-tabel');
    if (!tbody) return; // Kalau halaman tidak ada tabel, abaikan
  
    tbody.innerHTML = '';
  
    let subTotal = 0;
    keranjang.forEach(item => {
      const totalItem = item.harga * item.jumlah;
      subTotal += totalItem;
  
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.nama}</td>
        <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
        <td>${item.jumlah}</td>
        <td>Rp ${totalItem.toLocaleString('id-ID')}</td>
      `;
      tbody.appendChild(row);
    });
  
    if (document.getElementById('sub-total')) {
      document.getElementById('sub-total').innerText = subTotal.toLocaleString('id-ID');
    }
    if (document.getElementById('total-bayar')) {
      document.getElementById('total-bayar').innerText = (subTotal + 10000).toLocaleString('id-ID');
    }
  }
  
  // =====================
  // Ubah Jumlah Produk
  // =====================
  function ubahJumlah(index, delta) {
    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    keranjang[index].jumlah += delta;
    if (keranjang[index].jumlah < 1) keranjang[index].jumlah = 1;
  
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    renderKeranjang();
  }
  
  // =====================
  // Hapus Item dari Keranjang
  // =====================
  function hapusItem(index) {
    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    keranjang.splice(index, 1);
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    renderKeranjang();
  }
  
  // =====================
  // Tampilkan Notifikasi
  // =====================
  function tampilkanNotif() {
    let notif = document.getElementById('notif');
    if (!notif) {
      notif = document.createElement('div');
      notif.id = 'notif';
      notif.style.position = 'fixed';
      notif.style.bottom = '20px';
      notif.style.left = '50%';
      notif.style.transform = 'translateX(-50%)';
      notif.style.backgroundColor = '#3B3030';
      notif.style.color = 'white';
      notif.style.padding = '10px 20px';
      notif.style.borderRadius = '8px';
      notif.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
      notif.style.zIndex = '999';
      notif.style.display = 'none';
      document.body.appendChild(notif);
    }
  
    notif.innerHTML = 'Produk berhasil ditambahkan ke keranjang. <a href="keranjang.html" class="link-keranjang" style="color: white;">Cek di sini</a>';
    notif.style.display = 'block';
  
    setTimeout(() => {
      notif.style.display = 'none';
    }, 7000);
  }
  
  // =====================
  // Cek Keranjang sebelum ke Invoice
  // =====================
  function cekKeranjang() {
    const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    if (keranjang.length === 0) {
      alert("Masukkan produk ke keranjang terlebih dahulu.");
    } else {
      window.location.href = 'invoice.html';
    }
  }
  
  // =====================
  // Simpan Data Nama & Alamat
  // =====================
  function simpanData() {
    const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  
    if (keranjang.length === 0) {
      alert("Masukkan produk ke keranjang terlebih dahulu!");
      return;
    }
  
    const nama = document.getElementById("input-nama").value;
    const alamat = document.getElementById("input-alamat").value;
  
    if (!nama || !alamat) {
      alert("Nama dan alamat harus diisi!");
      return;
    }
  
    localStorage.setItem("userNama", nama);
    localStorage.setItem("userAlamat", alamat);
  
    window.location.href = "invoice.html";
  }
  
  // =====================
  // Selesai Belanja (Reset ke Keranjang)
  // =====================
  function selesaiHandler() {
    // Hapus keranjang dari localStorage
    localStorage.removeItem('keranjang');
  
    // Arahkan ke keranjang.html
    window.location.href = "home.html#produk";
  }
  function selesaiHandler1() {
  
    // Arahkan ke keranjang.html
    window.location.href = "invoice.html";
  }
  
  // =====================
  // On Page Load
  // =====================
  window.onload = function() {
    tampilkanUserInfo();
    renderTabelKeranjang();
    renderKeranjang();
  };
  
  // =====================
  // Menampilkan Informasi Pengguna
  // =====================
  function tampilkanUserInfo() {
    const nama = localStorage.getItem("userNama") || "-";
    const email = localStorage.getItem("userEmail") || "-";
    const tanggal = new Date().toLocaleDateString("id-ID");
  
    const namaPenerima = localStorage.getItem("userNama") || "-";
    const alamatPenerima = localStorage.getItem("userAlamat") || "-";
  
    if (document.getElementById("nama")) document.getElementById("nama").innerText = nama;
    if (document.getElementById("email")) document.getElementById("email").innerText = email;
    if (document.getElementById("tanggal")) document.getElementById("tanggal").innerText = tanggal;
  
    if (document.getElementById("nama-penerima")) document.getElementById("nama-penerima").innerText = namaPenerima;
    if (document.getElementById("alamat-penerima")) document.getElementById("alamat-penerima").innerText = alamatPenerima;
  }
  
  // =====================
  // Send To WhatsApp
  // =====================
  
  window.onload = function() {
    // Fungsi untuk menampilkan informasi pengguna
    tampilkanUserInfo();
  
    // Fungsi untuk merender tabel keranjang dan keranjang
    renderTabelKeranjang();
    renderKeranjang();
  
    // Menghapus kolom inputan
    document.getElementById('usr').value = ""; // Menghapus kolom nama
    document.getElementById('eml').value = ""; // Menghapus kolom email
    document.getElementById('phn').value = ""; // Menghapus kolom handphone
    document.getElementById('comment').value = ""; // Menghapus kolom pesan
  };
  
  
  function sendToWhatsApp() {
    var nama = document.getElementById('usr').value;
    var email = document.getElementById('eml').value;
    var handphone = document.getElementById('phn').value;
    var pesan = document.getElementById('comment').value;
  
    if (pesan.trim() === "") {
      alert("Harap tulis pesan terlebih dahulu.");
      return; // Jangan lanjutkan jika pesan kosong
    }
  
    var message = `Nama: ${nama}%0AEmail: ${email}%0AHandphone: ${handphone}%0APesan: ${pesan}`;
    
    var whatsappURL = `https://wa.me/6285608677363?text=${message}`;
  
    window.location.href = whatsappURL; // Arahkan ke URL WhatsApp
  }
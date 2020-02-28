const loginForm = document.querySelector('#login-form'); // FORMULIR LOGIN
const logout = document.querySelectorAll('#logout'); // FORMULIR LOGOUT
const formulir = document.querySelector('#daftar-produk'); // FORMULIR DAFTAR PRODUK
let daftarHarga = document.querySelector('#daftar-harga');
let biaya6bln = 6; // Biaya Subsidi Cicilan 6 Bulan Promo lokal
let bunga69 = 2.29; // BUNGA TENOR 9 BULAN 
let bunga1224 = 2.69; // BUNGA TENOR 12, 15, 18 & 24 BULAN
let bungadrone = 3.29; // BUNGA TENOR 12, 15, 18 & 24 BULAN
let b69drone = 2.69;
// Untuk memunculkan navbar samping dari MaterializeCSS
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
// Untuk desain pilihan kategori dari MaterializeCSS
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});
// Untuk memunculkan pop up atau modal dari MaterializeCSS
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});
// Produk yang dapat di collapsible dari MaterializeCSS
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});




// STATUS LOGIN 
auth.onAuthStateChanged(user => {
  let login = document.querySelectorAll('.li-login');
  let logout = document.querySelectorAll('.li-logout');
  let daftar = document.querySelectorAll('.li-daftar-produk');
  let menuedit = document.querySelectorAll('.li-edit-produk');
  let editbunga = document.querySelectorAll('.li-edit-bunga');
  let edb;
  let menu;
  let x; //logout
  let y; //daftar
  let z; //login
  let edit = document.querySelectorAll('.edit');
  let edd;

  if (user) {
    for (edd = 0; edd < edit.length; edd++) {
      edit[edd].style.display = "block"
    }
    for (menu = 0; menu < menuedit.length; menu++) {
      menuedit[menu].style.display = "block";
    }
    for (x = 0; x < logout.length; x++) {
      logout[x].style.display = "block";
    }
    for (y = 0; y < daftar.length; y++) {
      daftar[y].style.display = "block";
    }
    for (z = 0; z < login.length; z++) {
      login[z].style.display = "none";
    }

    console.log('You are log in as', user.email);
  } else {
    console.log('You are log out');
    for (z = 0; z < login.length; z++) {
      login[z].style.display = "block";
    }
    for (x = 0; x < logout.length; x++) {
      logout[x].style.display = "none";
    }
    for (y = 0; y < daftar.length; y++) {
      daftar[y].style.display = "none";
    }
    for (edd = 0; edd < edit.length; edd++) {
      edit[edd].style.display = "none";
    }

  }
})



// LOGIN MENGGUNAKAN EMAIL DAN PASSWORD

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const loginEmail = loginForm['email-login'].value;
  const loginPassword = loginForm['password-login'].value;

  auth.signInWithEmailAndPassword(loginEmail, loginPassword).then(cred => {
    const modal = document.querySelector('#login-modal');
    M.Modal.getInstance(modal).close();
    loginForm.reset();

  }).catch(function (error) {
    var errorcode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
});
// LOGIN MENGGUNAKAN EMAIL DAN PASSWORD


//LOG OUT
let out;
for (out = 0; out < logout.length; out++) {
  logout[out].addEventListener('click', (e) => {
    let konfirmasi = confirm('Anda Yakin Mau Signout?');
    if (konfirmasi) {
      auth.signOut().then(function () {
        window.location.reload(true);
      });
    }
    e.preventDefault();
  });
}
//LOG OUT

// MENU KLIK EDIT PRODUK (BUKAN TOMBOL DI PRODUK) MEMANGGIL EDIT UNTUK AKTIF
const editProduk = document.querySelectorAll('.li-edit-produk');
let xx;
for (xx = 0; xx < editProduk.length; xx++) {
  editProduk[xx].addEventListener('click', function () {
    let hapus = document.querySelectorAll('.delete');
    let del;
    let edit = document.querySelectorAll('.edit');
    let ed;
    for (del = 0; del < hapus.length; del++) {
      hapus[del].className = "btn-small enable delete";
    }
    for (ed = 0; ed < edit.length; ed++) {
      edit[ed].className = "btn-small enable edit modal-trigger";
      edit[ed].style.display = "block";
    }
  });
}
// MENU KLIK EDIT PRODUK (BUKAN TOMBOL DI PRODUK) ENDING




//DAFTARIN PRODUK KE DATABASE
formulir.addEventListener('submit', (e) => {
  e.preventDefault();
  let kategori = document.querySelector('#pilih-kategori');
  let pilihan = kategori.options[kategori.selectedIndex].value;
  if (pilihan === '#') {
    alert("Kategori Wajib Diisi")
  } else {
    db.collection(pilihan).add({
      nama: formulir['nama-produk'].value,
      harga: formulir['harga-produk'].value,
      cashback: formulir['cashback'].value,
      garansi: formulir['garansi'].value,
      free: formulir['free-bonus'].value,
      periode: formulir['periode-promo'].value,
      keterangan: formulir['keterangan'].value,
      spesifikasi: formulir['spesifikasi'].value,
      isibox: formulir['isibox'].value
    }).then(() => {
      const modal = document.querySelector('#daftar-produk-modal');
      alert('Pendaftaran Produk Berhasil');
      loginForm.reset();
      M.Modal.getInstance(modal).close();

    });
  }
});


const elementul = document.querySelector('#daftar-harga');
// RENDER KAMERA DARI DATA BASE START
function renderKamera(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Kamera'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
       <div class="collapsible-header">
          <span class="left col s12">${doc.data().nama}</span>
       </div>
       <div class="center-align collapsible-body">
            <div class="konten1${doc.id}"></div> <!-- INFO HARGA HCI TIDAK BISA DICOPAS -->
            <div id="cicilan${doc.id}">
              <div class="konten3${doc.id}"></div> <!-- INFO CICILAN HOMECREDIT YANG BISA DI COPAS -->
              <div class="konten4${doc.id}"></div> <!-- INFO FREEAN BONUS GABUNG CICILAN -->
            </div>
            <br>
            <a id="copycicilan${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Angsuran</a>
            <div class="garis"></div>
            <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
            <br>
            <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
            <a  class=" btn-small disabled delete" href="#" >Delete</a>
            <br>
            <br>

            <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
            <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
            <!-- Modal Structure -->
            <div id="modal1${doc.id}" class="modal">
              <div class="modal-content">
                <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
              </div>
              <div class="modal-footer">
                <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
              </div>
            </div>
            
            <!-- Modal Structure -->
            <div id="modal2${doc.id}" class="modal">
            <div class="modal-content">
              <div class="isibox${doc.id}">${newIsibox}</div>
            </div>
            <div class="modal-footer">
              <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
            </div>
          </div>
         
       `;



  la.innerHTML = `
       <div class="modal" id="updatemodal${doc.id}">
          <form id="${doc.id}form">
           <label for="update-nama-produk">Nama Kamera</label>
           <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
           <br>
           <label for="update-harga-produk">Masukkan Harga</label>
           <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
           <br>
           <label for="update-cashback">Cashback</label>
           <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
           <br>
           <label for="update-garansi">Garansi</label>
           <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
           <br>
           <label for="update-free-bonus">Free</label>
           <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
           <br>
           <label for="periode-promo">Periode Promo</label>
           <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
           <br>
           <div class="input-field col s12">
           <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
           <label for="keterangan">Keterangan</label>
         </div>
         <br>
         <div class="input-field col s12">
           <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
           <label for="spesifikasi">Spesifikasi</label>
         </div>
         <div class="input-field col s12">
             <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
             <label for="isibox">Isi Box</label>
           </div>
            <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
              <i class="material-icons right">send</i>
            </button>
           </form>
        </div>  
        `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);



  var tabs = document.querySelectorAll('.tabs')
  var tab;
  for (tab = 0; tab < tabs.length; tab++) {
    var instance = M.Tabs.init(tabs[tab]);
  }


  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }





  // Mengambil data sebagai objek untuk merender Harga HCI (BUKAN UNTUK ANGSURAN)
  let hargaNormal = Number(doc.data().harga);
  let cashBack = Number(doc.data().cashback);
  let hargaHCI = hitung();

  function hitung() {
    if (cashBack !== 0 || cashBack !== '') {
      return hargaNormal - cashBack;
    } else {
      hargaHCI = hargaNormal;
    }
  }
  let hargaHCIST = hargaHCI.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  let biayaSubsidi6Bln = hitung6bln(); // HASIL SUBSIDI DALAM RUPIAH
  let hargaHCI6Bln = hargaHCI + biayaSubsidi6Bln;

  function hitung6bln() {
    return hargaHCI * biaya6bln / 100;
  }
  let hargaHCI6BlnBulat = Math.ceil(hargaHCI6Bln / 100) * 100; // Dibulat ke 100 Rupiah 
  let hargaHCI6BlnST = hargaHCI6BlnBulat.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  let konten1 = document.querySelector('.konten1' + doc.id)
  konten1.innerHTML = `
    <div>Harga Cash / HCI Normal : <span class="bold">Rp ${hargaHCIST} </span> </div>
    <div>Harga HCI 6 Bulan : <span class="bold">Rp ${hargaHCI6BlnST}</span> </div>
    <div class="garis"></div>
  `;

  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING


  ////// Khusus Produk dibawah 4.5 juta START /////////////
  let konten3 = document.querySelector('.konten3' + doc.id)
  if (hargaHCI <= 4500000 && hargaHCI >= 1500000) {

    var Dp = 0; // mengkonversikan 10% dari harga asli ditambah biaya adm 200rb

    var BungaDp0_9 = (hargaHCI * bunga69 / 100); // Bunga dari tenor 9 Bulan
    var BungaDp0_N = (hargaHCI * bunga1224 / 100); // Bunga dari tenor 12 sampai 24 Bulan
    var Admin = 5000;

    var cicilan9_0 = (hargaHCI / 9) + BungaDp0_9 + Admin;
    var cicilan12_0 = (hargaHCI / 12) + BungaDp0_N + Admin;
    var cicilan15_0 = (hargaHCI / 15) + BungaDp0_N + Admin;
    var cicilan18_0 = (hargaHCI / 18) + BungaDp0_N + Admin;
    var cicilan24_0 = (hargaHCI / 24) + BungaDp0_N + Admin;

    // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan9 = Math.ceil(cicilan9_0 / 100) * 100;
    var mathcicilan12 = Math.ceil(cicilan12_0 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15_0 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18_0 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24_0 / 100) * 100;

    //toLocaleString untuk menambahkan koma disetiap 3 digit

    var cicilan9_0asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan12_0asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan15_0asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan18_0asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan24_0asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    ////////////////////Cicilan DP Normal//////////////////////////
    var Dp = (hargaHCI * 10 / 100) + 200000; // mengkonversikan 10% dari harga asli ditambah biaya adm 200rb
    var DpBulat = Math.ceil(Dp / 50000) * 50000; //membulatkan kelipatan 50rb
    // DpBulatShowTime hanya untuk tampil dihalaman depan dengan ada koma disetiap 3 digit 0
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = (HargaSesungguhnya * bunga1224 / 100); // Seharusnya harga asli
    var Bunga9Bulan = (HargaSesungguhnya * bunga69 / 100); // Seharusnya harga asli
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;
    var cicilan24 = (HargaSesungguhnya / 24) + BungaNormal + Admin;
    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24 / 100) * 100;
    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan24asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    //Cicilan Tenor Normal



    //Cicilan Tenor 6 Bulan Bunga 0%

    var biayaAdm60P = hargaHCI * biaya6bln / 100; // mengkonversikan 10% dari harga asli ditambah biaya adm HCI 200rb
    var hargaTerbaru60P = hargaHCI + biayaAdm60P; //harga terbaru setelah ditambah 5.5% admin
    var hargaBulat60P = Math.ceil(hargaTerbaru60P / 100) * 100; //membulatkan kelipatan 100 perak
    var DpMentah60P = (hargaBulat60P * 10 / 100) + 200000; // mengkonversikan 10% dari harga asli
    var DpTerbaru60P = Math.ceil(DpMentah60P / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpTerbaru60PShowTime = DpTerbaru60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya60P = DpTerbaru60P - 199000;
    var HargaSesungguhnya60P = hargaBulat60P - DpSesungguhnya60P;
    //var Bunga6099 = (hargaBulat6099 *2.69 / 100);
    var cicilan60P = (HargaSesungguhnya60P / 6) + Admin;
    var mathcicilan60P = Math.ceil(cicilan60P / 100) * 100;
    var cicilan60Pasli = mathcicilan60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })


    konten3.innerHTML = `
    ${doc.data().nama} <br>
    Promo DP  0 (Cukup bayar biaya admin 200rb) <br>
    9x : ${cicilan9_0asli} <br>
    12x : ${cicilan12_0asli} <br>
    15x : ${cicilan15_0asli} <br>
    18x : ${cicilan18_0asli} <br>
    24x : ${cicilan24_0asli} <br>
    <br>
    Promo DP : ${DpBulatShowTime} <br>
    9x : ${cicilan9asli} <br>
    12x : ${cicilan12asli} <br>
    15x : ${cicilan15asli} <br>
    18x : ${cicilan18asli} <br>
    24x : ${cicilan24asli} <br>
    <br>
    Promo Spesial Cicilan 6 Bulan <br>
    DP : ${DpTerbaru60PShowTime} <br>
    6x : ${cicilan60Pasli}
  `;

  } ////// Khusus Produk dibawah 4.5 juta ENDING/////////////
  else if (hargaHCI <= 16700000 && hargaHCI >= 1500000) {

    ////////////////////Cicilan Tenor Normal//////////////////////////
    var Dp = (hargaHCI * 10 / 100) + 200000; // mengkonversikan 10% dari harga asli ditambah biaya adm 200rb
    var DpBulat = Math.ceil(Dp / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = (HargaSesungguhnya * bunga1224 / 100); // Seharusnya harga asli
    var Bunga9Bulan = (HargaSesungguhnya * bunga69 / 100); // Seharusnya harga asli
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;
    var cicilan24 = (HargaSesungguhnya / 24) + BungaNormal + Admin;
    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24 / 100) * 100;
    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan24asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    ////////////////////Cicilan Tenor Normal ENDING//////////////////////////

    //Cicilan Tenor 6 Bulan Bunga 0%
    var biayaAdm60P = hargaHCI * biaya6bln / 100; // mengkonversikan 10% dari harga asli ditambah biaya adm HCI 200rb
    var hargaTerbaru60P = hargaHCI + biayaAdm60P; //harga terbaru setelah ditambah 4% admin
    // Problem dikolom ini
    var hargaBulat60P = Math.ceil(hargaTerbaru60P / 100) * 100; //membulatkan kelipatan 100 perak
    var hargaBulat60PShowTime = hargaBulat60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var hargaTerbaru60PP = hargaBulat60P; //untuk mengecek bahwa setelah ditambah 5.5% apakah masih dibawah 15jt jika diatas 15jt maka berjalan rumus IF dibawah

    if (hargaTerbaru60PP > 16700000) {
      DpMentah60P = (hargaTerbaru60PP - 15000000) + 200000;
    } else {
      DpMentah60P = (hargaBulat60P * 10 / 100) + 200000;
    }

    var DpTerbaru60P = Math.ceil(DpMentah60P / 50000) * 50000; //membulatkan kelipatan 50rb

    var DpTerbaru60PShowTime = DpTerbaru60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya60P = DpTerbaru60P - 199000;
    var HargaSesungguhnya60P = hargaTerbaru60PP - DpSesungguhnya60P;

    var cicilan60P = (HargaSesungguhnya60P / 6) + Admin;
    var mathcicilan60P = Math.ceil(cicilan60P / 100) * 100;
    var cicilan60Pasli = mathcicilan60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    //Cicilan Tenor 6 Bulan Bunga 0%
    konten3.innerHTML = `
  ${doc.data().nama} <br>
  Promo DP : ${DpBulatShowTime} <br>
  9x : ${cicilan9asli} <br>
  12x : ${cicilan12asli} <br>
  15x : ${cicilan15asli} <br>
  18x : ${cicilan18asli} <br>
  24x : ${cicilan24asli} <br>
  <br>
  Promo Spesial Cicilan 6 Bulan <br>
  DP : ${DpTerbaru60PShowTime} <br>
  6x : ${cicilan60Pasli}
`;

  } ////// Khusus Produk dibawah 15 juta ENDING ////////////

  ////// Khusus Produk diatas 15 juta START ////////////
  else if (hargaHCI > 16700000) {
    //////TENOR NORMAL START/////////////
    var hargaMentah = hargaHCI - 15000000; //15jt adalah batas maksimal kredit di HCI
    var DpRecomend = hargaMentah + 200000; // 1.7jt ada lah 10% dari 15jt (1.5jt) + biaya admin 200rb
    var DpBulat = Math.ceil(DpRecomend / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = (HargaSesungguhnya * bunga1224 / 100);
    var Bunga9Bulan = (HargaSesungguhnya * bunga69 / 100);
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;
    var cicilan24 = (HargaSesungguhnya / 24) + BungaNormal + Admin;
    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24 / 100) * 100;
    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan24asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    //////////// TENOR NORMAL ENDING ///////////////////////////////////////////////



    //Cicilan Tenor 6 Bulan Bunga 0%
    var biayaAdm60P = hargaHCI * biaya6bln / 100; // mengkonversikan 10% dari harga asli ditambah biaya adm HCI 200rb
    var hargaTerbaru60P = hargaHCI + biayaAdm60P; //harga terbaru setelah ditambah 4% admin
    var hargaBulat60P = Math.ceil(hargaTerbaru60P / 100) * 100; //membulatkan kelipatan 50rb

    var hargaMentah60P = (hargaBulat60P - 15000000); //15jt adalah batas maksimal kredit di HCI
    var DpRecomend60P = hargaMentah60P + 200000;

    var DpBulat60P = Math.ceil(DpRecomend60P / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpBulat60PShowTime = DpBulat60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    var DpSesungguhnya60P = DpBulat60P - 199000;
    var HargaSesungguhnya60P = hargaBulat60P - DpSesungguhnya60P;
    var Admin = 5000;
    var cicilan60P = (HargaSesungguhnya60P / 6) + Admin;
    var mathcicilan60P = Math.ceil(cicilan60P / 100) * 100;
    var cicilan60Pasli = mathcicilan60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    //Cicilan Tenor 6 Bulan Bunga 0%
    konten3.innerHTML = `
  ${doc.data().nama} <br>
  Promo DP : ${DpBulatShowTime} <br>
  9x : ${cicilan9asli} <br>
  12x : ${cicilan12asli} <br>
  15x : ${cicilan15asli} <br>
  18x : ${cicilan18asli} <br>
  24x : ${cicilan24asli} <br>
  <br>
  Promo Spesial Cicilan 6 Bulan <br>
  DP : ${DpBulat60PShowTime} <br>
  6x : ${cicilan60Pasli}
`;
  } ////// Khusus Produk diatas 15 juta ENDING ////////////


  // TOMBOL COPY CICILAN #1
  let copyCicilan = document.querySelector('#copycicilan' + doc.id);
  copyCicilan.addEventListener('click', function (e) {
    var text = document.querySelector("#cicilan" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY CICILAN #1 ENDING


  // TOMBOL COPY CICILAN #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;

  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {


      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');

      db.collection('kamera').doc(id).delete().then(function () {
        window.location.reload(true);
      });;

    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)

  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {

      e.preventDefault();

      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);

        db.collection('kamera').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}
// RENDER KAMERA DARI DATA BASE ENDING

// RENDER LENSA DARI DATA BASE START
function renderLensa(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Lensa'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
         <div class="collapsible-header">
            <span class="left col s12">${doc.data().nama}</span>
         </div>
         <div class="center-align collapsible-body">
              <div class="konten1${doc.id}"></div> <!-- INFO HARGA HCI TIDAK BISA DICOPAS -->
              <div id="cicilan${doc.id}">
                <div class="konten3${doc.id}"></div> <!-- INFO CICILAN HOMECREDIT YANG BISA DI COPAS -->
                <div class="konten4${doc.id}"></div> <!-- INFO FREEAN BONUS GABUNG CICILAN -->
              </div>
              <br>
              <a id="copycicilan${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Angsuran</a>
              <div class="garis"></div>
              <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
              <br>
              <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
              <a  class=" btn-small disabled delete" href="#" >Delete</a>
              <br>
              <br>
  
              <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
              <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
              <!-- Modal Structure -->
              <div id="modal1${doc.id}" class="modal">
                <div class="modal-content">
                  <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                </div>
                <div class="modal-footer">
                  <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                </div>
              </div>
              
              <!-- Modal Structure -->
              <div id="modal2${doc.id}" class="modal">
              <div class="modal-content">
                <div class="isibox${doc.id}">${newIsibox}</div>
              </div>
              <div class="modal-footer">
                <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
              </div>
            </div>
           
         `;



  la.innerHTML = `
         <div class="modal" id="updatemodal${doc.id}">
            <form id="${doc.id}form">
             <label for="update-nama-produk">Nama Kamera</label>
             <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
             <br>
             <label for="update-harga-produk">Masukkan Harga</label>
             <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
             <br>
             <label for="update-cashback">Cashback</label>
             <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
             <br>
             <label for="update-garansi">Garansi</label>
             <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
             <br>
             <label for="update-free-bonus">Free</label>
             <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
             <br>
             <label for="periode-promo">Periode Promo</label>
             <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
             <br>
             <div class="input-field col s12">
             <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
             <label for="keterangan">Keterangan</label>
           </div>
           <br>
           <div class="input-field col s12">
             <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
             <label for="spesifikasi">Spesifikasi</label>
           </div>
           <div class="input-field col s12">
               <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
               <label for="isibox">Isi Box</label>
             </div>
              <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                <i class="material-icons right">send</i>
              </button>
             </form>
          </div>  
          `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);



  var tabs = document.querySelectorAll('.tabs')
  var tab;
  for (tab = 0; tab < tabs.length; tab++) {
    var instance = M.Tabs.init(tabs[tab]);
  }


  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }





  // Mengambil data sebagai objek untuk merender Harga HCI (BUKAN UNTUK ANGSURAN)
  let hargaNormal = Number(doc.data().harga);
  let cashBack = Number(doc.data().cashback);
  let hargaHCI = hitung();

  function hitung() {
    if (cashBack !== 0 || cashBack !== '') {
      return hargaNormal - cashBack;
    } else {
      hargaHCI = hargaNormal;
    }
  }
  let hargaHCIST = hargaHCI.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  let biayaSubsidi6Bln = hitung6bln(); // HASIL SUBSIDI DALAM RUPIAH
  let hargaHCI6Bln = hargaHCI + biayaSubsidi6Bln;

  function hitung6bln() {
    return hargaHCI * biaya6bln / 100;
  }
  let hargaHCI6BlnBulat = Math.ceil(hargaHCI6Bln / 100) * 100; // Dibulat ke 100 Rupiah 
  let hargaHCI6BlnST = hargaHCI6BlnBulat.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  let konten1 = document.querySelector('.konten1' + doc.id)
  konten1.innerHTML = `
      <div>Harga Cash / HCI Normal : <span class="bold">Rp ${hargaHCIST} </span> </div>
      <div>Harga HCI 6 Bulan : <span class="bold">Rp ${hargaHCI6BlnST}</span> </div>
      <div class="garis"></div>
    `;

  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING


  ////// Khusus Produk dibawah 4.5 juta START /////////////
  let konten3 = document.querySelector('.konten3' + doc.id)
  if (hargaHCI <= 4500000 && hargaHCI >= 1500000) {

    var Dp = 0; // mengkonversikan 10% dari harga asli ditambah biaya adm 200rb

    var BungaDp0_9 = (hargaHCI * bunga69 / 100); // Bunga dari tenor 9 Bulan
    var BungaDp0_N = (hargaHCI * bunga1224 / 100); // Bunga dari tenor 12 sampai 24 Bulan
    var Admin = 5000;

    var cicilan9_0 = (hargaHCI / 9) + BungaDp0_9 + Admin;
    var cicilan12_0 = (hargaHCI / 12) + BungaDp0_N + Admin;
    var cicilan15_0 = (hargaHCI / 15) + BungaDp0_N + Admin;
    var cicilan18_0 = (hargaHCI / 18) + BungaDp0_N + Admin;
    var cicilan24_0 = (hargaHCI / 24) + BungaDp0_N + Admin;

    // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan9 = Math.ceil(cicilan9_0 / 100) * 100;
    var mathcicilan12 = Math.ceil(cicilan12_0 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15_0 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18_0 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24_0 / 100) * 100;

    //toLocaleString untuk menambahkan koma disetiap 3 digit

    var cicilan9_0asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan12_0asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan15_0asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan18_0asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan24_0asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    ////////////////////Cicilan DP Normal//////////////////////////
    var Dp = (hargaHCI * 10 / 100) + 200000; // mengkonversikan 10% dari harga asli ditambah biaya adm 200rb
    var DpBulat = Math.ceil(Dp / 50000) * 50000; //membulatkan kelipatan 50rb
    // DpBulatShowTime hanya untuk tampil dihalaman depan dengan ada koma disetiap 3 digit 0
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = (HargaSesungguhnya * bunga1224 / 100); // Seharusnya harga asli
    var Bunga9Bulan = (HargaSesungguhnya * bunga69 / 100); // Seharusnya harga asli
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;
    var cicilan24 = (HargaSesungguhnya / 24) + BungaNormal + Admin;
    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24 / 100) * 100;
    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan24asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    //Cicilan Tenor Normal



    //Cicilan Tenor 6 Bulan Bunga 0%

    var biayaAdm60P = hargaHCI * biaya6bln / 100; // mengkonversikan 10% dari harga asli ditambah biaya adm HCI 200rb
    var hargaTerbaru60P = hargaHCI + biayaAdm60P; //harga terbaru setelah ditambah 5.5% admin
    var hargaBulat60P = Math.ceil(hargaTerbaru60P / 100) * 100; //membulatkan kelipatan 100 perak
    var DpMentah60P = (hargaBulat60P * 10 / 100) + 200000; // mengkonversikan 10% dari harga asli
    var DpTerbaru60P = Math.ceil(DpMentah60P / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpTerbaru60PShowTime = DpTerbaru60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya60P = DpTerbaru60P - 199000;
    var HargaSesungguhnya60P = hargaBulat60P - DpSesungguhnya60P;
    //var Bunga6099 = (hargaBulat6099 *2.69 / 100);
    var cicilan60P = (HargaSesungguhnya60P / 6) + Admin;
    var mathcicilan60P = Math.ceil(cicilan60P / 100) * 100;
    var cicilan60Pasli = mathcicilan60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })


    konten3.innerHTML = `
      ${doc.data().nama} <br>
      Promo DP  0 (Cukup bayar biaya admin 200rb) <br>
      9x : ${cicilan9_0asli} <br>
      12x : ${cicilan12_0asli} <br>
      15x : ${cicilan15_0asli} <br>
      18x : ${cicilan18_0asli} <br>
      24x : ${cicilan24_0asli} <br>
      <br>
      Promo DP : ${DpBulatShowTime} <br>
      9x : ${cicilan9asli} <br>
      12x : ${cicilan12asli} <br>
      15x : ${cicilan15asli} <br>
      18x : ${cicilan18asli} <br>
      24x : ${cicilan24asli} <br>
      <br>
      Promo Spesial Cicilan 6 Bulan <br>
      DP : ${DpTerbaru60PShowTime} <br>
      6x : ${cicilan60Pasli}
    `;

  } ////// Khusus Produk dibawah 4.5 juta ENDING/////////////
  else if (hargaHCI <= 16700000 && hargaHCI >= 1500000) {

    ////////////////////Cicilan Tenor Normal//////////////////////////
    var Dp = (hargaHCI * 10 / 100) + 200000; // mengkonversikan 10% dari harga asli ditambah biaya adm 200rb
    var DpBulat = Math.ceil(Dp / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = (HargaSesungguhnya * bunga1224 / 100); // Seharusnya harga asli
    var Bunga9Bulan = (HargaSesungguhnya * bunga69 / 100); // Seharusnya harga asli
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;
    var cicilan24 = (HargaSesungguhnya / 24) + BungaNormal + Admin;
    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24 / 100) * 100;
    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan24asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    ////////////////////Cicilan Tenor Normal ENDING//////////////////////////

    //Cicilan Tenor 6 Bulan Bunga 0%
    var biayaAdm60P = hargaHCI * biaya6bln / 100; // mengkonversikan 10% dari harga asli ditambah biaya adm HCI 200rb
    var hargaTerbaru60P = hargaHCI + biayaAdm60P; //harga terbaru setelah ditambah 4% admin
    // Problem dikolom ini
    var hargaBulat60P = Math.ceil(hargaTerbaru60P / 100) * 100; //membulatkan kelipatan 100 perak
    var hargaBulat60PShowTime = hargaBulat60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var hargaTerbaru60PP = hargaBulat60P; //untuk mengecek bahwa setelah ditambah 5.5% apakah masih dibawah 15jt jika diatas 15jt maka berjalan rumus IF dibawah

    if (hargaTerbaru60PP > 16700000) {
      DpMentah60P = (hargaTerbaru60PP - 15000000) + 200000;
    } else {
      DpMentah60P = (hargaBulat60P * 10 / 100) + 200000;
    }

    var DpTerbaru60P = Math.ceil(DpMentah60P / 50000) * 50000; //membulatkan kelipatan 50rb

    var DpTerbaru60PShowTime = DpTerbaru60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya60P = DpTerbaru60P - 199000;
    var HargaSesungguhnya60P = hargaTerbaru60PP - DpSesungguhnya60P;

    var cicilan60P = (HargaSesungguhnya60P / 6) + Admin;
    var mathcicilan60P = Math.ceil(cicilan60P / 100) * 100;
    var cicilan60Pasli = mathcicilan60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    //Cicilan Tenor 6 Bulan Bunga 0%
    konten3.innerHTML = `
    ${doc.data().nama} <br>
    Promo DP : ${DpBulatShowTime} <br>
    9x : ${cicilan9asli} <br>
    12x : ${cicilan12asli} <br>
    15x : ${cicilan15asli} <br>
    18x : ${cicilan18asli} <br>
    24x : ${cicilan24asli} <br>
    <br>
    Promo Spesial Cicilan 6 Bulan <br>
    DP : ${DpTerbaru60PShowTime} <br>
    6x : ${cicilan60Pasli}
  `;

  } ////// Khusus Produk dibawah 15 juta ENDING ////////////

  ////// Khusus Produk diatas 15 juta START ////////////
  else if (hargaHCI > 16700000) {
    //////TENOR NORMAL START/////////////
    var hargaMentah = hargaHCI - 15000000; //15jt adalah batas maksimal kredit di HCI
    var DpRecomend = hargaMentah + 200000; // 1.7jt ada lah 10% dari 15jt (1.5jt) + biaya admin 200rb
    var DpBulat = Math.ceil(DpRecomend / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = (HargaSesungguhnya * bunga1224 / 100);
    var Bunga9Bulan = (HargaSesungguhnya * bunga69 / 100);
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;
    var cicilan24 = (HargaSesungguhnya / 24) + BungaNormal + Admin;
    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24 / 100) * 100;
    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan24asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    //////////// TENOR NORMAL ENDING ///////////////////////////////////////////////



    //Cicilan Tenor 6 Bulan Bunga 0%
    var biayaAdm60P = hargaHCI * biaya6bln / 100; // mengkonversikan 10% dari harga asli ditambah biaya adm HCI 200rb
    var hargaTerbaru60P = hargaHCI + biayaAdm60P; //harga terbaru setelah ditambah 4% admin
    var hargaBulat60P = Math.ceil(hargaTerbaru60P / 100) * 100; //membulatkan kelipatan 50rb

    var hargaMentah60P = (hargaBulat60P - 15000000); //15jt adalah batas maksimal kredit di HCI
    var DpRecomend60P = hargaMentah60P + 200000;

    var DpBulat60P = Math.ceil(DpRecomend60P / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpBulat60PShowTime = DpBulat60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    var DpSesungguhnya60P = DpBulat60P - 199000;
    var HargaSesungguhnya60P = hargaBulat60P - DpSesungguhnya60P;
    var Admin = 5000;
    var cicilan60P = (HargaSesungguhnya60P / 6) + Admin;
    var mathcicilan60P = Math.ceil(cicilan60P / 100) * 100;
    var cicilan60Pasli = mathcicilan60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    //Cicilan Tenor 6 Bulan Bunga 0%
    konten3.innerHTML = `
    ${doc.data().nama} <br>
    Promo DP : ${DpBulatShowTime} <br>
    9x : ${cicilan9asli} <br>
    12x : ${cicilan12asli} <br>
    15x : ${cicilan15asli} <br>
    18x : ${cicilan18asli} <br>
    24x : ${cicilan24asli} <br>
    <br>
    Promo Spesial Cicilan 6 Bulan <br>
    DP : ${DpBulat60PShowTime} <br>
    6x : ${cicilan60Pasli}
  `;
  } ////// Khusus Produk diatas 15 juta ENDING ////////////


  // TOMBOL COPY CICILAN #1
  let copyCicilan = document.querySelector('#copycicilan' + doc.id);
  copyCicilan.addEventListener('click', function (e) {
    var text = document.querySelector("#cicilan" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY CICILAN #1 ENDING


  // TOMBOL COPY CICILAN #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;

  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {


      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');

      db.collection('lensa').doc(id).delete().then(function () {
        window.location.reload(true);
      });;

    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)

  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {

      e.preventDefault();

      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);

        db.collection('lensa').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}
// RENDER LENSA DARI DATA BASE ENDING

// RENDER GIMBAL / STABILIZER DARI DATABASE START
function renderGimbal(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Stabilizer'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
           <div class="collapsible-header">
              <span class="left col s12">${doc.data().nama}</span>
           </div>
           <div class="center-align collapsible-body">
                <div class="konten1${doc.id}"></div> <!-- INFO HARGA HCI TIDAK BISA DICOPAS -->
                <div id="cicilan${doc.id}">
                  <div class="konten3${doc.id}"></div> <!-- INFO CICILAN HOMECREDIT YANG BISA DI COPAS -->
                  <div class="konten4${doc.id}"></div> <!-- INFO FREEAN BONUS GABUNG CICILAN -->
                </div>
                <br>
                <a id="copycicilan${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Angsuran</a>
                <div class="garis"></div>
                <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                <br>
                <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                <a  class=" btn-small disabled delete" href="#" >Delete</a>
                <br>
                <br>
    
                <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                <!-- Modal Structure -->
                <div id="modal1${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                  </div>
                </div>
                
                <!-- Modal Structure -->
                <div id="modal2${doc.id}" class="modal">
                <div class="modal-content">
                  <div class="isibox${doc.id}">${newIsibox}</div>
                </div>
                <div class="modal-footer">
                  <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                </div>
              </div>
             
           `;



  la.innerHTML = `
           <div class="modal" id="updatemodal${doc.id}">
              <form id="${doc.id}form">
               <label for="update-nama-produk">Nama Kamera</label>
               <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
               <br>
               <label for="update-harga-produk">Masukkan Harga</label>
               <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
               <br>
               <label for="update-cashback">Cashback</label>
               <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
               <br>
               <label for="update-garansi">Garansi</label>
               <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
               <br>
               <label for="update-free-bonus">Free</label>
               <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
               <br>
               <label for="periode-promo">Periode Promo</label>
               <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
               <br>
               <div class="input-field col s12">
               <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
               <label for="keterangan">Keterangan</label>
             </div>
             <br>
             <div class="input-field col s12">
               <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
               <label for="spesifikasi">Spesifikasi</label>
             </div>
             <div class="input-field col s12">
                 <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                 <label for="isibox">Isi Box</label>
               </div>
                <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                  <i class="material-icons right">send</i>
                </button>
               </form>
            </div>  
            `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);



  var tabs = document.querySelectorAll('.tabs')
  var tab;
  for (tab = 0; tab < tabs.length; tab++) {
    var instance = M.Tabs.init(tabs[tab]);
  }


  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }





  // Mengambil data sebagai objek untuk merender Harga HCI (BUKAN UNTUK ANGSURAN)
  let hargaNormal = Number(doc.data().harga);
  let cashBack = Number(doc.data().cashback);
  let hargaHCI = hitung();

  function hitung() {
    if (cashBack !== 0 || cashBack !== '') {
      return hargaNormal - cashBack;
    } else {
      hargaHCI = hargaNormal;
    }
  }
  let hargaHCIST = hargaHCI.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  let biayaSubsidi6Bln = hitung6bln(); // HASIL SUBSIDI DALAM RUPIAH
  let hargaHCI6Bln = hargaHCI + biayaSubsidi6Bln;

  function hitung6bln() {
    return hargaHCI * biaya6bln / 100;
  }
  let hargaHCI6BlnBulat = Math.ceil(hargaHCI6Bln / 100) * 100; // Dibulat ke 100 Rupiah 
  let hargaHCI6BlnST = hargaHCI6BlnBulat.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  let konten1 = document.querySelector('.konten1' + doc.id)
  konten1.innerHTML = `
        <div>Harga Cash / HCI Normal : <span class="bold">Rp ${hargaHCIST} </span> </div>
        <div>Harga HCI 6 Bulan : <span class="bold">Rp ${hargaHCI6BlnST}</span> </div>
        <div class="garis"></div>
      `;

  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING


  ////// Khusus Produk dibawah 4.5 juta START /////////////
  let konten3 = document.querySelector('.konten3' + doc.id)
  if (hargaHCI <= 4500000 && hargaHCI >= 1500000) {

    var Dp = 0; // mengkonversikan 10% dari harga asli ditambah biaya adm 200rb

    var BungaDp0_9 = (hargaHCI * bunga69 / 100); // Bunga dari tenor 9 Bulan
    var BungaDp0_N = (hargaHCI * bunga1224 / 100); // Bunga dari tenor 12 sampai 24 Bulan
    var Admin = 5000;

    var cicilan9_0 = (hargaHCI / 9) + BungaDp0_9 + Admin;
    var cicilan12_0 = (hargaHCI / 12) + BungaDp0_N + Admin;
    var cicilan15_0 = (hargaHCI / 15) + BungaDp0_N + Admin;
    var cicilan18_0 = (hargaHCI / 18) + BungaDp0_N + Admin;
    var cicilan24_0 = (hargaHCI / 24) + BungaDp0_N + Admin;

    // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan9 = Math.ceil(cicilan9_0 / 100) * 100;
    var mathcicilan12 = Math.ceil(cicilan12_0 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15_0 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18_0 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24_0 / 100) * 100;

    //toLocaleString untuk menambahkan koma disetiap 3 digit

    var cicilan9_0asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan12_0asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan15_0asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan18_0asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    var cicilan24_0asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    ////////////////////Cicilan DP Normal//////////////////////////
    var Dp = (hargaHCI * 10 / 100) + 200000; // mengkonversikan 10% dari harga asli ditambah biaya adm 200rb
    var DpBulat = Math.ceil(Dp / 50000) * 50000; //membulatkan kelipatan 50rb
    // DpBulatShowTime hanya untuk tampil dihalaman depan dengan ada koma disetiap 3 digit 0
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = (HargaSesungguhnya * bunga1224 / 100); // Seharusnya harga asli
    var Bunga9Bulan = (HargaSesungguhnya * bunga69 / 100); // Seharusnya harga asli
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;
    var cicilan24 = (HargaSesungguhnya / 24) + BungaNormal + Admin;
    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24 / 100) * 100;
    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan24asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    //Cicilan Tenor Normal



    //Cicilan Tenor 6 Bulan Bunga 0%

    var biayaAdm60P = hargaHCI * biaya6bln / 100; // mengkonversikan 10% dari harga asli ditambah biaya adm HCI 200rb
    var hargaTerbaru60P = hargaHCI + biayaAdm60P; //harga terbaru setelah ditambah 5.5% admin
    var hargaBulat60P = Math.ceil(hargaTerbaru60P / 100) * 100; //membulatkan kelipatan 100 perak
    var DpMentah60P = (hargaBulat60P * 10 / 100) + 200000; // mengkonversikan 10% dari harga asli
    var DpTerbaru60P = Math.ceil(DpMentah60P / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpTerbaru60PShowTime = DpTerbaru60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya60P = DpTerbaru60P - 199000;
    var HargaSesungguhnya60P = hargaBulat60P - DpSesungguhnya60P;
    //var Bunga6099 = (hargaBulat6099 *2.69 / 100);
    var cicilan60P = (HargaSesungguhnya60P / 6) + Admin;
    var mathcicilan60P = Math.ceil(cicilan60P / 100) * 100;
    var cicilan60Pasli = mathcicilan60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })


    konten3.innerHTML = `
        ${doc.data().nama} <br>
        Promo DP  0 (Cukup bayar biaya admin 200rb) <br>
        9x : ${cicilan9_0asli} <br>
        12x : ${cicilan12_0asli} <br>
        15x : ${cicilan15_0asli} <br>
        18x : ${cicilan18_0asli} <br>
        24x : ${cicilan24_0asli} <br>
        <br>
        Promo DP : ${DpBulatShowTime} <br>
        9x : ${cicilan9asli} <br>
        12x : ${cicilan12asli} <br>
        15x : ${cicilan15asli} <br>
        18x : ${cicilan18asli} <br>
        24x : ${cicilan24asli} <br>
        <br>
        Promo Spesial Cicilan 6 Bulan <br>
        DP : ${DpTerbaru60PShowTime} <br>
        6x : ${cicilan60Pasli}
      `;

  } ////// Khusus Produk dibawah 4.5 juta ENDING/////////////
  else if (hargaHCI <= 16700000 && hargaHCI >= 1500000) {

    ////////////////////Cicilan Tenor Normal//////////////////////////
    var Dp = (hargaHCI * 10 / 100) + 200000; // mengkonversikan 10% dari harga asli ditambah biaya adm 200rb
    var DpBulat = Math.ceil(Dp / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = (HargaSesungguhnya * bunga1224 / 100); // Seharusnya harga asli
    var Bunga9Bulan = (HargaSesungguhnya * bunga69 / 100); // Seharusnya harga asli
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;
    var cicilan24 = (HargaSesungguhnya / 24) + BungaNormal + Admin;
    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24 / 100) * 100;
    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan24asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    ////////////////////Cicilan Tenor Normal ENDING//////////////////////////

    //Cicilan Tenor 6 Bulan Bunga 0%
    var biayaAdm60P = hargaHCI * biaya6bln / 100; // mengkonversikan 10% dari harga asli ditambah biaya adm HCI 200rb
    var hargaTerbaru60P = hargaHCI + biayaAdm60P; //harga terbaru setelah ditambah 4% admin
    // Problem dikolom ini
    var hargaBulat60P = Math.ceil(hargaTerbaru60P / 100) * 100; //membulatkan kelipatan 100 perak
    var hargaBulat60PShowTime = hargaBulat60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var hargaTerbaru60PP = hargaBulat60P; //untuk mengecek bahwa setelah ditambah 5.5% apakah masih dibawah 15jt jika diatas 15jt maka berjalan rumus IF dibawah

    if (hargaTerbaru60PP > 16700000) {
      DpMentah60P = (hargaTerbaru60PP - 15000000) + 200000;
    } else {
      DpMentah60P = (hargaBulat60P * 10 / 100) + 200000;
    }

    var DpTerbaru60P = Math.ceil(DpMentah60P / 50000) * 50000; //membulatkan kelipatan 50rb

    var DpTerbaru60PShowTime = DpTerbaru60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya60P = DpTerbaru60P - 199000;
    var HargaSesungguhnya60P = hargaTerbaru60PP - DpSesungguhnya60P;

    var cicilan60P = (HargaSesungguhnya60P / 6) + Admin;
    var mathcicilan60P = Math.ceil(cicilan60P / 100) * 100;
    var cicilan60Pasli = mathcicilan60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    //Cicilan Tenor 6 Bulan Bunga 0%
    konten3.innerHTML = `
      ${doc.data().nama} <br>
      Promo DP : ${DpBulatShowTime} <br>
      9x : ${cicilan9asli} <br>
      12x : ${cicilan12asli} <br>
      15x : ${cicilan15asli} <br>
      18x : ${cicilan18asli} <br>
      24x : ${cicilan24asli} <br>
      <br>
      Promo Spesial Cicilan 6 Bulan <br>
      DP : ${DpTerbaru60PShowTime} <br>
      6x : ${cicilan60Pasli}
    `;

  } ////// Khusus Produk dibawah 15 juta ENDING ////////////

  ////// Khusus Produk diatas 15 juta START ////////////
  else if (hargaHCI > 16700000) {
    //////TENOR NORMAL START/////////////
    var hargaMentah = hargaHCI - 15000000; //15jt adalah batas maksimal kredit di HCI
    var DpRecomend = hargaMentah + 200000; // 1.7jt ada lah 10% dari 15jt (1.5jt) + biaya admin 200rb
    var DpBulat = Math.ceil(DpRecomend / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = (HargaSesungguhnya * bunga1224 / 100);
    var Bunga9Bulan = (HargaSesungguhnya * bunga69 / 100);
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;
    var cicilan24 = (HargaSesungguhnya / 24) + BungaNormal + Admin;
    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;
    var mathcicilan24 = Math.ceil(cicilan24 / 100) * 100;
    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan24asli = mathcicilan24.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    //////////// TENOR NORMAL ENDING ///////////////////////////////////////////////



    //Cicilan Tenor 6 Bulan Bunga 0%
    var biayaAdm60P = hargaHCI * biaya6bln / 100; // mengkonversikan 10% dari harga asli ditambah biaya adm HCI 200rb
    var hargaTerbaru60P = hargaHCI + biayaAdm60P; //harga terbaru setelah ditambah 4% admin
    var hargaBulat60P = Math.ceil(hargaTerbaru60P / 100) * 100; //membulatkan kelipatan 50rb

    var hargaMentah60P = (hargaBulat60P - 15000000); //15jt adalah batas maksimal kredit di HCI
    var DpRecomend60P = hargaMentah60P + 200000;

    var DpBulat60P = Math.ceil(DpRecomend60P / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpBulat60PShowTime = DpBulat60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    var DpSesungguhnya60P = DpBulat60P - 199000;
    var HargaSesungguhnya60P = hargaBulat60P - DpSesungguhnya60P;
    var Admin = 5000;
    var cicilan60P = (HargaSesungguhnya60P / 6) + Admin;
    var mathcicilan60P = Math.ceil(cicilan60P / 100) * 100;
    var cicilan60Pasli = mathcicilan60P.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    //Cicilan Tenor 6 Bulan Bunga 0%
    konten3.innerHTML = `
      ${doc.data().nama} <br>
      Promo DP : ${DpBulatShowTime} <br>
      9x : ${cicilan9asli} <br>
      12x : ${cicilan12asli} <br>
      15x : ${cicilan15asli} <br>
      18x : ${cicilan18asli} <br>
      24x : ${cicilan24asli} <br>
      <br>
      Promo Spesial Cicilan 6 Bulan <br>
      DP : ${DpBulat60PShowTime} <br>
      6x : ${cicilan60Pasli}
    `;
  } ////// Khusus Produk diatas 15 juta ENDING ////////////


  // TOMBOL COPY CICILAN #1
  let copyCicilan = document.querySelector('#copycicilan' + doc.id);
  copyCicilan.addEventListener('click', function (e) {
    var text = document.querySelector("#cicilan" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY CICILAN #1 ENDING


  // TOMBOL COPY CICILAN #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;

  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {


      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');

      db.collection('gimbal').doc(id).delete().then(function () {
        window.location.reload(true);
      });;

    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)

  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {

      e.preventDefault();

      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);

        db.collection('gimbal').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}
// RENDER GIMBAL / STABILIZER DARI DATA BASE ENDING

// RENDER DRONE START
function renderDrone(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Drone'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  <div class="konten1${doc.id}"></div> <!-- INFO HARGA HCI TIDAK BISA DICOPAS -->
                  <div id="cicilan${doc.id}">
                    <div class="konten3${doc.id}"></div> <!-- INFO CICILAN HOMECREDIT YANG BISA DI COPAS -->
                    <div class="konten4${doc.id}"></div> <!-- INFO FREEAN BONUS GABUNG CICILAN -->
                  </div>
                  <br>
                  <a id="copycicilan${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Angsuran</a>
                  <div class="garis"></div>
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>
               
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);



  var tabs = document.querySelectorAll('.tabs')
  var tab;
  for (tab = 0; tab < tabs.length; tab++) {
    var instance = M.Tabs.init(tabs[tab]);
  }


  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }





  // Mengambil data sebagai objek untuk merender Harga HCI (BUKAN UNTUK ANGSURAN)
  let hargaNormal = Number(doc.data().harga);
  let cashBack = Number(doc.data().cashback);
  let hargaHCI = hitung();

  function hitung() {
    if (cashBack !== 0 || cashBack !== '') {
      return hargaNormal - cashBack;
    } else {
      hargaHCI = hargaNormal;
    }
  }
  let hargaHCIST = hargaHCI.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  let konten1 = document.querySelector('.konten1' + doc.id)
  konten1.innerHTML = `
          <div>Harga Cash / HCI Normal : <span class="bold">Rp ${hargaHCIST} </span> </div>

          <div class="garis"></div>
        `;

  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING


  ////// Khusus Produk dibawah 4.5 juta START /////////////
  let konten3 = document.querySelector('.konten3' + doc.id)
  if (hargaHCI <= 2000000 && hargaHCI >= 1000000) {

    ////////////////////Cicilan DP Normal//////////////////////////
    var Dp = (hargaHCI * 30 / 100) + 50000; // mengkonversikan 10% dari harga asli ditambah biaya adm 200rb
    var DpBulat = Math.ceil(Dp / 50000) * 50000; //membulatkan kelipatan 50rb
    // DpBulatShowTime hanya untuk tampil dihalaman depan dengan ada koma disetiap 3 digit 0
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = ((HargaSesungguhnya * bungadrone) / 100); // Seharusnya harga asli
    console.log(BungaNormal)
    var Bunga9Bulan = (HargaSesungguhnya * b69drone / 100); // Seharusnya harga asli
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;

    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;

    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    //Cicilan Tenor Normal
    konten3.innerHTML = `
        ${doc.data().nama} <br>
        DP : ${DpBulatShowTime} <br>
        9x : ${cicilan9asli} <br>
        12x : ${cicilan12asli} <br>
        15x : ${cicilan15asli} <br>
        18x : ${cicilan18asli} <br>
        `;




  } ////// Khusus Produk dibawah 4.5 juta ENDING/////////////
  else if (hargaHCI <= 14300000 && hargaHCI >= 2000000) {

    ////////////////////Cicilan Tenor Normal//////////////////////////
    var Dp = (hargaHCI * 30 / 100) + 200000; // mengkonversikan 10% dari harga asli ditambah biaya adm 200rb
    var DpBulat = Math.ceil(Dp / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = (HargaSesungguhnya * bungadrone / 100); // Seharusnya harga asli
    var Bunga9Bulan = (HargaSesungguhnya * b69drone / 100); // Seharusnya harga asli
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;
    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;

    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    ////////////////////Cicilan Tenor Normal ENDING//////////////////////////
    //Cicilan Tenor Normal
    konten3.innerHTML = `
        ${doc.data().nama} <br>
        DP : ${DpBulatShowTime} <br>
        9x : ${cicilan9asli} <br>
        12x : ${cicilan12asli} <br>
        15x : ${cicilan15asli} <br>
        18x : ${cicilan18asli} <br>
        `;




  } ////// Khusus Produk dibawah 15 juta ENDING ////////////
  ////// Khusus Produk diatas 15 juta START ////////////
  else if (hargaHCI > 14300000) {

    //////TENOR NORMAL START/////////////
    var hargaMentah = hargaHCI - 10000000; //10jt adalah batas maksimal kredit di HCI
    var DpRecomend = hargaMentah + 200000; // 1.7jt ada lah 30% dari 10jt  + biaya admin 200rb

    var DpBulat = Math.ceil(DpRecomend / 50000) * 50000; //membulatkan kelipatan 50rb
    var DpBulatShowTime = DpBulat.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var DpSesungguhnya = DpBulat - 199000;
    var HargaSesungguhnya = hargaHCI - DpSesungguhnya;
    var BungaNormal = (HargaSesungguhnya * bungadrone / 100);
    var Bunga9Bulan = (HargaSesungguhnya * b69drone / 100);
    var Admin = 5000;
    var cicilan9 = (HargaSesungguhnya / 9) + Bunga9Bulan + Admin;
    var cicilan12 = (HargaSesungguhnya / 12) + BungaNormal + Admin;
    var cicilan15 = (HargaSesungguhnya / 15) + BungaNormal + Admin;
    var cicilan18 = (HargaSesungguhnya / 18) + BungaNormal + Admin;

    var mathcicilan9 = Math.ceil(cicilan9 / 100) * 100; // Math.ceil untuk membulatkan menjadi kelipatan 100 rupiah
    var mathcicilan12 = Math.ceil(cicilan12 / 100) * 100;
    var mathcicilan15 = Math.ceil(cicilan15 / 100) * 100;
    var mathcicilan18 = Math.ceil(cicilan18 / 100) * 100;

    //toLocaleString untuk menambahkan koma disetiap 3 digit
    var cicilan9asli = mathcicilan9.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan12asli = mathcicilan12.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan15asli = mathcicilan15.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    var cicilan18asli = mathcicilan18.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })

    //////////// TENOR NORMAL ENDING ///////////////////////////////////////////////

    konten3.innerHTML = `
      ${doc.data().nama} <br>
      DP : ${DpBulatShowTime} <br>
      9x : ${cicilan9asli} <br>
      12x : ${cicilan12asli} <br>
      15x : ${cicilan15asli} <br>
      18x : ${cicilan18asli} <br>
      `;




  } ////// Khusus Produk diatas 15 juta ENDING ////////////


  // TOMBOL COPY CICILAN #1
  let copyCicilan = document.querySelector('#copycicilan' + doc.id);
  copyCicilan.addEventListener('click', function (e) {
    var text = document.querySelector("#cicilan" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY CICILAN #1 ENDING


  // TOMBOL COPY CICILAN #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;

  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {


      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');

      db.collection('drone').doc(id).delete().then(function () {
        window.location.reload(true);
      });;

    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)

  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {

      e.preventDefault();

      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);

        db.collection('drone').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}
// RENDER DRONE ENDING

// RENDER ADAPTER LENSA START      
function renderAdapterLensa(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
               <div class="collapsible-header">
                  <span class="left col s12">${doc.data().nama}</span>
               </div>
               <div class="center-align collapsible-body">
                    
                    <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                    <br>
                    <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                    <a  class=" btn-small disabled delete" href="#" >Delete</a>
                    <br>
                    <br>
        
                    <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                    <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                    <!-- Modal Structure -->
                    <div id="modal1${doc.id}" class="modal">
                      <div class="modal-content">
                        <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                      </div>
                      <div class="modal-footer">
                        <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                      </div>
                    </div>
                    
                    <!-- Modal Structure -->
                    <div id="modal2${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="isibox${doc.id}">${newIsibox}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                    </div>
                  </div>      
               `;



  la.innerHTML = `
               <div class="modal" id="updatemodal${doc.id}">
                  <form id="${doc.id}form">
                   <label for="update-nama-produk">Nama Kamera</label>
                   <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                   <br>
                   <label for="update-harga-produk">Masukkan Harga</label>
                   <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                   <br>
                   <label for="update-cashback">Cashback</label>
                   <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                   <br>
                   <label for="update-garansi">Garansi</label>
                   <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                   <br>
                   <label for="update-free-bonus">Free</label>
                   <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                   <br>
                   <label for="periode-promo">Periode Promo</label>
                   <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                   <br>
                   <div class="input-field col s12">
                   <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                   <label for="keterangan">Keterangan</label>
                 </div>
                 <br>
                 <div class="input-field col s12">
                   <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                   <label for="spesifikasi">Spesifikasi</label>
                 </div>
                 <div class="input-field col s12">
                     <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                     <label for="isibox">Isi Box</label>
                   </div>
                    <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                      <i class="material-icons right">send</i>
                    </button>
                   </form>
                </div>  
                `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
      // UPDATE DIBAWAH INI        
      db.collection('adapterlensa').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
        // UPDATE DIBAWAH INI         
        db.collection('adapterlensa').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}
// RENDER ADAPTER LENSA ENDING    

// RENDER BATERAI LENSA START      
function renderBaterai(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
         <div class="collapsible-header">
            <span class="left col s12">${doc.data().nama}</span>
         </div>
         <div class="center-align collapsible-body">
              
              <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
              <br>
              <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
              <a  class=" btn-small disabled delete" href="#" >Delete</a>
              <br>
              <br>
  
              <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
              <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
              <!-- Modal Structure -->
              <div id="modal1${doc.id}" class="modal">
                <div class="modal-content">
                  <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                </div>
                <div class="modal-footer">
                  <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                </div>
              </div>
              
              <!-- Modal Structure -->
              <div id="modal2${doc.id}" class="modal">
              <div class="modal-content">
                <div class="isibox${doc.id}">${newIsibox}</div>
              </div>
              <div class="modal-footer">
                <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
              </div>
            </div>      
         `;



  la.innerHTML = `
         <div class="modal" id="updatemodal${doc.id}">
            <form id="${doc.id}form">
             <label for="update-nama-produk">Nama Kamera</label>
             <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
             <br>
             <label for="update-harga-produk">Masukkan Harga</label>
             <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
             <br>
             <label for="update-cashback">Cashback</label>
             <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
             <br>
             <label for="update-garansi">Garansi</label>
             <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
             <br>
             <label for="update-free-bonus">Free</label>
             <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
             <br>
             <label for="periode-promo">Periode Promo</label>
             <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
             <br>
             <div class="input-field col s12">
             <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
             <label for="keterangan">Keterangan</label>
           </div>
           <br>
           <div class="input-field col s12">
             <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
             <label for="spesifikasi">Spesifikasi</label>
           </div>
           <div class="input-field col s12">
               <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
               <label for="isibox">Isi Box</label>
             </div>
              <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                <i class="material-icons right">send</i>
              </button>
             </form>
          </div>  
          `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
      // UPDATE DIBAWAH INI        
      db.collection('baterai').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
        // UPDATE DIBAWAH INI         
        db.collection('baterai').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}
// RENDER BATERAI LENSA ENDING  

function renderCardCase(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
       <div class="collapsible-header">
          <span class="left col s12">${doc.data().nama}</span>
       </div>
       <div class="center-align collapsible-body">
            
            <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
            <br>
            <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
            <a  class=" btn-small disabled delete" href="#" >Delete</a>
            <br>
            <br>

            <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
            <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
            <!-- Modal Structure -->
            <div id="modal1${doc.id}" class="modal">
              <div class="modal-content">
                <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
              </div>
              <div class="modal-footer">
                <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
              </div>
            </div>
            
            <!-- Modal Structure -->
            <div id="modal2${doc.id}" class="modal">
            <div class="modal-content">
              <div class="isibox${doc.id}">${newIsibox}</div>
            </div>
            <div class="modal-footer">
              <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
            </div>
          </div>      
       `;



  la.innerHTML = `
       <div class="modal" id="updatemodal${doc.id}">
          <form id="${doc.id}form">
           <label for="update-nama-produk">Nama Kamera</label>
           <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
           <br>
           <label for="update-harga-produk">Masukkan Harga</label>
           <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
           <br>
           <label for="update-cashback">Cashback</label>
           <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
           <br>
           <label for="update-garansi">Garansi</label>
           <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
           <br>
           <label for="update-free-bonus">Free</label>
           <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
           <br>
           <label for="periode-promo">Periode Promo</label>
           <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
           <br>
           <div class="input-field col s12">
           <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
           <label for="keterangan">Keterangan</label>
         </div>
         <br>
         <div class="input-field col s12">
           <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
           <label for="spesifikasi">Spesifikasi</label>
         </div>
         <div class="input-field col s12">
             <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
             <label for="isibox">Isi Box</label>
           </div>
            <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
              <i class="material-icons right">send</i>
            </button>
           </form>
        </div>  
        `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
      // UPDATE DIBAWAH INI        
      db.collection('cardcase').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
        // UPDATE DIBAWAH INI         
        db.collection('cardcase').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderCharger(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
         <div class="collapsible-header">
            <span class="left col s12">${doc.data().nama}</span>
         </div>
         <div class="center-align collapsible-body">
              
              <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
              <br>
              <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
              <a  class=" btn-small disabled delete" href="#" >Delete</a>
              <br>
              <br>
  
              <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
              <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
              <!-- Modal Structure -->
              <div id="modal1${doc.id}" class="modal">
                <div class="modal-content">
                  <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                </div>
                <div class="modal-footer">
                  <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                </div>
              </div>
              
              <!-- Modal Structure -->
              <div id="modal2${doc.id}" class="modal">
              <div class="modal-content">
                <div class="isibox${doc.id}">${newIsibox}</div>
              </div>
              <div class="modal-footer">
                <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
              </div>
            </div>      
         `;



  la.innerHTML = `
         <div class="modal" id="updatemodal${doc.id}">
            <form id="${doc.id}form">
             <label for="update-nama-produk">Nama Kamera</label>
             <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
             <br>
             <label for="update-harga-produk">Masukkan Harga</label>
             <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
             <br>
             <label for="update-cashback">Cashback</label>
             <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
             <br>
             <label for="update-garansi">Garansi</label>
             <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
             <br>
             <label for="update-free-bonus">Free</label>
             <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
             <br>
             <label for="periode-promo">Periode Promo</label>
             <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
             <br>
             <div class="input-field col s12">
             <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
             <label for="keterangan">Keterangan</label>
           </div>
           <br>
           <div class="input-field col s12">
             <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
             <label for="spesifikasi">Spesifikasi</label>
           </div>
           <div class="input-field col s12">
               <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
               <label for="isibox">Isi Box</label>
             </div>
              <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                <i class="material-icons right">send</i>
              </button>
             </form>
          </div>  
          `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
      // UPDATE DIBAWAH INI        
      db.collection('charger').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
        // UPDATE DIBAWAH INI         
        db.collection('charger').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderCleaning(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
           <div class="collapsible-header">
              <span class="left col s12">${doc.data().nama}</span>
           </div>
           <div class="center-align collapsible-body">
                
                <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                <br>
                <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                <a  class=" btn-small disabled delete" href="#" >Delete</a>
                <br>
                <br>
    
                <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                <!-- Modal Structure -->
                <div id="modal1${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                  </div>
                </div>
                
                <!-- Modal Structure -->
                <div id="modal2${doc.id}" class="modal">
                <div class="modal-content">
                  <div class="isibox${doc.id}">${newIsibox}</div>
                </div>
                <div class="modal-footer">
                  <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                </div>
              </div>      
           `;



  la.innerHTML = `
           <div class="modal" id="updatemodal${doc.id}">
              <form id="${doc.id}form">
               <label for="update-nama-produk">Nama Kamera</label>
               <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
               <br>
               <label for="update-harga-produk">Masukkan Harga</label>
               <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
               <br>
               <label for="update-cashback">Cashback</label>
               <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
               <br>
               <label for="update-garansi">Garansi</label>
               <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
               <br>
               <label for="update-free-bonus">Free</label>
               <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
               <br>
               <label for="periode-promo">Periode Promo</label>
               <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
               <br>
               <div class="input-field col s12">
               <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
               <label for="keterangan">Keterangan</label>
             </div>
             <br>
             <div class="input-field col s12">
               <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
               <label for="spesifikasi">Spesifikasi</label>
             </div>
             <div class="input-field col s12">
                 <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                 <label for="isibox">Isi Box</label>
               </div>
                <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                  <i class="material-icons right">send</i>
                </button>
               </form>
            </div>  
            `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
      // UPDATE DIBAWAH INI        
      db.collection('cleaning').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
        // UPDATE DIBAWAH INI         
        db.collection('cleaning').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderDryBox(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
      // UPDATE DIBAWAH INI        
      db.collection('drybox').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
        // UPDATE DIBAWAH INI         
        db.collection('drybox').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderFilterUv(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('filteruv').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('filteruv').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderKabelData(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('kabeldata').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('kabeldata').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderActionCamAcc(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('actioncamacc').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('actioncamacc').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderKertasInstax(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('kertasinstax').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('kertasinstax').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderLeatherCase(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('leathercase').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('leathercase').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderLampuFlash(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('lampuflash').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('lampuflash').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderLampuVideo(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('lampuvideo').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('lampuvideo').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderLensCap(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('lenscap').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('lenscap').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderLensHood(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('lenshood').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('lenshood').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderMemoryCard(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('memorycard').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('memorycard').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderMicrophone(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('microphone').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('microphone').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderTaliStrap(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('talistrap').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('talistrap').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderTasKamera(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('taskamera').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('taskamera').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderAntiGores(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form id="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('antigores').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll('#' + doc.id + 'form');
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('antigores').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}

function renderTripod(doc) {
  let li = document.createElement('li');
  let la = document.createElement('div');
  let edit = document.createElement('a');
  edit.href = '#updatemodal' + doc.id;
  edit.id = 'helo' + doc.id;

  edit.className = "col s2 btn-small disabled edit modal-trigger";
  edit.style.display = "none";
  edit.textContent = 'edit';
  li.className = 'loaded-data';
  li.setAttribute('data-id', doc.id);

  let hargaInput = doc.data().harga;
  let numHargaInput = Number(hargaInput);


  var free = new Object();
  free['Free'] = doc.data().free;
  free['Periode Promo'] = doc.data().periode;
  free['Garansi'] = doc.data().periode;
  free['Info'] = doc.data().keterangan;




  // Mengambil data sebagai objek untuk keperluan CASH
  var objek = new Object();
  objek['Produk'] = doc.data().nama;
  objek['Harga'] = Number(doc.data().harga);
  objek['Cashback'] = Number(doc.data().cashback);
  objek['Harga Spesial'] = world();
  objek['Free'] = doc.data().free;
  objek['Periode Promo'] = doc.data().periode;
  objek['Garansi'] = doc.data().garansi;
  objek['Info'] = doc.data().keterangan;

  // Memunculkan Harga Spesial
  function world() {
    if (objek['Cashback'] !== 0) {
      return objek['Harga'] - objek['Cashback']
    } else if (objek['Cashback'] == 0) {
      return objek['Harga Spesial'] = '';
    } else {
      return 0 // Memunculkan 0 == Tidak ditampilkan karena sudah dirumuskan dibawah
    }
  }

  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga
  if (objek['Harga'] === objek['Harga Spesial']) {
    objek['Harga Spesial'] = 0
  }
  // MEMPERBAIKI HASIL DARI JIKA HARGA CASHBACK = 0 JADI TAMPILAN YANG DITAYANG CUKUP SATU YAITU Harga



  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR
  objek['Harga'] = objek['Harga'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Harga Spesial'] = objek['Harga Spesial'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  objek['Cashback'] = objek['Cashback'].toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // MEMBERI TANDA KOMA UNTUK HASIL BILANGAN YANG DI PRINT KELUAR

  let newSpesifikasi = doc.data().spesifikasi.split(",").join("<br>");
  let newIsibox = doc.data().isibox.split(",").join("<br>");


  li.innerHTML = `
             <div class="collapsible-header">
                <span class="left col s12">${doc.data().nama}</span>
             </div>
             <div class="center-align collapsible-body">
                  
                  <div class="konten2${doc.id}"></div> <!-- INFO HARGA CASH YANG BISA DI COPAS -->
                  <br>
                  <a id="copycash${doc.id}"class="light-blue darken-4 waves-effect waves-light btn-small">Copy Cash</a>
                  <a  class=" btn-small disabled delete" href="#" >Delete</a>
                  <br>
                  <br>
      
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal1${doc.id}">Spec</a>
                  <a class="light-blue darken-4 waves-effect waves-light btn modal-trigger btn-small" href="#modal2${doc.id}">Isi Box</a>
                  <!-- Modal Structure -->
                  <div id="modal1${doc.id}" class="modal">
                    <div class="modal-content">
                      <div class="spesifikasi${doc.id}">${newSpesifikasi}</div>
                    </div>
                    <div class="modal-footer">
                      <a  class="modal-close waves-effect waves-green btn-flat" id="copyspesifikasi${doc.id}">Copy</a>
                    </div>
                  </div>
                  
                  <!-- Modal Structure -->
                  <div id="modal2${doc.id}" class="modal">
                  <div class="modal-content">
                    <div class="isibox${doc.id}">${newIsibox}</div>
                  </div>
                  <div class="modal-footer">
                    <a  class="modal-close waves-effect waves-green btn-flat" id="copyisibox${doc.id}">Copy</a>
                  </div>
                </div>      
             `;



  la.innerHTML = `
             <div class="modal" id="updatemodal${doc.id}">
                <form class="${doc.id}form">
                 <label for="update-nama-produk">Nama Kamera</label>
                 <input type="text" placeholder="Nama Kamera" id="update-nama-produk${doc.id}" value="${doc.data().nama}" required>
                 <br>
                 <label for="update-harga-produk">Masukkan Harga</label>
                 <input type="text" placeholder="Masukkan Harga" id="update-harga-produk${doc.id}" value="${doc.data().harga}" required>
                 <br>
                 <label for="update-cashback">Cashback</label>
                 <input type="text" placeholder="Cashback" id="update-cashback${doc.id}" value="${doc.data().cashback}" >
                 <br>
                 <label for="update-garansi">Garansi</label>
                 <input type="text" placeholder="Garansi" id="update-garansi${doc.id}"  value="${doc.data().garansi}">
                 <br>
                 <label for="update-free-bonus">Free</label>
                 <input type="text" placeholder="Free" id="update-free-bonus${doc.id}" value="${doc.data().free}">
                 <br>
                 <label for="periode-promo">Periode Promo</label>
                 <input type="text" placeholder="Periode Promo" id="periode-promo${doc.id}" value="${doc.data().periode}">
                 <br>
                 <div class="input-field col s12">
                 <textarea id="keterangan${doc.id}" class="materialize-textarea" >${doc.data().keterangan}</textarea>
                 <label for="keterangan">Keterangan</label>
               </div>
               <br>
               <div class="input-field col s12">
                 <textarea id="spesifikasi${doc.id}" class="materialize-textarea">${doc.data().spesifikasi}</textarea>
                 <label for="spesifikasi">Spesifikasi</label>
               </div>
               <div class="input-field col s12">
                   <textarea id="isibox${doc.id}" class="materialize-textarea" >${doc.data().isibox}</textarea>
                   <label for="isibox">Isi Box</label>
                 </div>
                  <button id="${doc.id}click" class="right light-blue darken-4 btn waves-effect waves-light" type="submit" name="action">Update
                    <i class="material-icons right">send</i>
                  </button>
                 </form>
              </div>  
              `;

  elementul.appendChild(li);
  elementul.appendChild(edit);
  elementul.appendChild(la);

  // MODAL ISI BOX DAN SPESIFIKASI
  var elems = document.querySelectorAll('.modal');
  var el;
  for (el = 0; el < elems.length; el++) {
    var instances = M.Modal.init(elems[el]);
  }


  // MERENDER HARGA CASH YANG BISA DI COPY PASTE
  for (const property in objek) {
    if (`${objek[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${objek[property]}`)
    let idbaru = document.querySelector('.konten2' + doc.id);
    if (typeof objek[property] == Number) {
      return objek[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} : ${objek[property]} <br>`
  }
  // MERENDER HARGA CASH YANG BISA DI COPY PASTE ENDING


  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN START
  for (const property in free) {
    if (`${free[property]}` == 0) {
      continue;
    }
    // console.log(`${property}: ${free[property]}`)
    let idbaru = document.querySelector('.konten4' + doc.id);
    if (typeof free[property] == Number) {
      return free[property].toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    idbaru.innerHTML += `${property} ${objek[property]} <br>`
  }
  // MERENDER FREE BONUS TEPAT DIBAWAH ANGSURAN ENDING




  // TOMBOL COPY CASH #1
  let copyCash = document.querySelector('#copycash' + doc.id);
  copyCash.addEventListener('click', function (e) {
    var text = document.querySelector(".konten2" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL COPY #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copySpec = document.querySelector('#copyspesifikasi' + doc.id);
  copySpec.addEventListener('click', function (e) {
    var text = document.querySelector(".spesifikasi" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING

  // TOMBOL COPY SPESIFIKASI #1
  let copyBox = document.querySelector('#copyisibox' + doc.id);
  copyBox.addEventListener('click', function (e) {
    var text = document.querySelector(".isibox" + doc.id);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
  });
  // TOMBOL SPESIFIKASI #1 ENDING



  // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)
  let del = document.querySelectorAll('.delete');
  let x;
  for (x = 0; x < del.length; x++) {
    del[x].addEventListener('click', (e) => {
      e.stopPropagation();
      // Mendapatkan data target dari ID yang diklik
      let id = e.target.parentElement.parentElement.getAttribute('data-id');
// UPDATE DIBAWAH INI        
      db.collection('tripod').doc(id).delete().then(function () {
        window.location.reload(true);
      });;
    });
  } // HAPUS PRODUK DARI DATABASE (BUKAN REAL TIME)


  //  KLIK TO EDIT DI PRODUK SATUAN
  let editt = document.querySelectorAll('#helo' + doc.id);
  let t;
  for (t = 0; t < editt.length; t++) {
    editt[t].addEventListener('click', function (e) {
      e.preventDefault();
      let modal = document.querySelector('#updatemodal' + doc.id);
      var instance = M.Modal.init(modal)
      instance.open();
    });
    //  KLIK TO EDIT DI PRODUK SATUAN ENDING


    let tombolKlik = document.querySelectorAll(`.form${doc.id}`);
    let tom;
    // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
    for (tom = 0; tom < tombolKlik.length; tom++) {
      tombolKlik[tom].addEventListener('submit', function (e) {
        e.preventDefault()

        let nama = document.querySelector('#update-nama-produk' + doc.id).value;
        let harga = document.querySelector('#update-harga-produk' + doc.id).value;
        let cashback = document.querySelector('#update-cashback' + doc.id).value;
        let garansi = document.querySelector('#update-garansi' + doc.id).value;
        let free = document.querySelector('#update-free-bonus' + doc.id).value;
        let periode = document.querySelector('#periode-promo' + doc.id).value;
        let keterangan = document.querySelector('#keterangan' + doc.id).value;
        let spesifikasi = document.querySelector('#spesifikasi' + doc.id).value;
        let isibox = document.querySelector('#isibox' + doc.id).value;
        console.log(nama);
// UPDATE DIBAWAH INI         
        db.collection('tripod').doc(doc.id).update({
          nama: nama,
          harga: harga,
          cashback: cashback,
          garansi: garansi,
          free: free,
          periode: periode,
          keterangan: keterangan,
          spesifikasi: spesifikasi,
          isibox: isibox
        }).then(() => {
          let modal = document.querySelector('#updatemodal' + doc.id);
          var instance = M.Modal.init(modal);
          instance.close();
          alert(`Update ${nama} Berhasil`);

        });
      });
    } // UPDATE PRODUK HARGA AMBIL DATA DARI FORM MODAL TERBARU YANG POP UP
  } //  KLIK TO EDIT DI PRODUK SATUAN
}
// PILIH MENU UTAMA 
function pilihMenu() {
  let pilihKategori = document.querySelector('#pilihmenu').value;
  if (pilihKategori == 'kamera') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') { // ORIGINAL

          renderKamera(change.doc);

        } // ORIGINAL
        else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'lensa') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderLensa(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'gimbal') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderGimbal(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'drone') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderDrone(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'adapterlensa') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderAdapterLensa(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'baterai') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderBaterai(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'cardcase') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderCardCase(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'charger') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderCharger(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'cleaning') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderCleaning(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'drybox') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderDryBox(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'filteruv') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderFilterUv(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'kabeldata') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderKabelData(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'actioncamacc') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderActionCamAcc(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'kertasinstax') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderKertasInstax(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'leathercase') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderLeatherCase(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'lampuflash') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderLampuFlash(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'lampuvideo') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderLampuVideo(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'lenscap') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderLensCap(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'lenshood') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderLensHood(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'memorycard') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderMemoryCard(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'microphone') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderMicrophone(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'talistrap') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderTaliStrap(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'taskamera') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderTasKamera(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'antigores') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderAntiGores(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  } else if (pilihKategori == 'tripod') {
    // Real Time Penarik Data

    db.collection(pilihKategori).orderBy('nama').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type == 'added') {

          renderTripod(change.doc);

        } else if (change.type == 'removed') {
          let li = daftarHarga.querySelector('[data-id=' + change.doc.id + ']');
          daftarHarga.removeChild(li);

        }
      });
    });
    // // Real Time Penarik Data ENDING
  }
} // PILIH MENU UTAMA  ENDING


// KOLOM PENCARI PRODUK / SEARCH BAR
function cariProduk() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("daftar-harga");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("span")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      li[i].nextSibling.style.display = "";
      // b[i].style.display = "";
    } else {
      li[i].style.display = "none";
      li[i].nextSibling.style.display = "none";
      // b[i].style.display = "none";
    }
  }
}
// KOLOM PENCARI PRODUK / SEARCH BAR



function refresh() {
  window.location.reload(true);
}
const contentDiv = document.getElementById('content');
const btnProject = document.getElementById('btn-project');
const btnSertifikat = document.getElementById('btn-sertifikat');

// Fungsi untuk load isi dari file luar
async function loadContent(file) {
  contentDiv.classList.remove('show');
  try {
    const res = await fetch(file);
    const html = await res.text();
    setTimeout(() => {
      contentDiv.innerHTML = html;
      contentDiv.classList.add('show');
    }, 300);
  } catch (err) {
    contentDiv.innerHTML = `<p class="text-red-600">Gagal memuat konten: ${file}</p>`;
  }
}

// Event tombol
btnProject.addEventListener('click', () => {
  loadContent('project.html');
  btnProject.classList.add('text-[#FFA800]', 'border-2', 'border-[#FFA800]',);
  btnProject.classList.remove('text-white',);
  btnSertifikat.classList.remove('text-[#FFA800]', 'border-2', 'border-[#FFA800]',);
  btnSertifikat.classList.add('border-0', 'text-white');
});

btnSertifikat.addEventListener('click', () => {
  loadContent('sertifikat.html');
  btnSertifikat.classList.add('text-[#FFA800]', 'border-2', 'border-[#FFA800]',);
  btnSertifikat.classList.remove('text-white',);
  btnProject.classList.remove('text-[#FFA800]', 'border-2', 'border-[#FFA800]',);
  btnProject.classList.add('border-0', 'text-white');
});

// Tampilkan project pertama kali
loadContent('project.html');
btnProject.classList.add('text-[#FFA800]', 'border-2', 'border-[#FFA800]');


////
const contentGem = document.getElementById("game");
const buttons = document.querySelectorAll(".game-btn");

// Daftar fungsi game
const gameFunctions = {
    puzzlegame,
    boomgame,
    snakegame,
    DuaRibuEmpatLapan // Hapus jika belum ada
};

// Fungsi load game
async function loadGame(file, initFunction) {

    contentGem.classList.remove("show");

    try {

        const res = await fetch(file);
        const html = await res.text();

        setTimeout(() => {

            contentGem.innerHTML = html;
            contentGem.classList.add("show");

            // Jalankan fungsi game setelah HTML selesai dimuat
            if (typeof initFunction === "function") {
                initFunction();
            }

        }, 300);

    } catch (err) {

        contentGem.innerHTML = `
            <p class="text-red-500">
                Gagal memuat ${file}
            </p>
        `;

        console.error(err);
    }
}

// Event semua tombol
buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        // Load game sesuai tombol
        loadGame(
            btn.dataset.file,
            gameFunctions[btn.dataset.init]
        );

        // Reset semua tombol
        buttons.forEach(b => {
            b.classList.remove(
                "text-[#FFA800]",
                "border-2",
                "border-[#FFA800]"
            );

            b.classList.add(
                "text-white",
                "border-0"
            );
        });

        // Aktifkan tombol yang dipilih
        btn.classList.remove(
            "text-white",
            "border-0"
        );

        btn.classList.add(
            "text-[#FFA800]",
            "border-2",
            "border-[#FFA800]"
        );

    });

});

// Load game pertama
loadGame("gpuzzle.html", puzzlegame);

// Aktifkan tombol pertama
if (buttons.length > 0) {
    buttons[0].classList.remove("text-white", "border-0");
    buttons[0].classList.add(
        "text-[#FFA800]",
        "border-2",
        "border-[#FFA800]"
    );
}
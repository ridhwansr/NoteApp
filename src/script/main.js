import "../style/style.css";

const notesData = [
  {
    id: "notes-jT-jjsyz61J8XKiI",
    title: "Welcome to Notes, Dimas!",
    body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
    createdAt: "2022-07-28T10:03:12.594Z",
    archived: false,
  },
  {
    id: "notes-aB-cdefg12345",
    title: "Meeting Agenda",
    body: "Discuss project updates and assign tasks for the upcoming week.",
    createdAt: "2022-08-05T15:30:00.000Z",
    archived: false,
  },
  {
    id: "notes-XyZ-789012345",
    title: "Shopping List",
    body: "Milk, eggs, bread, fruits, and vegetables.",
    createdAt: "2022-08-10T08:45:23.120Z",
    archived: false,
  },
  {
    id: "notes-1a-2b3c4d5e6f",
    title: "Personal Goals",
    body: "Read two books per month, exercise three times a week, learn a new language.",
    createdAt: "2022-08-15T18:12:55.789Z",
    archived: false,
  },
  {
    id: "notes-LMN-456789",
    title: "Recipe: Spaghetti Bolognese",
    body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
    createdAt: "2022-08-20T12:30:40.200Z",
    archived: false,
  },
  {
    id: "notes-QwErTyUiOp",
    title: "Workout Routine",
    body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
    createdAt: "2022-08-25T09:15:17.890Z",
    archived: false,
  },
  {
    id: "notes-abcdef-987654",
    title: "Book Recommendations",
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: "2022-09-01T14:20:05.321Z",
    archived: false,
  },
  {
    id: "notes-zyxwv-54321",
    title: "Daily Reflections",
    body: "Write down three positive things that happened today and one thing to improve tomorrow.",
    createdAt: "2022-09-07T20:40:30.150Z",
    archived: false,
  },
  {
    id: "notes-poiuyt-987654",
    title: "Travel Bucket List",
    body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
    createdAt: "2022-09-15T11:55:44.678Z",
    archived: false,
  },
  {
    id: "notes-asdfgh-123456",
    title: "Coding Projects",
    body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
    createdAt: "2022-09-20T17:10:12.987Z",
    archived: false,
  },
  {
    id: "notes-5678-abcd-efgh",
    title: "Project Deadline",
    body: "Complete project tasks by the deadline on October 1st.",
    createdAt: "2022-09-28T14:00:00.000Z",
    archived: false,
  },
  {
    id: "notes-9876-wxyz-1234",
    title: "Health Checkup",
    body: "Schedule a routine health checkup with the doctor.",
    createdAt: "2022-10-05T09:30:45.600Z",
    archived: false,
  },
  {
    id: "notes-qwerty-8765-4321",
    title: "Financial Goals",
    body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
    createdAt: "2022-10-12T12:15:30.890Z",
    archived: false,
  },
  {
    id: "notes-98765-54321-12345",
    title: "Holiday Plans",
    body: "Research and plan for the upcoming holiday destination.",
    createdAt: "2022-10-20T16:45:00.000Z",
    archived: false,
  },
  {
    id: "notes-1234-abcd-5678",
    title: "Language Learning",
    body: "Practice Spanish vocabulary for 30 minutes every day.",
    createdAt: "2022-10-28T08:00:20.120Z",
    archived: false,
  },
];

class loadindIndikator extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="loading-overlay">
            <div class="loading-text">Loading...</div>
        </div>
        `;
  }
}

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
            <header>
                <h1>All Note Cards</h1>
            </header>
        `;
  }
}

class FooterComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
            <footer>
                <h1>Note Apps by Ridhwan</h1>
            </footer>
        `;
  }
}

class asideAddNote extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <aside>
            <div class="add-note">
                <img src="img/add.png" alt="Add Note">
            </div>
        </aside>`;
  }
}

class popupAddNote extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
        <div class="popup">
        <form id="addNote">
            <div class="popup-content">
                <span class="close-popup" id="close-popup">&times;</span>
                <h2>Add New Note</h2>
                <input type="text" id="note-title" placeholder="Judul">
                <textarea id="note-body" placeholder="Catatan"></textarea>
                <button id="save-note">Save</button>
            </div>
            </form>
        </div>`;
    this.querySelector("#addNote").addEventListener(
      "submit",
      this.onSubmit.bind(this),
    );
  }

  async onSubmit(event) {
    event.preventDefault();
    // Memperbaiki pengecekan kondisi pada input noteBody
    const noteTitle = this.querySelector("#note-title").value;
    const noteBody = this.querySelector("#note-body").value;
    if (!noteTitle || !noteBody) {
      alert("Tolong lengkapi isian input!");
      return;
    }
    const dataNote = {
      title: noteTitle,
      body: noteBody,
    };
    try {
      const response = await insertNote(dataNote);
      console.log("Data ditambahkan ke API : ", response);
      if (response.status === "success") {
        alert("Catatan berhasil ditambah!");
        this.querySelector("#note-title").value = "";
        this.querySelector("#note-body").value = "";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  }
}

customElements.define("loading-indikator", loadindIndikator);
customElements.define("header-component", HeaderComponent);
customElements.define("footer-component", FooterComponent);
customElements.define("aside-add-note", asideAddNote);
customElements.define("popup-add-note", popupAddNote);

const baseUrl = "https://notes-api.dicoding.dev/v2";

async function getNote() {
  try {
    const response = await fetch(`${baseUrl}/notes`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    console.error("Error adding new note to API:", error);
    return [];
  }
}

async function insertNote(notes) {
  try {
    const response = await fetch(`${baseUrl}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "12345",
      },
      body: JSON.stringify(notes),
    });
    if (!response.ok) {
      throw new Error("Failed to add new note to API");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding new note to API:", error);
    alert("Gagal menambahkan catatan. Terjadi kesalahan pada server.");
    throw error;
  }
}

async function removeNote(noteId) {
  try {
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "X-Auth-Token": "12345",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete note from API");
    }
    return true;
  } catch (error) {
    console.error("Error deleting note from API:", error);
    return false;
  }
}

async function renderAllNotes() {
  const notesContainer = document.querySelector(".card-content");
  notesContainer.innerHTML = "";

  try {
    document.querySelector(".loading-overlay").style.display = "flex";

    const dataAPI = await getNote();
    const mergedData = [...notesData, ...dataAPI];

    mergedData.forEach(async (note) => {
      const cardNote = document.createElement("div");
      cardNote.classList.add("card-note");
      cardNote.dataset.id = note.id;
      cardNote.innerHTML = `
                <button id="btn-delete" class="btn-delete">Hapus</button>
                <h3>${note.title}</h3>
                <p>${note.body}</p>`;

      const buttonDelete = cardNote.querySelector("#btn-delete");
      buttonDelete.addEventListener("click", async function () {
        const noteId = note.id;
        const deleteNote = await removeNote(noteId);
        if (deleteNote) {
          cardNote.remove();
        } else {
          console.error("Failed to delete note from API");
        }
      });

      notesContainer.appendChild(cardNote);
    });
  } catch (error) {
    console.error("Error rendering data:", error);

    document.querySelector(".error-overlay").style.display = "block";
  } finally {
    document.querySelector(".loading-overlay").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Panggil getNote di sini untuk memuat catatan saat halaman dimuat
  renderAllNotes();

  // Fungsi untuk menampilkan popup tambah catatan
  const showAddNotePopup = () => {
    const popup = document.getElementById("add-note-popup");
    popup.style.display = "block"; // Menampilkan popup
  };

  // Fungsi untuk menutup popup tambah catatan
  const closeAddNotePopup = () => {
    const popup = document.getElementById("add-note-popup");
    popup.style.display = "none"; // Menyembunyikan popup
  };

  // Event listener untuk tombol "Add Note"
  document
    .getElementById("add-note-button")
    .addEventListener("click", showAddNotePopup);

  // Event listener untuk tombol "Close" pada popup
  document
    .getElementById("close-popup")
    .addEventListener("click", closeAddNotePopup);
});

// Menggunakan Web Component

// (() => {
//     const cardContent = document.querySelector('.card-content');

//     const noteCard = (note) => `
//         <div class="card-note" data-id="${note.id}">
//             <button class="btn-delete">Hapus</button>
//             <h3>${note.title}</h3>
//             <p>${note.body}</p>
//         </div>`;

//     const deleteNote = (event) => {
//         const cardNote = event.target.closest('.card-note');
//         if (cardNote) {
//             const cardId = cardNote.dataset.id; // Mendapatkan ID kartu catatan dari atribut data-id
//             const index = notesData.findIndex(note => note.id === cardId); // Temukan indeks catatan dalam array berdasarkan ID
//             if (index !== -1) {
//                 notesData.splice(index, 1); // Hapus catatan dari array notesData
//                 cardNote.remove(); // Hapus elemen kartu catatan dari DOM
//             }
//         }
//     };

//     // Tambahkan event listener ke cardContent untuk menangani klik pada tombol hapus
//     cardContent.addEventListener('click', (event) => {
//         if (event.target.classList.contains('btn-delete')) {
//             deleteNote(event);
//         }
//     });

//     // Fungsi untuk menampilkan daftar catatan
//     const renderNotes = (notes) => {
//         cardContent.innerHTML = ''; // Kosongkan konten sebelum menambahkan catatan baru
//         notes.forEach((note) => {
//             cardContent.innerHTML += noteCard(note);
//         });
//     };

//     // Fungsi untuk menampilkan popup tambah catatan
//     const showAddNotePopup = () => {
//         const popup = document.getElementById('add-note-popup');
//         popup.style.display = 'block'; // Menampilkan popup
//     };

//     // Fungsi untuk menutup popup tambah catatan
//     const closeAddNotePopup = () => {
//         const popup = document.getElementById('add-note-popup');
//         popup.style.display = 'none'; // Menyembunyikan popup
//     };

//     // Event listener untuk tombol "Add Note"
//     document.getElementById('add-note-button').addEventListener('click', showAddNotePopup);

//     // Event listener untuk tombol "Close" pada popup
//     document.getElementById('close-popup').addEventListener('click', closeAddNotePopup);

//     // Fungsi untuk menambahkan catatan baru
//     const addNewNote = () => {
//         const title = document.getElementById('note-title').value;
//         const body = document.getElementById('note-body').value;

//         // Buat objek catatan baru
//         const newNote = {
//             id: 'notes-' + Math.random().toString(36).substr(2, 9), // ID sementara, bisa diganti dengan logika ID yang sesuai
//             title: title,
//             body: body,
//             createdAt: new Date().toISOString(),
//             archived: false
//         };

//         // Tambahkan catatan baru ke dalam data catatan
//         notesData.push(newNote);

//         // Tampilkan kembali daftar catatan dengan catatan baru
//         renderNotes(notesData);

//         // Tutup popup tambah catatan
//         closeAddNotePopup();
//     };

//     // Event listener untuk tombol "Save" pada popup
//     document.getElementById('save-note').addEventListener('click', addNewNote);

//     // Panggil fungsi untuk menampilkan catatan saat halaman dimuat
//     renderNotes(notesData);
// })();

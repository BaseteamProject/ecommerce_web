
# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
=======
# 🛒 Vue E-Commerce Website (Produk: Website)

## ⚙️ Stack
- **Frontend:** Vue 3 + Vite + Tailwind CSS  
- **State Management:** Pinia  
- **Database & Auth:** Firebase (Firestore + Authentication)  
- **Charts:** ApexCharts  
- **Deployment:** Firebase Hosting  

---

## 👥 Roles
### 🧑‍💼 Admin
- Melihat statistik data penjualan (visualisasi dengan **ApexCharts**)
- CRUD Konten Produk: **judul, deskripsi, link "Beli Sekarang via Dana"**
- Manajemen data produk di tabel visual

### 🧑‍🛍️ Buyer
- Melihat daftar produk (berupa website)
- Membeli produk dengan tombol **“Beli Sekarang via Dana”**
- Login & register untuk mengakses halaman pembelian

---

## 🚀 Fitur Utama
- 🔐 Login & Sign Up (Firebase Authentication)
- 🗃️ Manajemen Produk (CRUD)
- 📈 Dashboard Statistik (ApexCharts)
- 💳 Pembelian langsung via Dana
- 🌙 UI Modern (Tailwind CSS)
- ☁️ Data Realtime (Firebase Firestore)

---

## 📋 To-Do List

### 🧱 1️⃣ Setup Project
- [x] Inisialisasi proyek Vue + Vite  
  ```bash
  npm create vite@latest ecommerce-web -- --template vue
  ```
- [x] Install Tailwind CSS  
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- [x] Install Firebase  
  ```bash
  npm install firebase
  ```
- [x] Install Pinia dan Vue Router  
  ```bash
  npm install pinia vue-router
  ```
- [x] Install ApexCharts  
  ```bash
  npm install apexcharts vue3-apexcharts
  ```
- [ ] Konfigurasi Firebase di `src/firebase.js`

---

### 🔑 2️⃣ Authentication (Login & Sign Up)
- [ ] Halaman `WelcomePage.vue` → tombol Login & Sign Up  
- [ ] `Login.vue` → Firebase Auth (`signInWithEmailAndPassword()`)  
- [ ] `SignUp.vue` → Daftar user + pilih role (admin / buyer)  
- [ ] Simpan role user di Firestore collection `users`  
- [ ] Redirect sesuai role:  
  - Admin → `/dashboard`  
  - Buyer → `/shop`

---

### 🧭 3️⃣ Routing
- [ ] Setup `vue-router`
  ```
  /           → WelcomePage
  /login      → Login
  /signup     → SignUp
  /dashboard  → AdminDashboard
  /shop       → BuyerShop
  ```
- [ ] Tambahkan route guard: hanya Admin bisa ke `/dashboard`

---

### 🛍️ 4️⃣ Buyer Side
**File:** `Shop.vue`  
- [ ] Ambil data produk dari Firestore (`products` collection)
- [ ] Tampilkan produk dalam card grid (Tailwind)
- [ ] Tombol **"Beli Sekarang"** → buka link Dana
- [ ] (Opsional) Simpan pembelian ke Firestore `orders`

---

### 🧑‍💼 5️⃣ Admin Side
**File:** `Dashboard.vue`  
- [ ] CRUD Produk (judul, deskripsi, link Dana)
- [ ] Tabel visual data produk (Tailwind + ApexCharts Table)
- [ ] Statistik visual dengan **ApexCharts**:
  - Jumlah Produk
  - Jumlah Penjualan
  - Grafik tren pembelian mingguan
- [ ] Gunakan grid layout & card component untuk tampilan dashboard

---

### 🎨 6️⃣ UI Components
- [ ] `Navbar.vue` → dinamis (role-based)
- [ ] `ProductCard.vue` → reusable card untuk produk
- [ ] `StatsChart.vue` → wrapper komponen ApexCharts
- [ ] `DataTable.vue` → tabel data produk admin

---

### ☁️ 7️⃣ Firebase Integration
- [ ] Firestore → simpan data produk & user
- [ ] Firebase Auth → login & role
- [ ] Firebase Storage (opsional) → upload gambar produk

---

### 🧩 8️⃣ Styling (Tailwind)
- [ ] Gunakan utility class untuk card & tabel:
  - `rounded-2xl`, `shadow-lg`, `hover:scale-105`, `p-4`
- [ ] Layout responsif grid (2–3 kolom di desktop)
- [ ] Tambahkan **dark mode toggle** opsional

---

### 🚀 9️⃣ Deployment
- [ ] Build project:
  ```bash
  npm run build
  ```
- [ ] Deploy ke Firebase Hosting:
  ```bash
  npm install -g firebase-tools
  firebase login
  firebase init hosting
  firebase deploy
  ```

---

## 📂 Struktur Folder
```
src/
 ├─ assets/
 ├─ components/
 │   ├─ Navbar.vue
 │   ├─ ProductCard.vue
 │   ├─ StatsChart.vue
 │   └─ DataTable.vue
 ├─ pages/
 │   ├─ WelcomePage.vue
 │   ├─ Login.vue
 │   ├─ SignUp.vue
 │   ├─ Dashboard.vue
 │   └─ Shop.vue
 ├─ stores/
 │   └─ productStore.js
 ├─ router/
 │   └─ index.js
 ├─ firebase.js
 └─ App.vue
```

---

## 💡 Tambahan (Opsional)
- [ ] Loader animasi saat fetch data
- [ ] Notifikasi dengan `vue-toastification`
- [ ] Validasi form dengan `vee-validate`
- [ ] Tombol logout di navbar
- [ ] Filter / pencarian produk di Shop page

---

## 🧠 Tips Workflow Developer
1. `git pull origin main` → ambil update terbaru  
2. `git checkout -b feature/<nama-fitur>`  
3. Kerjakan fitur → `git commit -m "Add fitur X"`  
4. `git push origin feature/<nama-fitur>`  
5. Buat **Pull Request** ke `main` di GitHub  
6. Setelah merge → `git checkout main && git pull`

---

## 🪄 Credits
Dibuat oleh tim developer Vue dengan ❤️ menggunakan:
**Vue 3 + Vite + Tailwind + Firebase + ApexCharts**
>>>>>>> a732e08b8f8c3826e98a4c5c37057fb15edb7425

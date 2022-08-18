API DOCUMENTATION

| Method    | Route                                   | Keterangan
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
| GET       | localhost:3000/                         | menampilkan halaman awal program
| GET       | localhost:3000/register                 | menampilkan halaman untuk register akun
| POST      | localhost:3000/register                 | mengirim data registrasi ke database
| GET       | localhost:3000/login                    | menampilkan halaman untuk login akun
| POST      | localhost:3000/login                    | mengirim data halaman login untuk verifikasi masuk program
| GET       | localhost:3000/users                    | menampilkan data halaman awal user
| GET       | localhost:3000/users/ticket             | menampilkan data pesanan tiket
| GET       | localhost:3000/users/profil             | menampilkan data profil pengguna
| GET       | localhost:3000/users/ticket/:imdbId     | menampilkan halaman transaksi tiket
| POST      | localhost:3000/usersticket/:imdbId      | mengirimkan data transaksi pesanan tiket dari halaman transaksi
| GET       | localhost:3000/users/getDataFromDb      | mengirimkan data seat, ticket & movie ke client side
| GET       | localhost:3000/users/detailTicket       | mengirimkan data detailTiket ke client side
| POST      | localhost:3000/users/redeem             | mengirimkan data redeem ke database
| GET       | localhost:3000/api/                     | menampilkan halaman awal admin
| GET       | localhost:3000/api/users                | menampilkan halaman administrasi user
| POST      | localhost:3000/api/users                | mengirimkan data user baru ke database / create user
| GET       | localhost:3000/api/users/update/:id     | menampilkan halaman untuk edit user
| POST      | localhost:3000/api/users/update/:id     | mengirimkan data update user ke database
| GET       | localhost:3000/api/users/:id            | menghapus data user dari database
| GET       | localhost:3000/api/seats                | menampilkan halaman administrasi seat
| POST      | localhost:3000/api/seats                | mengirimkan data seat baru ke database / create seat
| GET       | localhost:3000/api/seats/:id            | menghapus data seat dari database
| GET       | localhost:3000/api/schedules            | menampilkan halaman administrasi schedules
| POST      | localhost:3000/api/schedules            | mengirimkan data schedules baru ke database / create schedules
| GET       | localhost:3000/api/schedules/:id        | menghapus data schedules dari database
| GET       | localhost:3000/api/studios              | menampilkan halaman administrasi studio
| POST      | localhost:3000/api/studios              | mengirimkan data studio baru ke database / create studio
| GET       | localhost:3000/api/studios/update/:id   | menampilkan halaman edit studio / update studio
| POST      | localhost:3000/api/studios/update/:id   | mengirimkan data edit studio ke database
| GET       | localhost:3000/api/studios/:id          | menghapus data studio dari database
| GET       | localhost:3000/api/movies               | menampilkan halaman administrasi movies
| GET       | localhost:3000/api/movies/add           | menampilkan halaman menambah data movie 
| POST      | localhost:3000/api/movies/add           | mengirimkan data movie baru ke database / create movie
| GET       | localhost:3000/api/movies/update/:id    | menampilkan halaman edit movie / update movie
| POST      | localhost:3000/api/movies/update/:id    | mengirimkan data edit movie ke database
| GET       | localhost:3000/api/movies/:id           | menghapus data movie dari database
| GET       | localhost:3000/api/vouchers             | menampilkan halaman data voucher
| POST      | localhost:3000/api/vouchers             | mengirimkan data voucher baru ke database / create voucher
| GET       | localhost:3000/api/vouchers/:id         | menghapus data voucher dari database
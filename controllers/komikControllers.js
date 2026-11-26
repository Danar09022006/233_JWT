const db = require("../models");
const Komik = db.Komik;

function normalizeKomik(body) {
    const judul = body.judul ?? body.title ?? body.nama;
    const pengarang = body.pengarang ?? body.penulis ?? body.author;
    const tahun = body.tahun ?? body.tahunTerbit ?? body.year;
    const sinopsis = body.sinopsis ?? body.deskripsi ?? body.description;
    const data = {};

    if (judul !== undefined) data.judul = judul;
    if (pengarang !== undefined) data.pengarang = pengarang;
    if (tahun !== undefined) data.tahun = tahun;
    if (sinopsis !== undefined) data.sinopsis = sinopsis;

    return data;
}

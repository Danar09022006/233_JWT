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

async function getAllKomik(req, res) {
    try {
        const komik = await Komik.findAll();
        return res.status(200).json({ message: "Berhasil mengambil data komik", data: komik });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getKomikById(req, res) {
    try {
        const komik = await Komik.findByPk(req.params.id);
        if (!komik) {
            return res.status(404).json({ message: "Komik tidak ditemukan" });
        }
        return res.status(200).json({ message: "Berhasil mengambil data komik", data: komik });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function createKomik(req, res) {
    try {
        const data = normalizeKomik(req.body);
        if (!data.judul) {
            return res.status(400).json({ message: "Judul komik wajib diisi" });
        }
        const komik = await Komik.create(data);
        return res.status(201).json({ message: "Komik berhasil ditambahkan", data: komik });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function updateKomik(req, res) {
    try {
        const komik = await Komik.findByPk(req.params.id);
        if (!komik) {
            return res.status(404).json({ message: "Komik tidak ditemukan" });
        }
        await komik.update(normalizeKomik(req.body));
        return res.status(200).json({ message: "Komik berhasil diperbarui", data: komik });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function deleteKomik(req, res) {
    try {
        const komik = await Komik.findByPk(req.params.id);
        if (!komik) {
            return res.status(404).json({ message: "Komik tidak ditemukan" });
        }
        await komik.destroy();
        return res.status(200).json({ message: "Komik berhasil dihapus" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

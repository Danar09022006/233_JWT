module.exports = (sequelize, DataTypes) => {
    const Komik = sequelize.define("Komik", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pengarang: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tahun: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sinopsis: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: "Komiks"
    });

    return Komik;
};
module.exports = (sequelize, type) => {
    return sequelize.define(
        "cat_seccion",
        {
            seccionId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: type.STRING(50),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true
                }
            },
            descripcion: {
                type: type.STRING(300),
            },
            usuario_crea: {
                type: type.INTEGER
            },
            fecha_crea: {
                type: type.DATE,
                allowNull: false,
                defaultValue: type.NOW
            },
            usuario_ult_mod: {
                type: type.INTEGER
            },
            fecha_ult_mod: {
                type: type.DATE
            },
            estadoId: {
                type: type.INTEGER,
                allowNull: false,
                defaultValue: 1,
                references: {
                    model: "cat_estado",
                    key: "estadoId",
                }
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
        }
    );
};

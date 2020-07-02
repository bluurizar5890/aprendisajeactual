module.exports = (sequelize, type) => {
    return sequelize.define(
        "usuario",
        {
            usuarioId: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            personaId: {
                type: type.INTEGER,
                references: {
                    model: "persona",
                    key: "personaId",
                }
            },
            user_name: {
                type: type.STRING(50),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: type.STRING(300),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                type: type.STRING(150),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isEmail: true
                }
            },
            usuario_crea: {
                type: type.INTEGER
            },
            fecha_crea: {
                type: type.DATEONLY,
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

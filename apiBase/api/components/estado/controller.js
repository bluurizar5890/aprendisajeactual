const { Estado } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');

const Modelo = Estado;
const tabla = 'cat_estado';
let response = {};

const insert = async (req) => {
    const result = await Modelo.create(req.body);
    response.code = 0;
    response.data = result;
    return response;
}

const list = async (req) => {
    response.code = 0;
    response.data = await Modelo.findAll({ where: { activo: true } });
    return response;
}

const update = async (req) => {
    const { estadoId } = req.body;
    const dataAnterior = await Modelo.findOne({
        where: { estadoId }
    });


    if (dataAnterior) {
        const resultado = await Modelo.update(req.body, {
            where: {
                estadoId
            }
        });
        if (resultado > 0) {
            await registrarBitacora(tabla, estadoId, dataAnterior.dataValues, req.body);
            response.code = 0;
            response.data = "Información Actualizado exitosamente";
            return response;
        } else {
            response.code = -1;
            response.data = "No existen cambios para aplicar";
            return response;
        }
    } else {
        response.code = -1;
        response.data = "No existe información para actualizar con los parametros especificados";
        return response;
    }
};

module.exports = {
    list,
    insert,
    update
}
const { DatoExtraPersona } = require('../../../store/db');
const { registrarBitacora } = require('../../../utils/bitacora_cambios');
const moment = require('moment');
const Modelo = DatoExtraPersona;
const tabla = 'dato_extra_persona';
let response = {};


const insert = async (req) => {
    let { usuarioId } = req.user;
    req.body.usuario_crea = usuarioId;
    const result = await Modelo.create(req.body);
    response.code = 0;
    response.data = result;
    return response;
}


const list = async (req) => {
    if (!req.query.id && !req.query.estadoId && !req.query.personaId && !req.query.tiposangreId && !req.query.estadocivilId) {
        response.code = 0;
        response.data = await Modelo.findAll();
        return response;
    }

    const { id, estadoId,personaId,tiposangreId,estadocivilId} = req.query;
    let query = {};
    if (estadoId) {
        let estados = estadoId.split(';');
        let arrayEstado = new Array();
        estados.map((item) => {
            arrayEstado.push(Number(item));
        });
        query.estadoId = arrayEstado;
    }
    if(personaId){
        query.personaId=personaId;
    }

    if(tiposangreId){
        query.tipo_sangreId=tiposangreId;
    }

    if(estadocivilId){
        query.estado_civilId=estadocivilId;
    }

    if (!id) {
        response.code = 0;
        response.data = await Modelo.findAll({ where: query});
        return response;
    } else {
        if (Number(id) > 0) {
            query.dato_extra_personaId = Number(id);
            response.code = 0;
            response.data = await Modelo.findOne({ where: query });
            return response;
        } else {
            response.code = -1;
            response.data = "Debe de especificar un codigo";
            return response;
        }
    }
}

const update = async (req) => {
    const { dato_extra_personaId } = req.body;
    const dataAnterior = await Modelo.findOne({
        where: { dato_extra_personaId }
    });


    if (dataAnterior) {
        let { usuarioId } = req.user;
        req.body.usuario_ult_mod = usuarioId;
        const resultado = await Modelo.update(req.body, {
            where: {
                dato_extra_personaId
            }
        });
        if (resultado > 0) {
            await registrarBitacora(tabla, dato_extra_personaId, dataAnterior.dataValues, req.body);

            //Actualizar fecha de ultima modificacion
            let fecha_ult_mod = moment(new Date()).format('YYYY/MM/DD HH:mm');
            const data = {
                fecha_ult_mod
            }
            const resultadoUpdateFecha = await Modelo.update(data, {
                where: {
                    personaId
                }
            });

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
    update,
    insert
}
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password:'1234',
    database:'bancosolar',
    host:'localhost',
    port:5432
})

const getUsuarios = async () => {
    const result = await pool.query("select * from usuarios;")
    return result;
  };

const getTransferencias = async () => {
    const consulta = {
        rowMode: 'Array',
        text:"select emisor.nombre emisor,receptor.nombre receptor,monto,fecha from transferencias t join usuarios emisor on t.emisor= emisor.id join usuarios receptor on t.receptor = receptor.id;",
    }
    try{
        const result = await pool.query(consulta)
        return result;
    } catch (error) {
        console.log(error);
        return error
    }
}

const insertUsuario = async (data) => {
    const consulta = {
        text:`insert into usuarios (nombre,balance) values ($1,$2)`,
        values: Object.values(data),
    }
    try {
        const result = await pool.query(consulta);
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

const updateUsuario = async (data) => {
    const consulta = {
        text:`update usuarios set nombre = $2, balance = $3 where id = $1`,
        values: data,
    }
    try {
        const result = await pool.query(consulta);
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

const deleteUsuario = async (data) => {
    const consulta = {
        text:`delete from usuarios where id = $1`,
        values: Object.values(data),
    }
    try {
        const result = await pool.query(consulta);
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

const insertTransferencia = async (data) => {
    const values = Object.values(data)
    const insertaTransferencia = {
        text:`insert into transferencias (emisor,receptor,monto,fecha) 
        values ((select id from usuarios where nombre = $1),
        (select id from usuarios where nombre = $2),
        $3,current_timestamp);`,
        values:[values[0],values[1],values[2]],
    }

    const updateMontoTransferido = {
        text:"update usuarios set balance = balance - $1 where nombre = $2;",
        values:[Number(values[2]),values[0]],
    }

    const updateMonteRecibido = {
        text:"update usuarios set balance = balance + $1 where nombre = $2;",
        values:[Number(values[2]),values[1]],
    }
    try {
        await pool.query('begin')
        await pool.query(insertaTransferencia)
        await pool.query(updateMontoTransferido)
        await pool.query(updateMonteRecibido)
        await pool.query('commit')
        return true

    } catch (error) {
        console.log(error)
        await pool.query('rollback')
        return error
    }
}

module.exports = { getUsuarios,getTransferencias, insertUsuario,updateUsuario,deleteUsuario,insertTransferencia};

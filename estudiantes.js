const { conectarBD, desconectarBD } = require('./db');

async function nuevo(datos) {
  const client = await conectarBD();

  try {
    const query = `
        INSERT INTO estudiantes (nombre, rut, curso, nivel)
        VALUES ($1, $2, $3, $4)
    `;

    const values = [datos.nombre, datos.rut, datos.curso, datos.nivel];
    await client.query(query, values);

    console.log('Estudiante registrado correctamente.');
  } catch (error) {
    console.error('Error al registrar estudiante:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await desconectarBD();
  }
}

async function rut(rut) {
  const client = await conectarBD();

  try {
    const query = `
        SELECT nombre, rut, curso, nivel
        FROM estudiantes
        WHERE rut = $1
    `;

    const values = [rut];
    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      console.log('Estudiante no encontrado.');
      return null;
    }

    console.log('Estudiante encontrado:');
    return result.rows;
  } catch (error) {
    console.error('Error al obtener estudiante por rut:', error);
    return null;
  } finally {
    await desconectarBD();
  }
}

async function consulta() {
  const client = await conectarBD();

  try {
    const query = 'SELECT * FROM estudiantes';
    const result = await client.query(query);

    if (result.rows.length === 0) {
      console.log('No hay estudiantes registrados.');
      return [];
    }

    const estudiantes = result.rows.map(row => ({
      nombre: row.nombre,
      rut: row.rut,
      curso: row.curso,
      nivel: row.nivel,
    }));

    console.log('Estudiantes registrados:');
    console.log('Total de estudiantes:', estudiantes);

    return estudiantes;
  } catch (error) {
    console.error('Error al listar estudiantes:', error);
    return [];
  } finally {
    await desconectarBD();
  }
}

async function editar(datos) {
  const client = await conectarBD();

  try {
    const query = `
      UPDATE estudiantes
      SET nombre = $1, curso = $2, nivel = $3
      WHERE rut = $4
    `;

    const values = [datos.nuevoNombre, datos.nuevoCurso, datos.nuevoNivel, datos.rut];
    const result = await client.query(query, values);

    if (result.rowCount > 0) {
      console.log('Estudiante actualizado correctamente.');
    } else {
      console.log('Estudiante no encontrado para actualizar.');
    }
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
  } finally {
    await desconectarBD();
  }
}

async function eliminar(rut) {
  const client = await conectarBD();

  try {
    const query = `
      DELETE FROM estudiantes
      WHERE rut = $1
    `;

    const values = [rut];
    const result = await client.query(query, values);

    if (result.rowCount > 0) {
      console.log('Estudiante eliminado correctamente.');
    } else {
      console.log('Estudiante no encontrado para eliminar.');
    }
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
  } finally {
    await desconectarBD(client);
  }
}

module.exports = {
  nuevo,
  rut,
  consulta,
  eliminar,
  editar,
};

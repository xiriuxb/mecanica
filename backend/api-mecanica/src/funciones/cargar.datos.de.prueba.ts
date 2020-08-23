import * as fs from 'fs';

export async function CargarDatos(path, service) {
  try {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        err ? reject(err) : resolve(service.crear(JSON.parse(data)));
      });
    });
  } catch (e) {
    console.error(e);
  }
}

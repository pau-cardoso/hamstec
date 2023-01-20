import { htmlStyles } from "./CotizacionStyles";
var moment = require('moment');

export default function getSummaryPDF(tableHtml) {
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const today = moment();
  const dateString = today.date() + " de " + meses[today.month()] + " de " + today.year();

  const html = `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Resumen de dispositivos</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./Cotizacion.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <style>${htmlStyles}</style>
      </head>
      <body>
        <div class="d-flex page align-items-center  flex-column px-5 pt-3 pb-4">
          <div class="d-flex flex-column  flex-grow-1 align-self-center align-items-center w-100">
            <div class="subtitle">Nombre del proyecto - Cliente</div>
            <div class="subtitle">Código - ${dateString}</div>
            <table class="table table-sm">
              <tr class="section-header">
                <th>Marca</th>
                <th>Clave</th>
                <th>Dispositivo</th>
                <th>Instalado</th>
                <th>Contratado</th>
                <th>Diferencia</th>
                <th>Estado</th>
              </tr>
              ${tableHtml}
            </table>
          </div>
        </div>
        <script src="" async defer></script>
      </body>
    </html>
  `;
  return html;
}
import { htmlStyles } from "./CotizacionStyles";
var moment = require('moment');

export default function getQuotePDF(PRODUCT_DATA, QUOTE_DATA, PROJECT_DATA) {
  const {total, anticipo, instalacion} = QUOTE_DATA;
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  let productTable = "", sectionProducts = "", totalProducts = 0;
  const today = moment();
  const dateString = today.date() + " de " + meses[today.month()] + " de " + today.year();

  PRODUCT_DATA.forEach(section => {
    if (section.data.length > 1) {
      productTable += `<tr class="section-header"><th colspan="4">${section.name}</th></tr>`;
      let sectionCount = 0;
      section.data.forEach(product => {
        if (product.product != null) {
          productTable += `
          <tr class="data">
          <!-- for header in headers -->
          <td></td>
          <td>${product.zone}</td>
          <td>${product.product.name}</td>
          <td>${product.quantity}</td>
          </tr>`
          ;
          totalProducts += product.quantity;
          sectionCount += product.quantity;
        }
      });
      sectionProducts += `
        <tr class="data">
          <td>${section.name}</td>
          <td>${sectionCount}</td>
        </tr>
      `;
      sectionCount = 0;
    }
  });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Cotizacion</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./Cotizacion.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <style>
          ${htmlStyles}
        </style>
      </head>
      <body>
        <div class="page align-items-center justify-content-center flex-column px-5 py-5">
          <div class="d-flex flex-column justify-content-evenly flex-grow-1 align-self-center align-items-center">
            <img src="https://i.postimg.cc/HxN3dQhw/hamstec-logo.png" width="250px">
            <div class="d-flex flex-column align-items-center">
              <div class="h1">Presupuesto de</div>
              <div class="h1">Automatización Residencial</div>
            </div>
          </div>
          <div class="cliente justify-content-end d-flex align-self-end flex-column">
            <div> ${PROJECT_DATA.client.name} </div>
            <div>Referencia: 0678_01_RÍO 68</div>
          </div>
        </div>
        <div class="d-flex page align-items-center justify-content-center flex-column px-5 pt-3 pb-4">
          <div class="header align-self-start">
            <img src="https://i.postimg.cc/HxN3dQhw/hamstec-logo.png" width="95px">
          </div>
          <div class="flex-grow-1 d-flex flex-column justify-content-center">
            <!-- TODO -->
            <div class="align-self-end">Querétaro,	Qro.	${dateString}</div> <!-- TODO: Fecha -->
            <div> <strong> ${PROJECT_DATA.client.name} </strong> </div>
            <div> <strong>Presente</strong> </div>
            <br>
            <br>
            <br>
            <div>Por medio de la presente le enviamos la <strong>propuesta económica de la Automatización Residencial</strong> que nos
              solicitó en días pasados. Nuestro sistema, al ser Modular, nos da la oportunidad de agregar o eliminar dispositivos.</div>
            <br>
            <div>De	cualquier forma, nos reiteramos a su disposición para cualquier duda o aclaración.</div>
            <br>
            <br>
            <div>Atentamente</div>
            <br>
            <div>D. C. Achille Martin del Campo</div>
          </div>
          <div class="details flex-row w-100">
            <div class="d-flex flex-row justify-content-between pt-1">
              <div> info@hamstec.com.mx </div>
              <div> Tel. (442) 807 2868 </div>
            </div>
          </div>
        </div>
        <div class="d-flex page align-items-center justify-content-center flex-column px-5 pt-3 pb-4 ">
          <div class="header align-self-start">
            <img src="https://i.postimg.cc/HxN3dQhw/hamstec-logo.png" width="95px">
          </div>
          <div class="flex-grow-1 align-self-start w-100">
            <div class="subtitle">Relación de Dispositivos</div>
            <br>
            <table class="table table-borderless table-sm">
              <!-- Only 14 rows for the first page -->
              <tr class="table-header">
                <!-- for header in headers -->
                <th>Área</th>
                <th>Zona</th>
                <th>Observaciones</th>
                <th>Cantidad</th>
              </tr>
              ${productTable}
            </table>
          </div>
          <div class="details flex-row w-100">
            <div class="d-flex flex-row justify-content-between pt-1">
              <div> info@hamstec.com.mx </div>
              <div> Tel. (442) 807 2868 </div>
            </div>
          </div>
        </div>
        <div class="d-flex page align-items-center justify-content-center flex-column px-5 pt-3 pb-4">
          <div class="header align-self-start">
            <img src="https://i.postimg.cc/HxN3dQhw/hamstec-logo.png" width="95px">
          </div>
          <div class="d-flex flex-grow-1 align-items-center w-100 flex-column">
            <div class="align-self-start subtitle">Relación de Dispositivos</div>
            <table class="table table-sm">
              <tr class="section-header">
                <th>Área</th>
                <th>No. dispositivos</th>
              </tr>
              ${sectionProducts}
              <tr class="data">
                <td> <strong>Total de dispositivos</strong> </td>
                <td> <strong>${totalProducts}</strong> </td>
              </tr>
              <tr class="data">
                <td> <strong>TOTAL DEL PROYECTO</strong> </td>
                <td> <strong>${total}</strong> </td>
              </tr>
            </table>
            <!-- Forma de pago -->
            <div class="align-self-start subtitle">Forma de pago</div>
            <table class="table table-sm">
              <tr class="section-header">
                <th>Etapa</th>
                <th>%</th>
                <th>Importe</th>
              </tr>
              <tr class="data">
                <td>Anticipo</td>
                <td>80</td>
                <td>${anticipo}</td>
              </tr>
              <tr class="data">
                <td>Antes de instalación</td>
                <td>20</td>
                <td>${instalacion}</td>
              </tr>
              <tr class="data">
                <td colspan="2">Total</td>
                <td>${total}</td>
              </tr>
            </table>
            <div class="caption align-self-start">
              *Los precios NO incluyen IVA (Impuesto al Valor Agregado)
            </div>
            <div class="caption align-self-start">
              No incluye trabajos eléctricos adicionales, ni viáticos fuera del área metropolitana de Querétaro.
            </div>
            <br>
            <div class="align-self-start">
              Incluye:
              <ul>
                <li>Importación de los dispositivos de Automatización</li>
                <li>Instalación de los dispositivos (conexión eléctrica en sitio)</li>
                <li>Apagadores</li>
                <li>Instalación y Configuración del Hub (Contralador central)</li>
                <li>Programación de Dispositivos y Rutinas</li>
                <li>Definición de nombres de Dispositivos y Rutinas para control por voz</li>
                <li>Instalación de App en celulares</li>
                <li>Manuales de Aplicaciones en formato digital</li>
                <li>Resumen de Cuentas y Contraseñas</li>
                <li>Atención vía Whatsapp o telefónica SIN COSTO en periodo de garantía</li>
                <li>Una visita sin costo para ajuste de Dispositivos/Rutinas en sitio (en periodo de Garantía) </li>
                <li>Instalación y Configuración de Control IR (adquirido con nosotros)</li>
                <li>Instalación y Configuración de Asistentes de Voz (adquirido con nosotros)</li>
              </ul>
            </div>
          </div>
          <div class="details flex-row w-100">
            <div class="d-flex flex-row justify-content-between pt-1">
              <div> info@hamstec.com.mx </div>
              <div> Tel. (442) 807 2868 </div>
            </div>
          </div>
        </div>
        <div class="d-flex page align-items-center justify-content-center flex-column px-5 pt-3 pb-4">
          <div class="header align-self-start">
            <img src="https://i.postimg.cc/HxN3dQhw/hamstec-logo.png" width="95px">
          </div>
          <div class="d-flex flex-grow-1 w-100 flex-column">
            <div class="subtitle">Requerimientos para la instalación</div>
            <div>
              <ul>
                <li>Modem con conexión a internet</li>
                <li>Las chalupas deberán estar empotradas con un mínimo de 1cm. de la superficie de la pared. Chalupa requerida caja cuadrada de 10x10cm</li>
                <li>Circuitos eléctricos sencillos (no escaleras eléctricas o conexiones en puentes)</li>
                <li>Lámparas y luminarias instaladas</li>
                <li>Centro de carga cerrado y funcional (pastillas conectadas y cableado peinado).</li>
              </ul>
            </div>
            <div class="subtitle">Instalación / Tiempo de entrega</div>
            <div>Los dispositivos usualmente tardan de dos a tres semanas para su importación (a partir del pago)</div>
            <div>El periodo de instalación y programación total es de una semana aproximadamente.</div>
            <br>
            <div class="subtitle2">Garantías y Servicios</div>
            <table class="table table-borderless table-sm">
              <tr class="section-header">
                <th>Marca</th>
                <th>Tiempo de Garantía</th>
              </tr>
              <!-- for brand in products -->
              <tr class="data">
                <td>Orvibo</td>
                <td>1 año</td>
              </tr>
              <tr class="data">
                <td>Alexa Echo Dot</td>
                <td>1 año</td>
              </tr>
              <tr>
                <td colspan="2"> *A partir de la fecha de instalación </td>
              </tr>
            </table>

            <div class="subtitle2">Visita Extra</div>
            <div>El costo por visita extra es de $ 500.00 pesos M.N.</div>
          </div>
          <div class="details flex-row w-100">
            <div class="d-flex flex-row justify-content-between pt-1">
              <div> info@hamstec.com.mx </div>
              <div> Tel. (442) 807 2868 </div>
            </div>
          </div>
        </div>
        <script src="" async defer></script>
      </body>
    </html>
  `;
  return html;
}
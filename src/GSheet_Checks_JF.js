import { google } from "googleapis";

// Ajuste la ruta y nombre al archivo JSON de credencial:
const auth = new google.auth.GoogleAuth({
  keyFile: "./src/Credenciales/g_andivi_inventario.json", // ← Aquí debe ir la ruta real a su archivo
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// Ponga aquí el ID real de su Google Sheet (de la URL, como vimos antes):
const spreadsheetId = "1NFIsGw9iv33wuEYkHQIVZjLFmtX7bTvfxNCQuRKu1SM"; 

// Ajuste el rango según el nombre de la pestaña y columnas:
const range = "Inventario!A:E"; 





//FUNCION PRUEBA LEE EL INVENTARIO TODAS LAS COLUMNAS A-E
async function leerInventario() {
  try {
    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    console.log("Datos leídos:", res.data.values);
  } catch (error) {
    console.error("Error leyendo la hoja:", error.message);
  }
}




///////////////////////////////////////////////////////////////////////////////
//FUNCION PRUEBA ACTUALIZAR INVENTARIO (BUSCA CODIGO DE PRODUCTO) O AGREGA NUEVO

async function actualizarProducto({ codigo, producto, precio, existencia, estante, fechaVenta, ticket }) {
  const range = "Inventario!A:I";
  // 1. Leer datos existentes
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const rows = res.data.values || [];
  let actualizado = false;
  var nuevoCodigo = null;

  //Buscar coincidencia y actualizar 
for (let i = 0; i < rows.length; i++) {
  if (rows[i][0] === codigo) {
    if (producto !== undefined && producto !== null)          rows[i][1] = producto;
    if (precio !== undefined && precio !== null)              rows[i][2] = precio;
    if (existencia !== undefined && existencia !== null)      rows[i][3] = existencia;
    if (estante !== undefined && estante !== null)            rows[i][4] = estante;
    if (fechaVenta !== undefined && fechaVenta !== null)      rows[i][5] = fechaVenta;
    if (ticket !== undefined && ticket !== null)              rows[i][6] = ticket;
    actualizado = true;
    break;
  }
}



// Si agrega una nueva fila, incluya también el número ordinal automáticamente:
if (!actualizado) {
  nuevoCodigo = (rows.length > 0) 
    ? (parseInt(rows[rows.length-1][0]) + 1)
    : 1;
  rows.push([
    nuevoCodigo,    // columna A (número ordinal)
    producto,       // B
    precio,         // C
    existencia,     // D
    estante,        // E
    fechaVenta,      // F
    ticket          // F
  ]);
}



  // 4. Subir los datos de nuevo
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values: rows },
  });

  return actualizado
    ? `✅ Producto ${codigo} ${producto} actualizado.`
    : `🆕 Producto ${nuevoCodigo} ${producto} agregado al inventario.`;
}

/*
// --- PRUEBA --- //
actualizarProducto({
  codigo: "332",
  producto: "Vaso 12oz Tita",
  precio: undefined,
  existencia: 28,
  estante: "Estante V2",
  fechaVenta: null,
  ticket: null
  }).then(msg => console.log(msg));
  */
//////////////////////////////////////////////////////

//leerInventario();
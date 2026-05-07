//Declaracionese inclusiones de funciones necesarias del BOT
import { addKeyword, utils, EVENTS, MemoryDB } from '@builderbot/bot';

import { google } from "googleapis";

// Ajuste la ruta y nombre al archivo JSON de credencial:
const auth = new google.auth.GoogleAuth({
  keyFile: "./src/Credenciales/g_andivi_inventario.json", // ← Aquí debe ir la ruta real a su archivo
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });


// Ponga aquí el ID real de su Google Sheet (de la URL, como vimos antes):
//const spreadsheetId = "1NFIsGw9iv33wuEYkHQIVZjLFmtX7bTvfxNCQuRKu1SM"; 

// Ajuste el rango según el nombre de la pestaña y columnas:
//const range = "Inventario!A:I"; 



// =====================
// DECLARACIONES AL INICIO DEL ARCHIVO
// =====================

// IDs de Google Sheets
const INVENTARIO_ID = "1NFIsGw9iv33wuEYkHQIVZjLFmtX7bTvfxNCQuRKu1SM"; // ← Pega aquí el ID real de tu sheet de inventario
const VENTAS_ID =     "1En5C67XNa1rJUN1lDMs875KUhmQfhrXfDFfoZvbOi2A";         // ← Pega aquí el ID real de tu sheet de ventas

// Rangos de cada sheet (ajusta según tus columnas/hojas)
const INVENTARIO_RANGE = "Inventario!A:I";
const VENTAS_RANGE = "Pedidos!A:S"; // Cambia la S si tienes más columnas

// Índices de columnas para Inventario
const COLUMNAS_INVENTARIO = {
  codigo: 0,
  producto: 1,
  precio: 2,
  existencia: 3,
  estante: 4,
  fechaVenta: 5,
  ticket: 6
  // Si agregas más columnas, ponlas aquí
};

// Índices de columnas para Ventas
const COLUMNAS_VENTAS = {
  fechaPedido: 0,
  pedidoNum: 1,
  atiende: 2,
  cliente: 3,
  producto: 4,
  detalles: 5,
  whatsapp: 6,
  instagram: 7,
  facebook: 8,
  total: 9,
  anticipo: 10,
  ticketAnticipo: 11,
  liquidacion: 12,
  ticketLiquidacion: 13,
  promesaEntrega: 14,
  diseño: 15,
  fabrica: 16,
  entregado: 17,
  fechaEntrega: 18
};





// FUNCION QUE REGISTRA FUNCIONES PARA QUE SE USEN EN INSTANCIA ACTIVA DEL BOT (SESION DE OPENAI ACTIVA)
export function registrar_funciones_ia(thread) {
 


/////////// 1ERA FUNCION  LEER INVENTARIO COMPLETO////////////////
  //FUNCION PARA OBTENER LECTURA Y VALORES, BUSCAR PRODUCTO, DATOS,, DANDO TODO EL CONTEXTO AL ASSISTANT GPT
  //PERO NO FUNCIONO MUY BIEN YA QUE ES MUCHA INFORMACIONY  AL MENOS EN PRIMERA INSTANCIA
  //EL GPT SUELE OMITIR MUCHA INFORMACION

  //Y si se lo pasamos a IA como contexto (completo o parcial) pues puede analizar esa informacion



//////////////SEGUNDA FUNCION ACTUALIZAR///////////////
thread.registerFunction("actualizarProducto", async ({ codigo_autorizacion, tipoArchivo, productos }) => {
  
  try {
    //Linea que revisa si la entidad actual está autorizada
    //Solo codigo de autorizacion superior Ruth Y o superior
    if (codigo_autorizacion != "778899") {
  return ("Di que el usuario no está autorizado y que puedes ayudarlo con otra cosa."); //Revisamos variable global de entidad permiso
}
    

    let spreadsheetId, range, columnas;

    if (tipoArchivo && tipoArchivo.toLowerCase().includes("ventas")) {
      spreadsheetId = VENTAS_ID;
      range = VENTAS_RANGE;
      columnas = COLUMNAS_VENTAS;
      console.log("ARCHIVO A USAR: VENTAS");
    } else {
      spreadsheetId = INVENTARIO_ID;
      range = INVENTARIO_RANGE;
      columnas = COLUMNAS_INVENTARIO;
      console.log("ARCHIVO A USAR: INVENTARIO");
    }

    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    const rows = res.data.values || [];
    let mensajes = [];

    for (const prod of productos) {
      let actualizado = false;
      let nuevoCodigo = null;

      if (spreadsheetId === VENTAS_ID) {
        console.log("COLUMNAS ACTIVADAS: VENTAS");
        // ACTUALIZA/AGREGA PEDIDO
        let {
          pedidoNum, producto, cliente, atiende, fechaPedido, promesaEntrega, fechaEntrega, detalles,
          whatsapp, instagram, facebook, total, anticipo, ticketAnticipo, liquidacion, ticketLiquidacion,
          diseño, fabrica, entregado
        } = prod;

        for (let i = 0; i < rows.length; i++) {
          if (rows[i][columnas.pedidoNum] === pedidoNum) {
            if (producto !== undefined)             rows[i][columnas.producto] = producto;
            if (cliente !== undefined)              rows[i][columnas.cliente] = cliente;
            if (atiende !== undefined)              rows[i][columnas.atiende] = atiende;
            if (fechaPedido !== undefined)          rows[i][columnas.fechaPedido] = fechaPedido;
            if (promesaEntrega !== undefined)       rows[i][columnas.promesaEntrega] = promesaEntrega;
            if (fechaEntrega !== undefined)         rows[i][columnas.fechaEntrega] = fechaEntrega;
            if (detalles !== undefined)             rows[i][columnas.detalles] = detalles;
            if (whatsapp !== undefined)             rows[i][columnas.whatsapp] = whatsapp;
            if (instagram !== undefined)            rows[i][columnas.instagram] = instagram;
            if (facebook !== undefined)             rows[i][columnas.facebook] = facebook;
            if (total !== undefined)                rows[i][columnas.total] = total;
            if (anticipo !== undefined)             rows[i][columnas.anticipo] = anticipo;
            if (ticketAnticipo !== undefined)       rows[i][columnas.ticketAnticipo] = ticketAnticipo;
            if (liquidacion !== undefined)          rows[i][columnas.liquidacion] = liquidacion;
            if (ticketLiquidacion !== undefined)    rows[i][columnas.ticketLiquidacion] = ticketLiquidacion;
            if (diseño !== undefined)               rows[i][columnas.diseño] = diseño;
            if (fabrica !== undefined)              rows[i][columnas.fabrica] = fabrica;
            if (entregado !== undefined)            rows[i][columnas.entregado] = entregado;
            actualizado = true;
            break;
          }
        }

        if (!actualizado) {
          nuevoCodigo = (rows.length > 0 && rows[rows.length - 1][columnas.pedidoNum])
            ? (parseInt(rows[rows.length - 1][columnas.pedidoNum]) + 1)
            : 1;
          rows.push([
            fechaPedido || "",
            nuevoCodigo,
            atiende || "",
            cliente || "",
            producto || "",
            detalles || "",
            whatsapp || "",
            instagram || "",
            facebook || "",
            total || "",
            anticipo || "",
            ticketAnticipo || "",
            liquidacion || "",
            ticketLiquidacion || "",
            promesaEntrega || "",
            diseño || "",
            fabrica || "",
            entregado || "",
            fechaEntrega || ""
          ]);
        }

        mensajes.push(
          actualizado
            ? `✅ Pedido ${pedidoNum} (${producto}) actualizado en ventas.`
            : `🆕 Pedido ${nuevoCodigo} (${producto}) agregado a ventas.`
        );

      } else {
        console.log("COLUMNAS ACTIVADAS: INVENTARIO");
        // ACTUALIZA/AGREGA PRODUCTO INVENTARIO
        let { codigo, producto, precio, existencia, estante, fechaVenta, ticket } = prod;

        for (let i = 0; i < rows.length; i++) {
          if (rows[i][columnas.codigo] === codigo) {
            if (producto !== undefined)        rows[i][columnas.producto] = producto;
            if (precio !== undefined)          rows[i][columnas.precio] = precio;
            if (existencia !== undefined)      rows[i][columnas.existencia] = existencia;
            if (estante !== undefined)         rows[i][columnas.estante] = estante;
            if (fechaVenta !== undefined)      rows[i][columnas.fechaVenta] = fechaVenta;
            if (ticket !== undefined)          rows[i][columnas.ticket] = ticket;
            actualizado = true;
            break;
          }
        }

        if (!actualizado) {
          nuevoCodigo = (rows.length > 0)
            ? (parseInt(rows[rows.length - 1][columnas.codigo]) + 1)
            : 1;
          rows.push([
            nuevoCodigo,
            producto,
            precio,
            existencia,
            estante,
            fechaVenta,
            ticket
          ]);
        }

        mensajes.push(
          actualizado
            ? `✅ Producto ${codigo} (${producto}) actualizado en inventario.`
            : `🆕 Producto ${nuevoCodigo} (${producto}) agregado al inventario.`
        );
      }
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values: rows }
    });

    return mensajes.join("\n");

  } catch (error) {
    console.error("Error actualizando productos/pedidos:", error.message);
    return "Error actualizando productos/pedidos";
  }
});

/////////////////////FIN SEGUNDA FUNCION ACTUALIZAR /////


//////////////////////////////
//TERCERA FUNCION BUSCAR PRODUCTOS
//////////////////////////
//ESTA ES LA FUNCION FUERTE, QUE PERMITE BUSCAR CON CLARIDAD ENTRE TODOS LOS ELEMENTOS DEL ARCHIVO
//DE GOOGLE SHEET, DANDO RESPUESTAS PRECISAS Y COMPLETAS
//ADEMAS PUEDE SECCIONARSE EN EL INTERIOR PARA DISTINTOS ARCHIVOS O TEMAS
//Y ASI ENFOCARSE EN LOS CAMPOS/COLUMNAS CORRESPONDIENTES A CADA UNO, Y ENVIAR O ANALIZAR LA INFORMACION NECESARIA
//EN UN INICIO POR EJEMPLO, EN EL INTERIOR DE LA FUNCION HAY DISTINCION ENTRE DOS TIPOS DE ARCHIVOS: 
//INVENTARIO(existencias almace) y VENTAS(pedidos)

//Contiene distintas partes de código para detectar adecuadamente o poder filtrar correctamente distintos campos
//como ventas, precios, fechas (que suelen aparecer en distintos formatos)
//Y se le indica como dar la salida y que datos incluir para inventarios, y cuales para ventas. Pensando
//en el uso normal que se le daría.

// =====================
// FUNCIÓN PRINCIPAL BUSCARPRODUCTOS
// Por el momento es funcion de busqueda pero permite buscar en inventarios, pedidos, stocks....
// =====================

thread.registerFunction("buscarProductos", async (params) => {
  try {

    //Linea que revisa si la entidad actual está autorizada
    //Funcion permitida para Ruth X, Ruth Y o superior.

params.codigo_autorizacion && params.codigo_autorizacion.trim() !== ""

    if (params.codigo_autorizacion && params.codigo_autorizacion.trim() !== ""
        && params. codigo_autorizacion != "445566" && params.codigo_autorizacion!= "778899") {
  return ("Di que el usuario no está autorizado y que puedes ayudarlo con otra cosa."); //Revisamos variable global de entidad permiso
}


    // --- LOG INICIAL ---
    console.log("=====[buscarProductos]=====");
    console.log("Argumentos recibidos:", params);

    //////ELIGE SI CONSULTAR ARCHIVO INVENTARIO O VENTAS
    let tipoArchivo = "inventario"; // default

    const ventasPalabrasClave = [
      "pendiente", "fabricación", "fabricado", "diseño", "diseñado", "fábrica", "fabricar", "entregado", "proceso"
    ];

    function contienePalabraClave(valor) {
      if (!valor || typeof valor !== "string") return false;
      return ventasPalabrasClave.some(clave =>
        valor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(
          clave.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        )
      );
    }


    //Si el parametro tipoArchivo recibido es un String entonces....
    //Lo que pasa es que en el parametro tipoArchivo (recibido desde assistant AI GPT) se le dice
    //Si la funcion va para inventarios o ventas (o podrian ser otros, digamos => clientes potenciales, promociones, videos, nomina, cursos, inscripciones, etc...)
    if (
      params.tipoArchivo &&
      typeof params.tipoArchivo === "string"
    ) {
      const archivoParam = params.tipoArchivo.toLowerCase();
      if (archivoParam.includes("inventario")) {     //Si el parametro incluye inventario entonces determinamos como tal.
        tipoArchivo = "inventario";
      } else if (archivoParam.includes("venta")) {  //Si el parametro incluye venta entonces determinamos como tal.
        tipoArchivo = "ventas";
      }                                           //O bien, si contiene alguna palabra importane de las siguientes.....
    } else if (
      (params.cliente && params.cliente.trim() !== "") ||
      (params.anticipo !== undefined && params.anticipo !== null && params.anticipo !== "") ||
      (params.whatsapp && params.whatsapp.trim() !== "") ||
      (params.liquidacion !== undefined && params.liquidacion !== null && params.liquidacion !== "") ||
      (params.facebook && params.facebook.trim() !== "") ||
      (params.instagram && params.instagram.trim() !== "") ||
      (params.detalles && params.detalles.trim() !== "") ||
      (params.promesaEntrega && params.promesaEntrega.trim() !== "") ||
      (params.fechaEntrega && params.fechaEntrega.trim() !== "") ||
      contienePalabraClave(params.diseño) ||        //Iincluyendo mencion de algo de diseño, fabricacion, entrega..
      contienePalabraClave(params.fabrica) ||       //Significaria que se refiere a algo de VENTAS.
      contienePalabraClave(params.entregado)
    ) {
      tipoArchivo = "ventas";
    }
    // Si no entró ninguna condición anterior, permanece como "inventario"

    // Selección dinámica de ID y columnas
    let spreadsheetId, range, columnas;
    if (tipoArchivo === "ventas") {
      spreadsheetId = VENTAS_ID;
      range = VENTAS_RANGE;
      columnas = COLUMNAS_VENTAS;


    } else {
      spreadsheetId = INVENTARIO_ID;
      range = INVENTARIO_RANGE;
      columnas = COLUMNAS_INVENTARIO;
    }

    // Obtiene los datos, leyendo el archivo Google Sheet con el ID asignado y el rango asignado.
    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    const rows = res.data.values || [];
    console.log("Total de filas leídas (incluyendo encabezado):", rows.length);

    const productos = rows.slice(1);
    console.log("Total de registros a filtrar:", productos.length);


    ///////////////////////
    /////////FUNCIONES UTILITARIAS INTERNAS A USAR EN ESTA FUNCION DE BUSCAR PRODUCTOS
    //////////////// 

    /*
    // --- NORMALIZADORES DE FILTROS ENTRADA ---
    function normaliza(texto) {
      return (texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }
        */

    //Funcion para que los textos se manejen de formas equivalentes y comparables
    //Digamos sin acentos, sin espacios, sin comas, o puntuaciones de ese tipo que pueden darse por"error" de usuario
    //y que podrian afectar la comparacion de las palabras

    function normaliza(texto) {
  return (texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim(); // <- AÑADE ESTE recorte que quita espacios
}



    
    // Fechas y rangos generales (todas las fechas van a tipo Date)
    /*
    function toDateOrNull(val) {
      if (!val) return null;
      const d = new Date(val);
      return isNaN(d) ? null : d;
    }
    */

  function toDateOrNull(val) {
  if (!val) return null;

  // Si el formato es DD/MM/YYYY o D/M/YYYY
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(val)) {
    const [dia, mes, año] = val.split('/');
    // new Date usa formato YYYY-MM-DD
    return new Date(`${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`);
  }

  // Si no, que JS lo intente parsear (para 6-jun-2025, etc.)
  const d = new Date(val);
  return isNaN(d) ? null : d;
}


 


     function matchRangoFecha(fechaDato, inicio, fin) {
  const fecha = toDateOrNull(fechaDato);
  if (!fecha) return false;

  // Comparación por fecha truncada: solo año-mes-día
  const f = fecha.toISOString().slice(0, 10);
  const i = inicio ? inicio.toISOString().slice(0, 10) : null;
  const fFin = fin ? fin.toISOString().slice(0, 10) : null;

  if (i && f < i) return false;
  if (fFin && f > fFin) return false;
  return true;
}
      

    // Aplica para ambos archivos, sólo aplica si existen en el objeto
    const codigoFiltro = params.codigo ? normaliza(params.codigo.trim()) : null;
    const precioFiltro = params.precio !== undefined && params.precio !== null ? Number(params.precio) : null;
    const existenciaFiltro = params.existencia !== undefined && params.existencia !== null ? Number(params.existencia) : null;
    const estanteFiltro = params.estante ? normaliza(params.estante.trim()) : null;
    const ticketFiltro = params.ticket ? normaliza(params.ticket.trim()) : null;
    const clienteFiltro = params.cliente ? normaliza(params.cliente.trim()) : null;
    const anticipoFiltro = params.anticipo !== undefined && params.anticipo !== null ? Number(params.anticipo) : null;
    const liquidacionFiltro = params.liquidacion !== undefined && params.liquidacion !== null ? Number(params.liquidacion) : null;
    const whatsappFiltro = params.whatsapp ? normaliza(params.whatsapp.trim()) : null;
    const instagramFiltro = params.instagram ? normaliza(params.instagram.trim()) : null;
    const facebookFiltro = params.facebook ? normaliza(params.facebook.trim()) : null;
    const detallesFiltro = params.detalles ? normaliza(params.detalles.trim()) : null;
    const diseñoFiltro = params.diseño ? normaliza(params.diseño.trim()) : null;
    const fabricaFiltro = params.fabrica ? normaliza(params.fabrica.trim()) : null;

    //const entregadoFiltro = params.entregado ? normaliza(params.entregado.trim()) : null;
    const entregadoFiltro = params.entregado
  ? (params.entregado || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
  : null;

    // Fechas/rangos (Date)
    const fechaVentaFiltro = params.fechaVenta ? params.fechaVenta : null; // String para "vendidos"/"no vendidos"
    const fechaVentaFiltroDate = (fechaVentaFiltro && fechaVentaFiltro !== "vendidos" && fechaVentaFiltro !== "no vendidos") ? toDateOrNull(params.fechaVenta) : null;
    

    
    const fechaInicioFiltro = toDateOrNull(params.fechaInicio);
    const fechaFinFiltro = toDateOrNull(params.fechaFin);

    // Fechas específicas para ventas
    
    const fechaPedidoFiltro = toDateOrNull(params.fechaPedido);
    const promesaEntregaFiltro = toDateOrNull(params.promesaEntrega);
    const fechaEntregaFiltro = toDateOrNull(params.fechaEntrega);




    // Producto/Palabras clave
    const productosFiltro = Array.isArray(params.producto)
      ? params.producto.flatMap(x => normaliza(x.trim()).split(/\s+/))
      : params.producto
        ? normaliza(params.producto.trim()).split(/\s+/)
        : [];
    const palabrasClave = productosFiltro.filter(x => x && x.trim() !== "");



//////////// AQUI SE INICIAN FILTRADOS O INSTRUCCIONES PARTICULARES PARA CADA TIPO DE ARCHIVO
    // --- FILTRADO PRINCIPAL ---
let totalEvaluadas = 0;
let totalCoinciden = 0;




//Resultados igual al proceso de filtrado por fila a realizar...
const resultados = productos.filter((row) => {
      
    ///////////////////////////////////////
    /////////////INVENTARIO////////////
    ///////////////////////////////////////
      if (tipoArchivo === "inventario") {
        // --- FILTROS INVENTARIO ---
        const prodCodigo = normaliza(row[columnas.codigo] || "");
        const prodNombre = normaliza(row[columnas.producto] || "");
        const prodPrecio = row[columnas.precio] !== undefined && row[columnas.precio] !== null && row[columnas.precio] !== "" ? Number(row[columnas.precio]) : null;
        const prodExistencia = row[columnas.existencia] !== undefined && row[columnas.existencia] !== null && row[columnas.existencia] !== "" ? Number(row[columnas.existencia]) : null;
        const prodEstante = normaliza(row[columnas.estante] || "");
        const prodFecha = row[columnas.fechaVenta] || "";
        const prodTicket = normaliza(row[columnas.ticket] || "");

        let coincidencias = 0;
        for (let w = 0; w < productosFiltro.length; w++) {
          const palabra = productosFiltro[w];
          if (
            prodNombre.includes(palabra) ||
            (palabra.endsWith('s') && prodNombre.includes(palabra.slice(0, -1))) ||
            prodNombre.split(/\s+/).some(x => x.startsWith(palabra.slice(0, 4)))
          ) {
            coincidencias++;
          }
        }
        const umbral = productosFiltro.length === 2 ? 2 : (productosFiltro.length >= 3 ? 2 : 1);

        const matchCodigo = !codigoFiltro || prodCodigo === codigoFiltro;
        const matchNombre = palabrasClave.length === 0 || coincidencias >= umbral;
        const matchPrecio = precioFiltro === null || prodPrecio === precioFiltro;
        const matchExistencia = existenciaFiltro === null || prodExistencia === existenciaFiltro;


        //const matchEstante = !estanteFiltro || prodEstante === estanteFiltro;
        const matchEstante = (params.estante === "")
        ? !row[columnas.estante] || normaliza(row[columnas.estante]) === ""
        : (!estanteFiltro || prodEstante === estanteFiltro);
        
        
        const matchTicket = !ticketFiltro || prodTicket === ticketFiltro;
        let matchVendidos = true;
        if (fechaVentaFiltro === "vendidos") matchVendidos = prodFecha.trim() !== "";
        if (fechaVentaFiltro === "no vendidos") matchVendidos = prodFecha.trim() === "";



        

        // Filtrado por fecha de venta (rango)
        let matchFecha = true;
        if (fechaInicioFiltro || fechaFinFiltro) {
          matchFecha = matchRangoFecha(prodFecha, fechaInicioFiltro, fechaFinFiltro);
        } else if (fechaVentaFiltroDate) {
          matchFecha = matchRangoFecha(prodFecha, fechaVentaFiltroDate, fechaVentaFiltroDate);
        }


        return (
          matchCodigo && matchNombre && matchPrecio && matchExistencia &&
          matchEstante && matchTicket && matchVendidos && matchFecha
        );


        //////////////////////////
        /////////////VENTAS/////////////
        ///////////////////////////////////////

      } else {
        // --- FILTROS VENTAS ---
                
        //const fechaPedido = row[columnas.fechaPedido] || "";
        
        const fechaPedido = toDateOrNull(row[columnas.fechaPedido] || "");
        const pedidoNum = normaliza(row[columnas.pedidoNum] || "");
        const atiende = normaliza(row[columnas.atiende] || "");
        const cliente = normaliza(row[columnas.cliente] || "");
        const productoV = normaliza(row[columnas.producto] || "");
        const detalles = normaliza(row[columnas.detalles] || "");
        const whatsapp = normaliza(row[columnas.whatsapp] || "");
        const instagram = normaliza(row[columnas.instagram] || "");
        const facebook = normaliza(row[columnas.facebook] || "");
        const total = row[columnas.total] !== undefined && row[columnas.total] !== null && row[columnas.total] !== "" ? Number(row[columnas.total]) : null;
        const anticipo = row[columnas.anticipo] !== undefined && row[columnas.anticipo] !== null && row[columnas.anticipo] !== "" ? Number(row[columnas.anticipo]) : null;
        const ticketAnticipo = normaliza(row[columnas.ticketAnticipo] || "");
        const liquidacion = row[columnas.liquidacion] !== undefined && row[columnas.liquidacion] !== null && row[columnas.liquidacion] !== "" ? Number(row[columnas.liquidacion]) : null;
        const ticketLiquidacion = normaliza(row[columnas.ticketLiquidacion] || "");

        //const promesaEntrega = row[columnas.promesaEntrega] || "";
        const promesaEntrega = toDateOrNull(row[columnas.promesaEntrega] || "");
        const fechaEntrega = toDateOrNull(row[columnas.fechaEntrega] || "");

        const diseño = normaliza(row[columnas.diseño] || "");
        const fabrica = normaliza(row[columnas.fabrica] || "");


        //const entregado = normaliza(row[columnas.entregado] || "");
        //const fechaEntrega = row[columnas.fechaEntrega] || "";
        // === CAMPO ENTREGADO ===
const entregadoRaw = row[columnas.entregado] || "";
const entregado = (entregadoRaw || "")
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .trim();  // <- Este trim debe ir al final, no antes


        // Filtros por campo
        let coincidenciasProd = 0;
        for (let w = 0; w < productosFiltro.length; w++) {
          const palabra = productosFiltro[w];
          if (
            productoV.includes(palabra) ||
            (palabra.endsWith('s') && productoV.includes(palabra.slice(0, -1))) ||
            productoV.split(/\s+/).some(x => x.startsWith(palabra.slice(0, 4)))
          ) {
            coincidenciasProd++;
          }
        }
        const umbralProd = productosFiltro.length === 2 ? 2 : (productosFiltro.length >= 3 ? 2 : 1);

        // -- Checks --
        const matchCliente = !clienteFiltro || cliente.includes(clienteFiltro);
        const matchAnticipo = anticipoFiltro === null || anticipo === anticipoFiltro;
        const matchLiquidacion = liquidacionFiltro === null || liquidacion === liquidacionFiltro;
        const matchWhatsapp = !whatsappFiltro || whatsapp.includes(whatsappFiltro);
        const matchInstagram = !instagramFiltro || instagram.includes(instagramFiltro);
        const matchFacebook = !facebookFiltro || facebook.includes(facebookFiltro);
        const matchDetalles = !detallesFiltro || detalles.includes(detallesFiltro);
        const matchDiseño = !diseñoFiltro || diseño === diseñoFiltro;
        const matchFabrica = !fabricaFiltro || fabrica === fabricaFiltro;

        //const matchEntregado = !entregadoFiltro || entregado === entregadoFiltro;


        // DEBUG opcional para detectar por qué no coincide
if (entregadoFiltro) {
  console.log(`[DEBUG] Comparando entregado: "${entregado}" === "${entregadoFiltro}"`);
}

         // Si se especifica filtro, se compara estrictamente; si no, acepta cualquier valor
          const matchEntregado = entregadoFiltro
          ? entregado === entregadoFiltro
          : true;


        // DEBUG opcional para detectar por qué no coincide
        if (entregadoFiltro && entregado !== entregadoFiltro) {
          console.log(`⚠️ No coincide entregado: "${entregado}" vs filtro: "${entregadoFiltro}"`);
          }


        const matchProducto = palabrasClave.length === 0 || coincidenciasProd >= umbralProd;
        const matchPedidoNum = !codigoFiltro || pedidoNum === codigoFiltro;

        totalEvaluadas++;
        // FILTRO UNIFICADO PARA RANGOS DE FECHAS (USA SIEMPRE fechaInicio/fechaFin PARA TODOS LOS CAMPOS RELEVANTES)
        // Si solo hay un filtro exacto de fecha, lo usa solo (igual que antes, pero robusto)
        // Puedes ajustar aquí si quieres que use promesaEntrega, fechaEntrega o fechaPedido según prioridad, o puedes combinar lógicas.

        let matchRango = true;
       
        if (fechaInicioFiltro || fechaFinFiltro) {
  // Usa el campo de fecha base para filtrar exactamente el campo correcto según la búsqueda
  switch(params.campoFechaBase) {
    case "fechaEntrega":
      matchRango = matchRangoFecha(fechaEntrega, fechaInicioFiltro, fechaFinFiltro);
      break;
    case "promesaEntrega":
      matchRango = matchRangoFecha(promesaEntrega, fechaInicioFiltro, fechaFinFiltro);
      break;
    case "fechaPedido":
    default:
      matchRango = matchRangoFecha(fechaPedido, fechaInicioFiltro, fechaFinFiltro);
      break;
  }
} else {
  // Si buscas una fecha exacta para algún campo específico
  matchRango =
    (!fechaEntregaFiltro || matchRangoFecha(fechaEntrega, fechaEntregaFiltro, fechaEntregaFiltro)) &&
    (!promesaEntregaFiltro || matchRangoFecha(promesaEntrega, promesaEntregaFiltro, promesaEntregaFiltro)) &&
    (!fechaPedidoFiltro || matchRangoFecha(fechaPedido, fechaPedidoFiltro, fechaPedidoFiltro));
}




totalEvaluadas++;
const coincidenciaFinal = (
  matchPedidoNum && matchCliente && matchProducto && matchAnticipo && matchLiquidacion &&
  matchWhatsapp && matchInstagram && matchFacebook && matchDetalles && matchDiseño &&
  matchFabrica && matchEntregado && matchRango
);
if (coincidenciaFinal) totalCoinciden++;


if (pedidoNum) {
  console.log(`=== FILTROS PARA PEDIDO "${pedidoNum}"  ===`, {
    matchPedidoNum,
    matchCliente,
    matchProducto,
    matchAnticipo,
    matchLiquidacion,
    matchWhatsapp,
    matchInstagram,
    matchFacebook,
    matchDetalles,
    matchDiseño,
    matchFabrica,
    matchEntregado,
    matchRango
  });
}

    // DEBUG: Muestra el valor crudo y el tipo detectado para fechas
if (pedidoNum === "797" || pedidoNum === "798" || pedidoNum === "800") { // Cambia por el número que quieras investigar
  console.log(`[DEBUG FECHAS Pedido ${pedidoNum}]`);
  console.log('  fechaPedido cruda:', row[columnas.fechaPedido], '| typeof:', typeof row[columnas.fechaPedido], '| toDateOrNull:', fechaPedido);
  console.log('  promesaEntrega cruda:', row[columnas.promesaEntrega], '| typeof:', typeof row[columnas.promesaEntrega], '| toDateOrNull:', promesaEntrega);
  console.log('  fechaEntrega cruda:', row[columnas.fechaEntrega], '| typeof:', typeof row[columnas.fechaEntrega], '| toDateOrNull:', fechaEntrega);
}



return coincidenciaFinal;


        /*
        return (
          matchPedidoNum && matchCliente && matchProducto && matchAnticipo && matchLiquidacion &&
          matchWhatsapp && matchInstagram && matchFacebook && matchDetalles && matchDiseño &&
          matchFabrica && matchEntregado && matchRango
        );
        */
      }
    });

    /////////FORMATEO GENERAL////////
    // ==== FORMATEO SALIDA ====
    ////////////////////////////////

    if (resultados.length === 0) {
      return "No se encontraron productos/pedidos que coincidan con los criterios de búsqueda.";
    }

    
    let salida = "";
    // Formato de salida por archivo inventario o ventas...
    //Si el archivo trabajado fue de inventario, entonces la respuesta la damos en esta forma
if (tipoArchivo === "inventario") {
  salida = `Total resultados: ${resultados.length}\n\n` +
    resultados.map((prod, idx) =>
      `${idx + 1}. [${prod[columnas.codigo]}] ${prod[columnas.producto] || '-'}${prod[columnas.precio] ? ` ($${prod[columnas.precio]})` : ''} | Existencia: ${prod[columnas.existencia] || '-'} | Estante: ${prod[columnas.estante] || '-'} | Fecha: ${prod[columnas.fechaVenta] || '-'} | Ticket: ${prod[columnas.ticket] || '-'}`
    ).join('\n');
} 

//Si el archivo trabajado fue de VENTAS, entonces la respuesta la damos en esta forma
//Por ejemplo aqui incluimos los datos completos del pedido por si se necesita consultar algo de esa fila(pedido)
//desde la fecha hasta el estado de entrega
else {
  salida = `Total resultados: ${resultados.length}\n\n` +
    resultados.map((ped, idx) =>
`${idx + 1}. Pedido [${ped[columnas.pedidoNum]}]
  • Producto: ${ped[columnas.producto] || '-'}
  • Cliente: ${ped[columnas.cliente] || '-'}
  • Atendió: ${ped[columnas.atiende] || '-'}
  • Fecha de pedido: ${ped[columnas.fechaPedido] || '-'}
  • Promesa de entrega: ${ped[columnas.promesaEntrega] || '-'}
  • Fecha de entrega: ${ped[columnas.fechaEntrega] || '-'}
  • Detalles: ${ped[columnas.detalles] || '-'}
  • WhatsApp: ${ped[columnas.whatsapp] || '-'}
  • Instagram: ${ped[columnas.instagram] || '-'}
  • Facebook: ${ped[columnas.facebook] || '-'}
  • Total: $${ped[columnas.total] || '0'}
  • Anticipo: $${ped[columnas.anticipo] || '0'} (Ticket: ${ped[columnas.ticketAnticipo] || '-'})
  • Liquidación: $${ped[columnas.liquidacion] || '0'} (Ticket: ${ped[columnas.ticketLiquidacion] || '-'})
  • Estado diseño: ${ped[columnas.diseño] || '-'}
  • Estado fábrica: ${ped[columnas.fabrica] || '-'}
  • Entregado: ${ped[columnas.entregado] || '-'}`
    ).join('\n\n');
}
    
    

console.log('===RESULTADOS FINALES===');
//console.log(salida); // O si prefieres, console.log(JSON.stringify(resultados, null, 2));
console.log("🟣 Total evaluadas con filtro:", totalEvaluadas);
console.log("🟢 Total que coinciden y se devuelven:", totalCoinciden);

    return salida;   //Enviamos la salida como return o resultado de esta funcion, ya conteniendo todos los datos, para el Assistant API

  } catch (error) {
    console.error("Error buscando productos/pedidos:", error.message);
    return "Error buscando productos/pedidos";
  }
});
//////////////////FIN DE TERCERA FUNCION BUSCAR PRODUCTOS////////////





///////////////4ta FUNCION HORA FECHA////////////////
//EL ASSISTANT TIENE INSTRUCCIONES DE SIEMPRE ASEGURARSE DE LA FECHA ACTUAL
//ASI QUE SIEMPRE BUSCARA LLAMAR A ESTA FUNCION PARA OBTENER LA FECHA DE SISTEMA ACTUAL
//TENER ESE DATO ES MUY UTIL PARA ASISTENCIAS DEL TIPO "los pedidos de hoy", "que se entregó ayer", "esta semana", etc.
thread.registerFunction("obtenerFechaHoraActual", async () => {
//Aqui no vamos a pedir codigo de autorizacion (quizas se reciba pero no se condiciona ni pregunta)
//Pues es una funcion de uso general para todos.


  // Ajusta la zona horaria a CDMX o tu región
  const now = new Date();
  // Si tu servidor está en UTC, ajusta manualmente:
  // now.setUTCHours(now.getUTCHours() - 6); // UTC-6 para CDMX

  // O usa Intl.DateTimeFormat para la zona correcta (mejor)
  const zona = 'America/Mexico_City';
  const opciones = { timeZone: zona, hour12: false };

  const fecha = now.toLocaleDateString('sv-SE', { timeZone: zona }); // YYYY-MM-DD
  const hora = now.toLocaleTimeString('sv-SE', opciones); // HH:MM:SS

  return { fecha, hora };
});
///////////////FIN DE 4TA FUNCION//////////////////////////




  // Fin de registro de funciones
  //Recordar que esta es una funcion de registro de funciones
  //que a la vez contiene toda la logica que se ejecuta de esas funciones AI.
  console.log("Funciones registradas en el thread:", Object.keys(thread.functions));
}











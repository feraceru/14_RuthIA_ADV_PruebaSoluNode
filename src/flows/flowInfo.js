//Declaracionese inclusiones de funciones necesarias del BOT
import { addKeyword, utils, EVENTS, MemoryDB } from '@builderbot/bot';
import { readFileSync } from 'fs';
import { join } from 'path';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const flowInfo = addKeyword([EVENTS.ACTION],{ sensitive: false })

/*
  .addAnswer(`Ortur S2 PRO`, 
        { media: 'https://static.wixstatic.com/media/dc8c9a_400052f035ca48fcb6f8cce5a9595a55~mv2.jpg'}
    )
*/

    .addAction(async (ctx, {flowDynamic,endflow, gotoFlow,globalState}) => {
      
console.log(`FLOW DE INFORMACION PRODUCTO 1 PREARMADO | ACTIVADO`)
  
const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
var text = readFileSync(join(pathPromp, "00_Adei_Producto_1.txt"), "utf-8");  //Leemos el fichero
//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJ
//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_1.jpg'
                    });

  //await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
 // await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow;
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const flowInfo2 = addKeyword([EVENTS.ACTION],{ sensitive: false })

/*
.addAnswer(`ONIX LTE`, 
        { media: 'https://static.wixstatic.com/media/dc8c9a_57c53f4040f44829b2fbe3ef16ae0794~mv2.jpg'}
    )
*/

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {
  console.log(`FLOW DE INFORMACION PRODUCTO 2 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_2.txt"), "utf-8");  //Leemos el fichero

//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO
//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_2.jpg'
                    });

  //await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
//await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow;
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const flowInfo3 = addKeyword([EVENTS.ACTION],{ sensitive: false })

/*
.addAnswer(`ALPHA 22W`, 
        { media: 'https://static.wixstatic.com/media/4f3b13_b737644111524e50a374d7a82f6c58ee~mv2.png'}
    )
*/


    .addAction(async (ctx, {flowDynamic,endflow, globalState}) => {

      
  console.log(`FLOW DE INFORMACION PRODUCTO 3 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_3.txt"), "utf-8");  //Leemos el fichero
//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO
//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_3.jpg'
                    });


  //await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
//await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const flowInfo4 = addKeyword([EVENTS.ACTION],{ sensitive: false })

/*
.addAnswer(`BERI 50W | Rotativa`, 
        { media: 'https://static.wixstatic.com/media/4f3b13_7e440f77dafb4475937131ed032a4b52~mv2.jpg'}
    )
*/

    .addAction(async (ctx, {flowDynamic,endflow, globalState}) => {


      
  console.log(`FLOW DE INFORMACION PRODUCTO 4 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_4.txt"), "utf-8");  //Leemos el fichero
//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO
//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_4.jpg'
                    });

  //await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
//await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const flowInfo5 = addKeyword([EVENTS.ACTION],{ sensitive: false })

/*
.addAnswer(`MAQUINA LASER MK2`, 
        { media: 'https://static.wixstatic.com/media/4f3b13_61f9e4f524ae43d696bb1480b2f3215d~mv2.jpg'}
    )
*/

    .addAction(async (ctx, {flowDynamic,endflow, globalState}) => {


      
  console.log(`FLOW DE INFORMACION PRODUCTO 5 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_5.txt"), "utf-8");  //Leemos el fichero
//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO
//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_5.jpg'
                    });


  //await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
//await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow;
})


//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const flowInfo6 = addKeyword([EVENTS.ACTION],{ sensitive: false })

/*
.addAnswer(`RADIS 40W | El modelo de CO2 más económico`, 
        { media: 'https://static.wixstatic.com/media/4f3b13_005a9589c5d64874b4e38afb1dfce9ed~mv2.jpg'}
    )
*/

    .addAction(async (ctx, {flowDynamic,endflow, globalState}) => {


      
  console.log(`FLOW DE INFORMACION PRODUCTO 6 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_6.txt"), "utf-8");  //Leemos el fichero
//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO
//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_6.jpg'
                    });


//await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
//await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const flowInfo7 = addKeyword([EVENTS.ACTION],{ sensitive: false })

/*
.addAnswer(`Eclipse 50W | 40*40cm`, 
        { media: 'https://static.wixstatic.com/media/4f3b13_a9f3d73f302949d9a297b57ff59c0e33~mv2.jpg'}
    )
*/

    .addAction(async (ctx, {flowDynamic,endflow, globalState}) => {


      
  console.log(`FLOW DE INFORMACION PRODUCTO 7 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_7.txt"), "utf-8");  //Leemos el fichero
//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO
//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_7.jpg'
                    });


  //await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
//await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const flowInfo8 = addKeyword([EVENTS.ACTION],{ sensitive: false })

/*
.addAnswer(`Avis Spin 40W`, 
        { media: 'https://static.wixstatic.com/media/4f3b13_d37164726e5342f785c1c39a07915351~mv2.jpg'}
    )
*/
    .addAction(async (ctx, {flowDynamic,endflow, globalState}) => {


      
  console.log(`FLOW DE INFORMACION PRODUCTO 8 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_8.txt"), "utf-8");  //Leemos el fichero
//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO
//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_8.jpg'
                    });

  //await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
//await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/*
const flowInfo9 = addKeyword([EVENTS.ACTION],{ sensitive: false })

.addAnswer(`Eclipse 80W | 6040 | RUIDA`, 
        { media: 'https://static.wixstatic.com/media/4f3b13_597d5c5112c748ccb29cb5d34ec6f076~mv2.jpg'}
    )

    .addAction(async (ctx, {flowDynamic,endflow, globalState}) => {


      
  console.log(`FLOW DE INFORMACION PRODUCTO 9 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_9.txt"), "utf-8");  //Leemos el fichero
//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO
await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
//await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow;
})
*/

const flowInfo9 = addKeyword([EVENTS.ACTION],{ sensitive: false })

/*
.addAnswer(`Faomic Delta | Rotativa`, 
  { media: 'https://static.wixstatic.com/media/4f3b13_11b849c212d140329efc94e8315349ae~mv2.png'}      
    )
*/

.addAction(async (ctx, {flowDynamic,endflow, globalState}) => {
      
  console.log(`FLOW DE INFORMACION PRODUCTO 9 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_9.txt"), "utf-8");  //Leemos el fichero
//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO
//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_9.jpg'
                    });

  //await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
 // await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow; //
})

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const flowInfo10 = addKeyword([EVENTS.ACTION],{ sensitive: false })

/*
.addAnswer(`Vesperi 100W | 9060 | RUIDA`, 
        { media: 'https://static.wixstatic.com/media/4f3b13_58c3c2be3b5d44bf9235f29274ce1636~mv2.jpg'}
    )
*/

    .addAction(async (ctx, {flowDynamic,endflow, globalState}) => {


      
  console.log(`FLOW DE INFORMACION PRODUCTO 10 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_10.txt"), "utf-8");  //Leemos el fichero
//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO
//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_10.jpg'
                    });

  //await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
 // await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const flowInfo11 = addKeyword([EVENTS.ACTION],{ sensitive: false })

/*
.addAnswer(`Eclipse 80W | 6040 | RUIDA`, 
        { media: 'https://static.wixstatic.com/media/4f3b13_597d5c5112c748ccb29cb5d34ec6f076~mv2.jpg'}
    )
*/
    .addAction(async (ctx, {flowDynamic,endflow, globalState}) => {


      
  console.log(`FLOW DE INFORMACION PRODUCTO 11 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_11.txt"), "utf-8");  //Leemos el fichero
//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_11.jpg'
                    });

  //await flowDynamic(text);    //Enviamos el fichero en respuesta flowDynamic
//await flowDynamic('😊 Hola, soy Adeí, encantada\n\n Le ayudaré en todas sus dudas');
  return endflow;
})


//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const flowInfo12 = addKeyword([EVENTS.ACTION],{ sensitive: false })


    .addAction(async (ctx, {flowDynamic,endflow, globalState}) => {

      
  console.log(`FLOW DE INFORMACION PRODUCTO 12 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_12.txt"), "utf-8");  //Leemos el fichero

//RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
// Encontrar el índice del tercer salto de línea
const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
if (tercerSaltoDeLinea != -1) {
    // Extraer el texto después del tercer salto de línea
    text = text.substring(tercerSaltoDeLinea + 1);
}

//ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO//Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
                    media: 'src/promps/Producto_12.jpg'
                    });

  return endflow;
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo13 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 13 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    // Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_13.txt"), "utf-8");  // Leemos el fichero

  // RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
  // Encontrar el índice del tercer salto de línea
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) {
      // Extraer el texto después del tercer salto de línea
      text = text.substring(tercerSaltoDeLinea + 1);}

  // ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO //Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
      media: 'src/promps/Producto_13.jpg'
  });

  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo14 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 14 PREARMADO | ACTIVADO`)
  const pathPromp = join(process.cwd(), "/src/promps");    // Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_14.txt"), "utf-8");  // Leemos el fichero

  // RETIRAMOS LAS PRIMERAS DOS LINEAS QUE SERAN LAS KEYWORDS Y ESPACIO VACIO
  // Encontrar el índice del tercer salto de línea
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) {
      // Extraer el texto después del tercer salto de línea
      text = text.substring(tercerSaltoDeLinea + 1);
  }

  // ENVIAMOS EL RESULTADO Y CERRAMOS EL FLUJO //Enviamos imagen asignada (debe tener nombre correcto en carpeta promps)
  await flowDynamic(text, {
      media: 'src/promps/Producto_14.jpg'
  });

  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo15 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 15 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_15.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_15.jpg' });
  return endflow;
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo16 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 16 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_16.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_16.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo17 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 17 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_17.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_17.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo18 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 18 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_18.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_18.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo19 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 19 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_19.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_19.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo20 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 20 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_20.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_20.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo21 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 21 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_21.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_21.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo22 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 22 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_22.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_22.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo23 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 23 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_23.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_23.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo24 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 24 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_24.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_24.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo25 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 25 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_25.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_25.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo26 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 26 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_26.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_26.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo27 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 27 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_27.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_27.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo28 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 28 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_28.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_28.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo29 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 29 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_29.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_29.jpg' });
  return endflow;
})

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const flowInfo30 = addKeyword([EVENTS.ACTION], { sensitive: false })

    .addAction(async (ctx, {flowDynamic, endflow, globalState}) => {

  console.log(`FLOW DE INFORMACION PRODUCTO 30 PREARMADO | ACTIVADO`);
  const pathPromp = join(process.cwd(), "/src/promps"); // Directorio de los archivos
  var text = readFileSync(join(pathPromp, "00_Adei_Producto_30.txt"), "utf-8"); // Leer texto

  // Eliminar primeras dos líneas (keywords y espacio)
  const tercerSaltoDeLinea = text.indexOf('\n', text.indexOf('\n') + 1);
  if (tercerSaltoDeLinea != -1) text = text.substring(tercerSaltoDeLinea + 1);

  // Enviar resultado e imagen y cerrar el flujo
  await flowDynamic(text, { media: 'src/promps/Producto_30.jpg' });
  return endflow;
})





export {
  flowInfo,
  flowInfo2,
  flowInfo3,
  flowInfo4,
  flowInfo5,
  flowInfo6,
  flowInfo7,
  flowInfo8,
  flowInfo9,
  flowInfo10,
  flowInfo11,
  flowInfo12,
  flowInfo13,
  flowInfo14,
  flowInfo15,
  flowInfo16,
  flowInfo17,
  flowInfo18,
  flowInfo19,
  flowInfo20,
  flowInfo21,
  flowInfo22,
  flowInfo23,
  flowInfo24,
  flowInfo25,
  flowInfo26,
  flowInfo27,
  flowInfo28,
  flowInfo29,
  flowInfo30
};

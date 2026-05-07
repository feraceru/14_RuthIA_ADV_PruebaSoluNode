//Codigo ensamblado o semidesarrollado por FerAceru

//Linea pendiente de analizar, interesante
//Enviar mensaje cuando algo sucede a otro numero
/*
async (ctx, { provider }) => {
        await provider.sendText('123456789@s.whatsapp.net', 'El cliente ha solicitado una asesoría, comunícate con la persona a la brevedad posible.')
    }NPM 
*/

//Declaracionese inclusiones de funciones necesarias del BOT



//Declaracionese inclusiones de funciones necesarias del BOT
import { addKeyword, utils, EVENTS, MemoryDB } from '@builderbot/bot';
import { readFileSync } from 'fs';
import { join } from 'path';
import fs from 'fs';  
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

var Keywords_Producto = [];



//EVENTS.ACTION sirve coo un "placebo" para ejecutar cuando llegamos por gotoFlow y no por keywords.
const flowEntrada = addKeyword([EVENTS.ACTION],{ sensitive: false })  

.addAnswer(
  //"Whatsapp de atención personalizada profunda: 9512943609\n"+
  "🙋‍♀️✨ Bienvenido a Faomic!\n\n"+
  "IMPORTANTE*: Por favor escribe un solo mensaje a la vez."+
  "Haremos nuestro mejor esfuerzo para responder rápidamente cualquier consulta!\n"
)

.addAction(async (ctx, {flowDynamic,endflow, gotoFlow,globalState}) => {

  await globalState.update({ name: '0' }) //Al tratarse del primmer mensaje la IA esta en 0. Estaes una variable globalState 
                                          //Para consultar y usar en todo el programa. (En flowReparacion se guarda el valor en IA_uso)

  const pathPromp = join(process.cwd(), "/src/promps");              //Ubicamos directorio donde leeremos el fichero con mensaje programado
  var text = readFileSync(join(pathPromp, "00_Adei_Entrada.txt"), "utf-8");  //Leemos el fichero
  flowDynamic(text);                                                         //Enviamos el fichero en respuesta flowDynamic
  
  console.log(`FLOW DE ENTRADA ACTIVADO: Mensajes de introduccion enviado por Whatsapp a:  ${ctx.from}`);
  return endflow;
}
)

export { flowEntrada };

/////////////////   Esta es parte del FLOW ENTRADA | Es un addAction para   ///////////////////////////////////////
//recoger las keywords necesarias de los archivos de producto para activar flujos de mensaje respuesta
//De esta  forma solo se realiza una vez al inicio de la conversacion en primer mensaje (igual que el flujo entrada/mensaje hola)


////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//export default function get_Keywords() {
  export default async function get_Keywords() {
console.log("TRATANDO DE OBTENER KEYWORDS COMO FUNCION!!!!!");


const rutaArchivo = [                             //Se genera un arreglo con las rutas de archivos
'./src/promps/00_Adei_Producto_1.txt',              //para que mas abajo se obligue a revisarlas todas
'./src/promps/00_Adei_Producto_2.txt',              //Puede consultarse todo este codigo con ChatGPT **guiño
'./src/promps/00_Adei_Producto_3.txt',
'./src/promps/00_Adei_Producto_4.txt',
'./src/promps/00_Adei_Producto_5.txt',
'./src/promps/00_Adei_Producto_6.txt',
'./src/promps/00_Adei_Producto_7.txt',
'./src/promps/00_Adei_Producto_8.txt',
'./src/promps/00_Adei_Producto_9.txt',
'./src/promps/00_Adei_Producto_10.txt',
'./src/promps/00_Adei_Producto_11.txt',
'./src/promps/00_Adei_Producto_12.txt',
'./src/promps/00_Adei_Producto_13.txt',
'./src/promps/00_Adei_Producto_14.txt',
'./src/promps/00_Adei_Producto_15.txt',
'./src/promps/00_Adei_Producto_16.txt',
'./src/promps/00_Adei_Producto_17.txt',
'./src/promps/00_Adei_Producto_18.txt',
'./src/promps/00_Adei_Producto_19.txt',
'./src/promps/00_Adei_Producto_20.txt',
'./src/promps/00_Adei_Producto_21.txt',
'./src/promps/00_Adei_Producto_22.txt',
'./src/promps/00_Adei_Producto_23.txt',
'./src/promps/00_Adei_Producto_24.txt',
'./src/promps/00_Adei_Producto_25.txt',
'./src/promps/00_Adei_Producto_26.txt',
'./src/promps/00_Adei_Producto_27.txt',
'./src/promps/00_Adei_Producto_28.txt',
'./src/promps/00_Adei_Producto_29.txt',
'./src/promps/00_Adei_Producto_30.txt'        
];


// Código para leer el archivo de información de producto que contiene las Keywords, identificarlas, separarlas y guardarlas.
async function procesarArchivos() {
for (const ruta of rutaArchivo) {
try {
  const data = await fs.promises.readFile(ruta, 'utf8');
  const inicioKeywords = data.indexOf('KEYWORDS=');

  if (inicioKeywords === -1) {
    console.error(`No se encontró la línea KEYWORDS = en el archivo ${ruta}.`);
    continue;
  }

  const palabrasClaveTexto = data.substring(inicioKeywords).match(/\[(.*?)\]/)[1];
 //palabrasClaveTexto=palabrasClaveTexto.toLowerCase();

  const keywords = palabrasClaveTexto.toLowerCase().split(',').map(item => item.trim());
       //keywords.toLowerCase();
  
  Keywords_Producto.push(keywords);

  //export default Keywords_Producto; //Exportamos el arreglo doble, que contiene todas las keywords guardadas, para que pueda leerse
  //En todo el codigo

  console.log(`Palabras clave encontradas en ${ruta}:`, keywords);
} catch (error) {
  console.error(`Error al leer el archivo ${ruta}:`, error);
}
}
}
          
 

// Llamar a la función principal
await procesarArchivos().then(() => {
  console.log('Todas las palabras clave han sido procesadas.');
}).catch(error => {
  console.error('Error al procesar los archivos:', error);
});


  return Keywords_Producto;
}

  




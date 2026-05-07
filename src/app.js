import dotenv from 'dotenv';
dotenv.config();


/*
const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require("@bot-whatsapp/bot");
*/

/*
const { createBot, createProvider, createFlow, addKeyword, utils, MemoryDB } = require('@builderbot/bot')
const { BaileysProvider: Provider } = require('@builderbot/provider-baileys');
const { MemoryDB: Database } = require('@builderbot/bot');

const { init } = require("bot-ws-plugin-openai");
const { handlerAI } = require("./utils");
const { textToVoice } = require("./services/eventlab");
const { readFileSync } = require("fs");
const { join } = require("path");
*/

import {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  MemoryDB
} from '@builderbot/bot';

import { BaileysProvider as Provider } from '@builderbot/provider-baileys';
//import { BaileysProvider as Provider } from 'builderbot-provider-sherpa';

import { MemoryDB as Database } from '@builderbot/bot';


const PORT = process.env.PORT ?? 3008



import {flowReparacion} from "./flows/flowReparacion.js";
import {flowEntrada} from "./flows/flowEntrada.js";
import {
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
} from "./flows/flowInfo.js";


const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 *
 * Plugin settings
 * https://platform.openai.com/docs/api-reference
 *
 */




const main = async () => {
    
  const adapterFlow = createFlow([
    flowEntrada,
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
  flowInfo30,
    flowReparacion
  ]);

    //const adapterProvider = createProvider(Provider)
    //const adapterProvider = createProvider(Provider)
  const adapterProvider = createProvider(Provider, { version: [2, 3000, 1033927531]});
    //Ademas de actualizar las versiones de builderbot, providers baileys, 
    //tambien cambie el codigo ultimo de XXXXX (no recuerdo) a 1033927531
    //y con esoya genero el QR de nuevo.


    
    const adapterDB = new Database()

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    },
    {
        globalState: {
          encendido: true,
        }
      }
    )

//////////////////////////////////////////////////
//PARCHE
const waitForSock = setInterval(async () => {
  const sock = adapterProvider.vendor
  if (!sock) return

  clearInterval(waitForSock)
  console.log('✅ Socket listo')

  const myJid = sock.user.id

  const _orig = sock.sendMessage.bind(sock)

  // Normaliza JID quitando device ID (:0, :1, etc)
  const normalizeJid = (jid) => {
    if (!jid) return jid
    return jid.replace(/:\d+@/, '@')
  }

  sock.sendMessage = async (jid, content, options) => {
    // Normalizar JID antes de enviar
    const jidNormal = normalizeJid(jid)
    const result = await _orig(jidNormal, content, options)

    const jidBase = jidNormal.split('@')[0]
    const myJidBase = myJid.split('@')[0].split(':')[0]
    if (jidBase === myJidBase) return result

    let text = null
    if (typeof content === 'string') {
      text = content
    } else if (content?.text) {
      text = content.text
    } else if (content?.caption) {
      text = content.caption
    } else if (content?.conversation) {
      text = content.conversation
    } else if (content?.extendedTextMessage?.text) {
      text = content.extendedTextMessage.text
    }

    if (text) {
      console.log('🪞 Espejando en hilo:', jidNormal)
      sock.ev.emit('messages.upsert', {
        messages: [{
          key: {
            remoteJid: jidNormal,
            fromMe: true,
            id: result?.key?.id || `BOTREPLY_${Date.now()}`
          },
          message: { conversation: text },
          messageTimestamp: Math.floor(Date.now() / 1000),
          status: 3
        }],
        type: 'append'
      })
    }

    return result
  }

  // ─── Interceptar comandos del admin ───────────────────────────────────────
  sock.ev.on('messages.upsert', async ({ messages }) => {
    for (const msg of messages) {
      const id = msg?.key?.id || ''

      if (!msg?.key?.fromMe) continue
      if (id.startsWith('FAKE_')) continue
      if (id.startsWith('BOTREPLY_')) continue

      const text =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        ''

      if (!text?.startsWith('/')) continue
      const limpio = text.replace(/^\//, '')
      console.log('🔥 MI MENSAJE:', limpio)

      await sock.ev.emit('messages.upsert', {
        messages: [{
          key: {
            remoteJid: normalizeJid(msg.key.remoteJid),
            fromMe: false,
            id: `FAKE_${Date.now()}`
          },
          message: { conversation: limpio },
          pushName: 'Admin'
        }],
        type: 'notify'
      })
    }
  })

}, 500)
//PARCHE
/////////////////////////////////////////

    httpServer(+PORT)



}

main().catch(console.error);
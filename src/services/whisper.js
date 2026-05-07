/*
import fs from "fs";
//import { Configuration, OpenAIApi } from "openai";
import Configuration from "openai";
import OpenAIApi from "openai";
*/
//Transcriptions:  https://platform.openai.com/docs/guides/speech-to-text/quickstart?lang=node

import fs from "fs";
import OpenAI from "openai";
const openai = new OpenAI();

/**
 *
 * @param {*} path url mp3
 */


const voiceToText = async (path) => {
  if (!fs.existsSync(path)) {
    throw new Error("No se encuentra el archivo");
  }

  try {
    console.log("Al menos intento traducirlo...");
    const resp = await openai.audio.transcriptions.create({
      file: fs.createReadStream(path),
      model: "whisper-1"
    });
    console.log("Supuestamente si termine traduccion");
    
    return resp.text;
  } catch (err) {
    console.log(err.response.data)
    return "ERROR";
  }
};


/*
const voiceToText = async (path) => {
  if (!fs.existsSync(path)) {
    throw new Error("No se encuentra el archivo");
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const resp = await openai.createTranscription(
      fs.createReadStream(path),
      "whisper-1"
    );

    return resp.data.text;
  } catch (err) {
    console.log(err.response.data)
    return "ERROR";
  }
};
*/

export { voiceToText };

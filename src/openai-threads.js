import OpenAI from "openai";
//import { OpenAI } from "openai";
const openai = new OpenAI();

import fs from 'fs';



///POLLRUN MODIFICADO
// Pon esto FUERA de pollRun, a nivel módulo/script:
//const runsRespondidos = new Set();

// Cambia el Set por un Map para guardar el timestamp
const runsRespondidos = new Map(); // run.id -> timestamp
const pollingEnCurso = new Map(); // { run.id: true/false }


export class OpenAIThread {
  constructor(assistant_id) {
    this.assistant_id = assistant_id;
    this.eventWatchers = [];
    this.functions = {};
    this.interval = null;
  }




  


  async createThread(vector_store) {
    try {
      openai;//?Si sirve de algo? Lo quitamos? Lo agregamos por seguir algun codigo ejempko
      const thread = await openai.beta.threads.create({ tool_resources: { "file_search": { "vector_store_ids": [vector_store]}}});
      this.thread = thread;
      return thread;
    } catch (error) {
      console.error("Error creating thread:", error);
      throw error;
    }
  }





  async Analizar_imagen(fotopath, objetivo){
    var base64Image;
  
    try{
    // Lee la imagen
    //const imageFile = fs.readFileSync(fotopath);
    console.log("Analizando imagen por Vision IA | OpenAI... ");
    console.log(fotopath);
  
     // Leer el archivo de imagen
     const imageFile = fs.readFileSync(fotopath);
     // Convertir a Base64
     base64Image = imageFile.toString('base64');
  
  
    // Leer el archivo de imagen
    /////////////////////////////////////////////////
      // Envía la imagen al modelo de visión
  // Crear el cuerpo de la solicitud
  const messageContent = [
    {
      type: 'text',
      text: 'Revisa la imagen y describela con el maximo detalle posible enfocada en:  '+ objetivo,
    },
    {
      type: 'image_url',
      image_url: {
        url: `data:image/jpeg;base64,${base64Image}`,
      },
    },
  ];
  
  
      // Envía la solicitud a la API de OpenAI
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // Asegúrate de que este sea el modelo correcto
        messages: [{ role: 'user', content: messageContent }],
      });
  
      // Imprimir la respuesta
      //console.log(response.choices[0].message.content);
      return response.choices[0].message.content;
    }
  
  catch (error) {
    console.error("Error analizando imagen", error);
    throw error;
  }
  }

  async RetrieveThread(hilo) {
    try {
      const thread = await openai.beta.threads.retrieve(hilo);
      this.thread = thread;
     // console.log(thread);

      return thread;
    } catch (error) {
      console.error("Error creating thread:", error);
      throw error;
    }
  }



  async createUserMessage(content) {
    try {
      const message = await openai.beta.threads.messages.create(
        this.thread.id,
        {
          role: "user",
          content,
        }
      );
      return message;
    } catch (error) {
      console.error("Error creating user message:", error);
      throw error;
    }
  }

  
  async runThread(instructions = "") {
    try {
      const run = await openai.beta.threads.runs.create(this.thread.id, {
        assistant_id: this.assistant_id,
        instructions,
      });

      this.run = run;

      await this.pollRun();

    //  this.interval = setInterval(() => this.pollRunInterval(), 1000); //original
 // --- Solo crea el intervalo si no hay otro ---
    if (!this.interval) {
      this.interval = setInterval(() => this.pollRunInterval(), 1000);
    }



      return run;
    } catch (error) {
      console.error("Error running thread:", error);
      throw error;
    }
  }

  async runThreadAndWait(instructions = "") {
  try {
    const run = await openai.beta.threads.runs.create(this.thread.id, {
      assistant_id: this.assistant_id,
      instructions,
    });

    this.run = run;
    console.log(">>>EL RUN ASIGNADO A PROCESO ES:");
    console.log(run.id);
    console.log();

    // NO llames aquí await this.pollRun();
    // SOLO inicia el intervalo si no hay uno
    if (!this.interval) {
      this.interval = setInterval(() => this.pollRunInterval(), 1000);
    }

    // Espera hasta que el intervalo limpie this.interval (cuando termine el run)
    while (this.interval !== null) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return run;
  } catch (error) {
    console.error("Error running thread:", error);
    throw error;
  }
}



 async pollRunInterval() {
  // Si ya hay un poll en curso para este run, no hagas nada
  if (pollingEnCurso.get(this.run.id)) {
    //console.log(`[${new Date().toISOString()}] Interval bloqueado para run.id=${this.run.id}`);
    return;
  }
  try {
    await this.pollRun();
  } catch (error) {
    clearInterval(this.interval);
    this.interval = null;
    console.error("Error polling run:", error);
  }
}



  registerEvent(event, callback) {
    this.eventWatchers.push({ event, callback });
  }

  registerFunction(functionName, callback) {
    this.functions[functionName] = callback;
  }

  async getResponse() {
    try {
      const messages = await openai.beta.threads.messages.list(this.thread.id);

      return messages.data[0];
    } catch (error) {
      console.error("Error getting response:", error);
      throw error;
    }
  }

  async getMessages() {
    try {
      const messages = await openai.beta.threads.messages.list(this.thread.id);

      return messages.data;
    } catch (error) {
      console.error("Error getting messages:", error);
      throw error;
    }
  }

async pollRun() {
  // Evita overlaping: Si ya hay un poll en curso para este run, salte
  if (pollingEnCurso.get(this.run.id)) {
    //console.log(`[${new Date().toISOString()}] ⛔ pollRun bloqueado: ya hay uno ejecutándose para run.id=${this.run.id}`);
    return;
  }
  pollingEnCurso.set(this.run.id, true);

  try {
    const running = await openai.beta.threads.runs.retrieve(
      this.thread.id,
      this.run.id
    );

    // --- Logs de estado (puedes quitar si quieres) ---
    console.log("====== POLLRUN ======");
    console.log("Run ID:", this.run.id);
    console.log("Thread ID:", this.thread.id);
    console.log("Run status actual:", running.status);
    if (running.required_action) {
      console.log("Run required_action:", JSON.stringify(running.required_action));
    }
    if (running.last_error) {
      console.log("Run last_error:", JSON.stringify(running.last_error));
    }
    console.log("=====================");

    // Si el assistant pide ejecución de función:
    if (
      running.status === "requires_action" &&
      running.required_action?.submit_tool_outputs?.tool_calls
    ) {
      const outputs = await Promise.all(
        running.required_action.submit_tool_outputs.tool_calls.map(
          async (toolCall) => {
            if (toolCall.type !== "function") {
              console.error(`Tool call type ${toolCall.type} not supported.`);
              return null;
            }
            const tool = this.functions[toolCall.function.name];
            if (!tool) {
              console.error(`Function ${toolCall.function.name} not found.`);
              return null;
            }
            try {
              const output = await tool(JSON.parse(toolCall.function.arguments));
              return {
                tool_call_id: toolCall.id,
                output: JSON.stringify(output),
              };
            } catch (error) {
              console.error(
                `Error executing tool function ${toolCall.function.name}:`,
                error
              );
              return null;
            }
          }
        )
      );

      const resolvedOutputs = outputs.filter((output) => output !== null);

      if (resolvedOutputs.length > 0) {
        try {
          await openai.beta.threads.runs.submitToolOutputs(
            this.thread.id,
            this.run.id,
            { tool_outputs: resolvedOutputs }
          );
        } catch (error) {
          console.error("Error submitting tool outputs:", error);
        }
      }
    }

    // Cuando termina el run (no importa éxito o error)
    if (
      ["completed", "failed", "cancelled", "expired"].includes(running.status)
    ) {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }

    return running;
  } catch (error) {
    console.error("Error polling run status:", error);
    throw error;
  } finally {
    // ¡Aquí SIEMPRE libera el lock!
    pollingEnCurso.delete(this.run.id);
  }
}
}

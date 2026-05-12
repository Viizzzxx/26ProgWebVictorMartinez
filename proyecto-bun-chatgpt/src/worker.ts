import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

const handler: WebWorkerMLCEngineHandler = new WebWorkerMLCEngineHandler();

self.onmessage = (mensaje: MessageEvent): void => {
    handler.onmessage(mensaje);
};
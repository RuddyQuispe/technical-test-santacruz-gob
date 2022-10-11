/**
 * Materia: Software Architecture
 * UAGRM - FICCT
 * @author: Ruddy Bryan Quispe Mamani 
 * @version: 1.0.0
 * @since: 10-10-2021
 */

import { App } from './app';

async function main(): Promise<void> {
    const app = new App(3000);
    await app.listen();
}

main();
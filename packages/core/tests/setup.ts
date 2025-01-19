import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/server';

const allHandlers = server.listHandlers().map((i:any) => i.info.header).sort();
// console.log(JSON.stringify(allHandlers, null, 4));
const usedHandlers : string[] = [];

server.events.on('request:match', (request) => {
    usedHandlers.push(`${request.request.method} ${request.request.url}`);
});

beforeAll(() => {
    server.listen({onUnhandledRequest: 'error'});
});

// //  Close server after all tests
afterAll(() => {
    console.log(JSON.stringify(usedHandlers.sort(), null, 4));
    server.close()
});

// // Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

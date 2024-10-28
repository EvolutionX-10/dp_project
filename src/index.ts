import { Client } from '#lib/structures';

const client = new Client();

await client.login();

/**
 * Design patterns used
 * - handleRegistry.ts - Singleton, Factory, Strategy
 * - src/structures/Client.ts - Singleton
 * - src/structures/Command.ts - Command
 * - src/structures/Listener.ts - Observer
 * - src/structures/Logger.ts - Singleton
 * - src/structures/Paginator.ts - Iterator
 * - src/structures/Prompt.ts - Template Method
 * - src/structures/Resolver.ts - Strategy
 */

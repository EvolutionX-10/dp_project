import { handleListener, handleRegistry, initiateCommands } from '#core';
import { LogLevel } from '#lib/enums';
import { Command, Listener, LoggerProxy } from '#lib/structures';
import { Client as DJSClient, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { cyanBright, underline } from 'colorette';

export class Client<Ready extends boolean = true> extends DJSClient<Ready> {
	public constructor() {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.MessageContent,
			],
			partials: [Partials.Channel],
		});

		this.logger.setLevel(LogLevel.Debug);
		this.prefixes = ['q!', '!'];
		this.ownerIds = ['697795666373640213'];
		this.restDebug = false;
	}

	public prefixes: string[] = [];

	public ownerIds: string[] = [];

	public commands = new Collection<string, Command>();

	public listener = new Collection<string, Listener>();

	public logger: LoggerProxy = new LoggerProxy();

	public override async login(token?: string | undefined): Promise<string> {
		await Promise.all([handleRegistry(this as Client), handleListener(this as Client)]);

		const promiseString = await super.login(token);
		this.logger.info(`Logged in as ${cyanBright(underline(`${this.user?.tag}`))}`);

		await initiateCommands(this as Client, {
			register: false,
			sync: false,
			shortcut: true,
		});

		return promiseString;
	}
}

declare module 'discord.js' {
	interface Client {
		ownerIds: string[];
		commands: Collection<string, Command>;
		listener: Collection<string, Listener>;
		logger: LoggerProxy;
		prefixes: string[];
		restDebug: boolean;
	}
}

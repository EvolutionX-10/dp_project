import { Logger } from './Logger';

export class LoggerProxy extends Logger {
	private logger: Logger;

	public constructor() {
		super();
		this.logger = new Logger();
	}

	public info(message: string, ...args: unknown[]): void {
		super.info(message, ...args);
	}

	public warn(message: string, ...args: unknown[]): void {
		super.warn(message, ...args);
	}

	public error(message: string, ...args: unknown[]): void {
		super.error(message, ...args);
	}

	public debug(message: string, ...args: unknown[]): void {
		super.debug(message, ...args);
	}
}

import 'dotenv/config';
import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: ConnectionOptions = {
	'type': 'mysql',
    'port': 3306,
	'host': process.env.HOST,
    'username': process.env.USERNAME,
    'password': process.env.PASSWORD,
    'database': process.env.DATABASE,
	'synchronize': false, //to create tables and columns automatically
	'logging': false,
	'namingStrategy': new SnakeNamingStrategy,
	'entities': [
		'src/entities/*.ts',
	],
	'migrations': [
		'src/database/migration/*.ts',
	],
	'subscribers': [
		'src/subscriber/**/*.ts',
	],
	'cli': {
		'entitiesDir': 'src/entity',
		'migrationsDir': 'src/database/migration',
		'subscribersDir': 'src/subscriber',
	}
};

export = config;

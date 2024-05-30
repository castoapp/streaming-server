import dotenv from 'dotenv';

import Server from './server.js';

// Load environment variables
dotenv.config();

// Get environment variables
const authKey = process.env.AUTH_KEY as string;
const serverPort = parseInt(process.env.SERVER_PORT as string);

// Create a new server instance
new Server(authKey, serverPort);

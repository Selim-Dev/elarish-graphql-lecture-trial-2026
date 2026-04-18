// Entry point — only responsibility: build the app and listen.
import { buildApp } from './app.js';
import { env } from './config/env.js';

const app = await buildApp();
app.listen(env.port, () => {
  console.log(`🚀 Ready at http://localhost:${env.port}/graphql`);
});

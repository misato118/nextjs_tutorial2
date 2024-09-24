//'use client';

import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
//const projectDir = 'D:/Downloads/ForCarrerDev/Tutorial Projects/NextjsTutorial2/nextjs-dashboard2';
console.log('envConfig ' + projectDir);
loadEnvConfig(projectDir);
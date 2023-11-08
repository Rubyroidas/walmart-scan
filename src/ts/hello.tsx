import React from 'react';

import {createRoot} from 'react-dom/client';
import {App} from "./components/App";

console.log('hello');

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(<App/>);

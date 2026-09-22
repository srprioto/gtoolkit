import './src/assets/app.scss'

import { createRoot } from 'react-dom/client'
import App from './src/App'
import { AppsProvider } from '@renderer/context/AppsContext'

createRoot(document.getElementById('root')!).render(<AppsProvider><App /></AppsProvider>)
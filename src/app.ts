import { createServer } from './config/server';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import medicoRoutes from './routes/medicoRoutes';
import consultaRoutes from './routes/consultaRoutes';

const app = createServer();

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', medicoRoutes);
app.use('/api', consultaRoutes);

export default app;

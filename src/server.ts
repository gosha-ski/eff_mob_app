import { App } from './app';
import { AppealController } from './entry-points/api';

const app = new App([new AppealController()], 3000);

app.listen();

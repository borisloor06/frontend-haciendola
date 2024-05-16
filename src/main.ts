import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { provideHttpClient, withFetch } from '@angular/common/http';


platformBrowserDynamic()
  .bootstrapModule(AppModule, { providers: [provideHttpClient(withFetch())] })
  .catch((err) => console.error(err));
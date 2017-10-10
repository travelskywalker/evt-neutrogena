import { AppProvider } from './app/app';
import { EvtProvider } from './evt/evt';

@NgModule({
    providers: [
        // Services
        AppProvider,
        EvtProvider
    ]
})
export {
    AppProvider,
    EvtProvider
};

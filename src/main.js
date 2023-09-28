import {createApp, onBeforeUnmount} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import './assets/main.css'
import 'primevue/resources/themes/arya-purple/theme.css'
import 'primevue/resources/primevue.min.css'
import router from "../router";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from 'primevue/password';
import Panel from 'primevue/panel';
import Card from 'primevue/card';
import Badge from 'primevue/badge';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import store from './store'
import Sidebar from "primevue/sidebar";
import Avatar from "primevue/avatar";
import Chip from "primevue/chip";
import ScrollPanel from 'primevue/scrollpanel';
import Dropdown from 'primevue/dropdown';
import Calendar from "primevue/calendar";
import Skeleton from 'primevue/skeleton';

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);

app.use(router);

app.component('Button', Button);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Panel', Panel);
app.component('Card', Card);
app.component('Badge', Badge);
app.component('Toast', Toast);
app.component('Sidebar', Sidebar);
app.component('Avatar', Avatar);
app.component('Chip', Chip);
app.component('ScrollPanel', ScrollPanel);
app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);
app.component('Skeleton', Skeleton);
app.use(store)
app.mount('#app');



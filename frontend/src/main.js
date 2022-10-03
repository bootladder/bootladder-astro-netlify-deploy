import { createApp } from 'vue'
import './index.css' 
import {createPinia, defineStore } from 'pinia'
import { ref } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'


export const useEnvironmentStore = defineStore('environment', () => {

	const accountnames = ref([])

	const selectedenv = ref("env1")


	const env1 = ref({
			balancereportjson : ref({initfield:"balancereportjson"}),
			balancereportrequestmodel : ref({
					accountlist: ref(['Assets','Liabilities', 'Equity', 'Expenses','Income']),
					startdate: '2022-01-01',
					enddate: '2023-01-01',
					depth: 8,
				}),
			tempregisters : ref([ ]),
			clickhistory : ref(['hello'])
			})
	const env2 = ref({
			balancereportjson : ref({initfield:"balancereportjson"}),
			balancereportrequestmodel : ref({
					accountlist: ref(['Assets','Liabilities', 'Equity', 'Expenses','Income']),
					startdate: '2022-01-01',
					enddate: '2023-01-01',
					depth: 8,
				}),
			tempregisters : ref([ ]),
			clickhistory : ref(['hello'])
})
	const env3 = ref({
			balancereportjson : ref({initfield:"balancereportjson"}),
			balancereportrequestmodel : ref({
					accountlist: ref(['Assets','Liabilities', 'Equity', 'Expenses','Income']),
					startdate: '2022-01-01',
					enddate: '2023-01-01',
					depth: 8,
				}),
			tempregisters : ref([ ]),
			clickhistory : ref(['hello'])
})
	const env4 = ref({
			balancereportjson : ref({initfield:"balancereportjson"}),
			balancereportrequestmodel : ref({
					accountlist: ref(['Assets','Liabilities', 'Equity', 'Expenses','Income']),
					startdate: '2022-01-01',
					enddate: '2023-01-01',
					depth: 8,
				}),
			tempregisters : ref([ ]),
			clickhistory : ref(['hello'])
})
	
	return {
		selectedenv,
		accountnames,
		env1,
		env2,
		env3,
		env4,
	}
}
, {
	persist: true
}
)




const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const vueapp = createApp(App )

vueapp.use(pinia) // Create the root store

vueapp.mount('#app')

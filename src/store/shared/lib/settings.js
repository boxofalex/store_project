let themeSettings = null;
let text = null;
let language = null;
let api = null;
let apiAjax = null;

const setVariables = options => {

	if (options.themeSettings) {

		themeSettings  = options.themeSettings;
	}

	if (options.text) {

		text = options.text;
	}

	if (options.language) {
		
		language = options.language;
	}

	if (options.api) {

		api = options.api;
	}

	if (options.apiAjax) {
		
		apiAjax = options.apiAjax;
	}
};

export const initOnClient = options => {
	setVariables(options);
};

export const initOnServer = options => {
	setVariables(options);
};

export const getApi = () => {

	if (api) {
          return api
	}
	
}

export const getApiAjax = () => {

	if (apiAjax) {
          return apiAjax
	}
	
}

export const getLanguage = () => {

	if (language) {
          return language
	}
	
}

export const getThemeSettings = () => {

	if (themeSettings) {
           return themeSettings
	}
	
}

export const getText = () => {

	if (text) {
          return text
	}
	
}
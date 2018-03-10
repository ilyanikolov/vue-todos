// export const store = (function() {
	
// 	const STORAGE_KEY = "lkh65GH";

// 	return {
// 		fetch: function() {
// 			return new Promise((resolve, reject) => {
// 				try {
// 					let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
// 					resolve(data);
// 				} catch(e) {
// 					reject(e);
// 				}
// 			});
// 		},
// 		save: function(data) {
// 			return new Promise((resolve, reject) => {
// 				try {
// 					localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
// 					resolve(true);
// 				} catch(e) {
// 					reject(e);
// 				}
// 			});
// 		}
// 	};
// })();

export const store = (function() {
	const STORAGE_KEY = "HkKL786sdf";
	return {
		fetch: function() {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save: function(data) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		}
	};
})();
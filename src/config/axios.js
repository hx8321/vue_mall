import {
	baseUrl
} from './env'

const axiosAjax=async (url = '',data = {},type = 'GET') => {
	type = type.toUpperCase();
	url = baseUrl + url;
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})
		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
		try{
			let getAxios=await axios.get(url,{timeout:1000*60*1});
			return getAxios;
		}catch (error) {
			throw new Error(error)
		}
	}else if(type == 'POST') {
		try{	
			let postAxios=await axios.post(url,data,{timeout:1000*60*1});
			return postAxios;
		}catch (error) {
			throw new Error(error)
		}
	}
}

export default axiosAjax;
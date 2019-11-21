import _ from 'react'
import qs from 'querystring'
import AsyncStorage from '@react-native-community/async-storage'
const prefixkey = "APP"
var db = {}


export const devDefautlState = {
	defaultSignIn: () => ({
		user_id: '904859118',
		password: 'dulv@321',
	}),
	defaultCreateAcc: () =>({
		country_id : 230,
		full_name : 'Test',
		phone_number: "904859118111",
		password: '123456',
		confirm_password:  '123456',
		ref_id : '6789',
		auth_method : 'email',
		email: 'test@gmail.com',
	}),
	defaultBuyPoint:() => ({
		payment_method: 'payment_transfer',
		total: '100000',
	}),
	defaultOrder: ()  => ({
		member_id: '918242186',
		price: '100000',
		choose_discount: '0',
		payment_method: 'point',
		product_name: 'abc',
		qty: '1',
	}),
	defaultTransferPoint: ()=> ({
		member_id: '918242186',
		total: '500',
		desc: ''
	}),
	otpCode: () =>({
		confirm_code: '368839'
	})
}


var BASE_URL = 'https://ezbuylao.com/webhostapp/'
var WK_TOKEN = 1
function par (str) {
	try {
		var obj = JSON.parse(str)
		return null, obj
	} catch (error) {
		return error, str
	}
}

db.storage_get = (path) => {
	return AsyncStorage.getItem(prefixkey + path)
		.then(item => {
			if(typeof cb === 'function') cb(null, par(item))
			return par(item)
		}).catch(err => {
			if(typeof cb === 'function') cb(err, null)
			return err
		})
}
db.storage_delete = (path) => {
	return AsyncStorage.removeItem(prefixkey + path)
		.then(item => {
			if(typeof cb === 'function') cb(null, par(item))
			return par(item)
		}).catch(err => {
			if(typeof cb === 'function') cb(err, null)
			return err
		})
}

db.storage_set = (path, value) => {
	return AsyncStorage.setItem(prefixkey + path, JSON.stringify(value))
}

db._get = async (path, options) => {
	try {
		let data = await fetch(BASE_URL + path).then(resp => resp.json())
		if(options && options.pers) {
			await db.storage_set(path, data)
		}
		return data
	} catch (error) {
		return error
	}
}

db._post = async(path, options, body) => {
	let payload = body
	if(!options.no_token) {
		payload = Object.assign({}, body, {wk_token: WK_TOKEN})
	}
	console.log({payload})
	let reqInit = {
		method: 'POST',
		body: qs.stringify(payload),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
	}
	try {
		var res = await fetch(BASE_URL + path, reqInit)
		// console.log("TEXT" , await res.text())
		var data = await res.json()
		console.log("JSON" , data)

		if(options && options.pers) {
			await db.storage_set(path, data)
		}
		return data
	} catch (error) {
		return error
	}
}

db.isSignedIn = async() => {
	let logined = await db.storage_get('account/login')
	return logined
}

db.signIn = async (userid, password) => {
	let data = await db._post('account/login', {pers: true}, {userid, password})
	return data
}

db.signOut = async () => {
	return await db.storage_delete('account/login')
}

db.quickOrder = async (order) => {
	let data = await db._post('order/quickOrder', {pers: false}, order)
	return data
}

db.buyPoints = async (point) => {
	let data = await db._post('account/addPoint', {pers: false}, point)
	return data
}
db.transferPoints = async (point) => {
	let data = await db._post('account/transPoint', {pers: false}, point)
	return data
}
db.createAccount = async (user) => {
	let data = await db._post('account/userRegister', {pers: false}, user)
	return data
}
db.confirmCode = async (code) => {
	let data = await db._post('account/userRegister', {pers: false, no_token: true}, code)
	return data
}

export default db
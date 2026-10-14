import fs from 'fs'

export const utilService = {
	readJsonFile,
	writeJsonFile,
	makeId,
}

function readJsonFile(path) {
	const str = fs.readFileSync(path, 'utf8')
	const json = JSON.parse(str)
	return json
}

function writeJsonFile(path, data) {
	return new Promise((resolve, reject) => {
		const str = JSON.stringify(data, null, 2)
		fs.writeFile(path, str, err => {
			if (err) return reject(err)
			resolve()
		})
	})
}

function makeId(length = 5) {
	let text = ''
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

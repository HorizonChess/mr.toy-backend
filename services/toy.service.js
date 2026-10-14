import { utilService } from './util.service.js'
import { loggerService } from './logger.service.js'

export const toyService = {
    query,
    getById,
    remove,
    save
}

const TOYS_FILE = 'data/toy.json'
const toys = utilService.readJsonFile(TOYS_FILE)

// Dummy msgs - until we have real msgs in the database
const msgs = [
    { id: 'm101', txt: 'Great toy, how much?', by: { _id: 'u101', fullname: 'Puki Ja' } },
    { id: 'm102', txt: 'My kids love it!', by: { _id: 'u102', fullname: 'Muki Ba' } },
]

function query(filterBy = {}) {
    var toysToReturn = toys

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        toysToReturn = toysToReturn.filter(toy => regex.test(toy.name))
    }
    if (filterBy.inStock !== undefined) {
        toysToReturn = toysToReturn.filter(toy => toy.inStock === filterBy.inStock)
    }
    if (filterBy.labels && filterBy.labels.length) {
        toysToReturn = toysToReturn.filter(toy => filterBy.labels.every(label => toy.labels.includes(label)))
    }
    if (filterBy.sortBy) {
        toysToReturn = _sortToys([...toysToReturn], filterBy.sortBy)
    }
    return Promise.resolve(toysToReturn)
}

function getById(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('No Such Toy')
    return Promise.resolve({ ...toy, msgs })
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')

    toys.splice(idx, 1)
    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No Such Toy')
        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
        toyToUpdate.labels = toy.labels
        toyToUpdate.inStock = toy.inStock
        toy = toyToUpdate
    } else {
        toy._id = utilService.makeId()
        toy.createdAt = Date.now()
        toys.push(toy)
    }
    return _saveToysToFile().then(() => toy)
}

function _sortToys(toys, sortBy) {
    if (sortBy === 'name') return toys.sort((t1, t2) => t1.name.localeCompare(t2.name))
    if (sortBy === 'price') return toys.sort((t1, t2) => t1.price - t2.price)
    if (sortBy === 'createdAt') return toys.sort((t1, t2) => t2.createdAt - t1.createdAt)
    return toys
}

function _saveToysToFile() {
    return utilService.writeJsonFile(TOYS_FILE, toys)
        .catch(err => {
            loggerService.error('Cannot write to toys file', err)
            throw err
        })
}

import sha256 from 'crypto-js/sha256.js'
import Base64 from 'crypto-js/enc-base64.js'

// тестовая версия, статичная соль
const salting = (pwd) => {
    const hash = Base64.stringify(sha256(pwd, process.env.SALT))
    return hash
}

export { salting }

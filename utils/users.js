const crypto = require('crypto');

// Khóa bí mật để mã hóa và giải mã
const secretKey = 'your_secret_key';

function encrypt(text) {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encryptedText) {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const encryptedCode = encrypt(`
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
// ...
`);

console.log(encryptedCode);
const decryptedCode = decrypt(encryptedCode);
console.log(decryptedCode);

const users = [];

function userJoin(id, username, room) {
    const user = {id, username, room};
    users.push(user);
    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}
const crypto = require('crypto');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const NodeRSA = require('node-rsa');

module.exports = {
  checksum: (path, hasher, bufferSize) => {
    const fd = fs.openSync(path, 'r');
    const hash = crypto.createHash(hasher);
    const buffer = Buffer.alloc(bufferSize);

    try {
      let bytesRead;
      do {
        bytesRead = fs.readSync(fd, buffer, 0, bufferSize, null);
        hash.update(buffer.slice(0, bytesRead));
      } while (bytesRead === bufferSize);
    } finally {
      fs.closeSync(fd);
    }
    return hash.digest('hex');
  },
  bcrypt: {
    hash: (text, rounds) => {
      return bcryptjs.hashSync(text, bcryptjs.genSaltSync(rounds));
    },
    compare: (left, right) => {
      return bcryptjs.compareSync(left, right);
    },
  },
  rsa: {
    encrypt: (value, key, type) => {
      const nodersa = new NodeRSA(
        key,
        type === 'public' ? 'pkcs8-public' : 'pkcs8-private'
      );
      if (type === 'public') {
        return nodersa.encrypt(value, 'base64', 'utf8');
      }
      return nodersa.encryptPrivate(value, 'base64', 'utf8');
    },
    decrypt: (value, key, type) => {
      const nodersa = new NodeRSA(
        key,
        type === 'public' ? 'pkcs8-public' : 'pkcs8-private'
      );
      if (type === 'public') {
        return nodersa.decryptPublic(value, 'utf8');
      }
      return nodersa.decrypt(value, 'utf8');
    },
    generateKeyPairs: (keySize) => {
      const nodersa = new NodeRSA({ b: keySize });
      return {
        publicKey: nodersa.exportKey('pkcs8-public'),
        privateKey: nodersa.exportKey('pkcs8-private'),
      };
    },
  },
};

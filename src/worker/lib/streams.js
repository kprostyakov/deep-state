const fs = require('fs')

const streams = streamType => streamHandle => {
  switch (streamType) {
    case 'localFile':
      input = fs.createReadStream(streamHandle)
    break
  }
  return inputStream
}

export default streams
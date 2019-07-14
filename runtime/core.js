const fs = require('fs')
let memory = []

module.exports = (target) => {
  if (!target) {
    console.error('Wrong execute!')
    process.exit(1)
  }
  
  let data = fs.readFileSync(target)
  data = data.toString('utf8').split(' ').join('')
  data.split('\n').forEach((v, i) => {
    let command = v.slice(0, 4)
    let arg0 = v.slice(4, 12)
    let arg1 = v.slice(12, 20)

    switch (command) {
      case '0000':
        break

      case '0001':
        memory[parseInt(arg0, 2)] = parseInt(arg1, 2)
        break

      case '0010':
        if (!memory[parseInt(arg0, 2)]) memory[parseInt(arg0, 2)] = 0
        memory[parseInt(arg0, 2)] += parseInt(arg1, 2)
        break

      case '0011':
        if (!memory[parseInt(arg0, 2)]) memory[parseInt(arg0, 2)] = 0
        memory[parseInt(arg0, 2)] -= parseInt(arg1, 2)
        break

      case '0100':
        let dum1 = ''
        for (let counter = parseInt(arg0, 2); counter <= parseInt(arg1, 2); counter++) {
          if (!memory[counter]) memory[counter] = 0
          dum1 += memory[counter]
        }
        console.log(dum1)
        break

      case '0101':
        let dum2 = ''
        for (let counter = parseInt(arg0, 2); counter <= parseInt(arg1, 2); counter++) {
          if (!memory[counter]) memory[counter] = 0
          dum2 += String.fromCharCode(memory[counter])
        }
        console.log(dum2)
        break

      case '1111':
        process.exit(parseInt(arg0, 2))

      default:
        break
    }
  })
}
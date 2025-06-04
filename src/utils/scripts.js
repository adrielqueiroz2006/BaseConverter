export function convertBase(input, inputBase, outputBase) {
  const decimalNumber = convertToDecimal(input, inputBase)

  if (inputBase !== 10 && outputBase !== 10n) {
    input = decimalNumber
  }

  if (outputBase === 10n) {
    return decimalNumber.toString()
  }

  input = BigInt(input)

  var divisionRemainders = []

  while (input > 0) {
    divisionRemainders.unshift((input % outputBase).toString())
    input = input / outputBase
    input = input >> 0n
  }

  if (outputBase === 16n) {
    divisionRemainders = divisionRemainders.map((hex) =>
      hex
        .replace('10', 'A')
        .replace('11', 'B')
        .replace('12', 'C')
        .replace('13', 'D')
        .replace('14', 'E')
        .replace('15', 'F')
    )
  }

  var convertedNumber = divisionRemainders.join('')

  return convertedNumber
}

function convertToDecimal(input, inputBase) {
  let decimalNumber = 0n
  let digits = input.toUpperCase().split('').reverse()

  if (inputBase === 16) {
    digits = digits.map((hex) =>
      hex
        .replace('A', '10')
        .replace('B', '11')
        .replace('C', '12')
        .replace('D', '13')
        .replace('E', '14')
        .replace('F', '15')
    )
  }

  for (let i = 0; i < digits.length; i++) {
    decimalNumber += BigInt(digits[i]) * BigInt(inputBase) ** BigInt(i)
  }

  return decimalNumber
}

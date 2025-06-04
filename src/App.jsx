import { useRef, useState } from 'react'

import { LuArrowLeftRight } from 'react-icons/lu'
import { IoMdAlert } from 'react-icons/io'
import { FaCalculator } from 'react-icons/fa6'

import { convertBase } from './utils/scripts'

export function App() {
  const inputRef = useRef()
  const inputBaseRef = useRef()

  const [convertedInputBase, setConvertedInputBase] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [outputBase2, setOutputBase2] = useState('')
  const [outputBase3, setOutputBase3] = useState('')
  const [outputBase8, setOutputBase8] = useState('')
  const [outputBase10, setOutputBase10] = useState('')
  const [outputBase16, setOutputBase16] = useState('')

  function handleConvert(e) {
    e.preventDefault()

    setErrorMessage('')

    const number = inputRef.current.value.toUpperCase()
    const inputBase = parseInt(inputBaseRef.current.value)

    const arrayNumbers = number.split('')

    if (!/^[0-9A-Z]+$/.test(number)) {
      setErrorMessage(
        `O número contém caracteres inválidos. Apenas letras e números são permitidos.`
      )
      return
    }

    if (inputBase !== 16) {
      if (/[A-Z]/.test(number)) {
        setErrorMessage(
          `Caracteres não numéricos não são permitidos para a base ${inputBase}`
        )
        return
      }

      if (arrayNumbers.some((char) => char >= inputBase)) {
        setErrorMessage(`Caracteres não permitidos para a base ${inputBase}`)
        return
      }
    } else {
      if (
        arrayNumbers.some((char) => {
          return /[A-Z]/.test(char) && char > 'f'
        })
      ) {
        setErrorMessage(`A base 16 só permite letras de 'a' até 'f'`)
        return
      }
    }

    setConvertedInputBase(inputBase)

    const convertedNumberBase2 = convertBase(number, inputBase, BigInt(2))
    const convertedNumberBase3 = convertBase(number, inputBase, BigInt(3))
    const convertedNumberBase8 = convertBase(number, inputBase, BigInt(8))
    const convertedNumberBase10 = convertBase(number, inputBase, BigInt(10))
    const convertedNumberBase16 = convertBase(number, inputBase, BigInt(16))

    setOutputBase2(convertedNumberBase2)
    setOutputBase3(convertedNumberBase3)
    setOutputBase8(convertedNumberBase8)
    setOutputBase10(convertedNumberBase10)
    setOutputBase16(convertedNumberBase16)
  }

  return (
    <main>
      <header>
        <FaCalculator size={30} />
        <h1>Conversor de Bases Numéricas</h1>
      </header>

      <div id="container">
        <form onSubmit={handleConvert}>
          <div className="inputsWrapper">
            <div className="inputContainer">
              <label htmlFor="input">Número</label>
              <input
                placeholder="Digite um número"
                id="input"
                type="text"
                ref={inputRef}
              />
            </div>

            <div className="inputContainer">
              <label htmlFor="inputBase">Base Entrada</label>
              <select id="inputBase" ref={inputBaseRef} defaultValue="2">
                <option value={2}>Binário (Base 2)</option>
                <option value={3}>Ternário (Base 3)</option>
                <option value={8}>Octal (Base 8)</option>
                <option value={10}>Decimal (Base 10)</option>
                <option value={16}>Hexadecimal (Base 16)</option>
              </select>
            </div>
          </div>

          {errorMessage ? (
            <div className="errorMessageContainer">
              <IoMdAlert size={20} />
              <p>{errorMessage} </p>
            </div>
          ) : null}

          <div className="buttonWrapper">
            <button type="submit">
              <div className="buttonContainer">
                <LuArrowLeftRight size={20} color="#fff" />
                <p>Converter</p>
              </div>
            </button>
          </div>
        </form>

        {outputBase2 && (
          <div id="outputContainer">
            {convertedInputBase !== 2 ? (
              <div className="outputBaseContainer">
                <p>
                  {inputRef.current.value} (Base {convertedInputBase}) =
                </p>
                <h1>{outputBase2} (Base 2)</h1>
              </div>
            ) : null}

            {convertedInputBase !== 3 ? (
              <div className="outputBaseContainer">
                <p>
                  {inputRef.current.value} (Base {convertedInputBase}) =
                </p>
                <h1>{outputBase3} (Base 3)</h1>
              </div>
            ) : null}

            {convertedInputBase !== 8 ? (
              <div className="outputBaseContainer">
                <p>
                  {inputRef.current.value} (Base {convertedInputBase}) =
                </p>
                <h1>{outputBase8} (Base 8)</h1>
              </div>
            ) : null}

            {convertedInputBase !== 10 ? (
              <div className="outputBaseContainer">
                <p>
                  {inputRef.current.value} (Base {convertedInputBase}) =
                </p>
                <h1>{outputBase10} (Base 10)</h1>
              </div>
            ) : null}

            {convertedInputBase !== 16 ? (
              <div className="outputBaseContainer">
                <p>
                  {inputRef.current.value} (Base {convertedInputBase}) =
                </p>
                <h1>{outputBase16} (Base 16)</h1>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </main>
  )
}

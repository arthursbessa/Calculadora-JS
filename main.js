const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

//Esse evento é responsavel pelo clique dos botões aparecerem no input
document.querySelectorAll('.charKey').forEach(function(charKeyBtn) {
  charKeyBtn.addEventListener('click', function() {
    const value = charKeyBtn.dataset.value
    input.value += value
  })
})

//Esse evento é responsavel pelo botão de limpar o input
document.getElementById('clear').addEventListener('click', function() {
  input.value = ''
  resultInput.value = ''
  input.focus()

  const btnCopy = document.getElementById('copyToClipboard')

  if (btnCopy.classList.contains('success')) {
    btnCopy.innerText = 'Copy'
    document.getElementById('copyToClipboard').classList.remove('success')
  }
  
  if (resultInput.classList.contains('error')) {
    resultInput.classList.remove('error')
  }
})

input.addEventListener('keydown', function(ev) {
  ev.preventDefault()
  //O IF está verificando se a tecla pressionada pelo usuario existe na lista "allowedKeys" criada acima
  //Caso exista ele vai concatenar o valor pressionado ao input
  if(allowedKeys.includes(ev.key)) {
    input.value += ev.key
    return
  }
  if(ev.key === 'Backspace') {
    input.value = input.value.slice(0, -1)
  }
  if(ev.key === 'Enter') {
    calculate()
  }
})

//Esse evento chama a função calculate
document.getElementById('equal').addEventListener('click', calculate)


function calculate() {
  //Foi adicionado o erro que caso o EVAL seja interrompido, ficará a mensagem de erro no clipboard
  resultInput.value = 'ERROR'
  resultInput.classList.add('error')
  //O método eval avalia códigos javascript e os executa
  const result = eval(input.value)
  resultInput.value = result
  resultInput.classList.remove('error')
}

document.getElementById('copyToClipboard').addEventListener('click', function(ev) {
  const button = ev.currentTarget
  if(button.innerText === 'Copy') {
    button.innerText = 'Copied!'
    button.classList.add('success')
    //Essa função navigator.clipboard adiciona valores á area de transferencia da maquina
    navigator.clipboard.writeText(resultInput.value)
  } else {
    button.innerText = 'Copy'
    button.classList.remove('success')
  }
})

document.getElementById('themeSwitcher').addEventListener('click', function() {
  //Caso o tema no data set for escuro, as variaveis do CSS serão alteradas com os valores abaixo
  if(main.dataset.theme === 'dark') {
    root.style.setProperty('--bg-color', '#f1f5f9')
    root.style.setProperty('--border-color', '#aaa')
    root.style.setProperty('--font-color', '#212529')
    root.style.setProperty('--primary-color', '#26834a')
    main.dataset.theme = 'ligth'
  } else {
    root.style.setProperty('--bg-color', '#212529')
    root.style.setProperty('--border-color', '#666')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--primary-color', '#4dff91')
    main.dataset.theme = 'dark'
  }
})
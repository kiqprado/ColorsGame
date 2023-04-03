//              Elementos necessários para o jogo.          //
const scoreEl = document.getElementById('score')
const colorParts = document.querySelectorAll('.colors')
const containerEl = document.querySelector('.container')
const startBtn = document.querySelector('#start-btn')
const resultEl = document.querySelector('#score-result')
const wrapperEl = document.querySelector('.wrapper')

//              Objeto de cores atual e novo.               //
const colorObj = {
  color1: { current: '#42AB49', new: '#00ff00' },
  color2: { current: '#8B0000', new: '#ff0000' },
  color3: { current: '#4F9CA5', new: '#0000ff' },
  color4: { current: '#FFD700', new: '#ffff00' }
}

//                Variáveis ​​do jogo.             //
let randomColors = []
let isPathGenerating = false
let score = 0
let clickCount = 0

//        Função para obter uma cor aleatória do objeto colors.     //
const getRandomColor = colorsObj => {
  const colorKeys = Object.keys(colorsObj)
  return colorKeys[Math.floor(Math.random() * colorKeys.length)]
}

//  Função para pausar a execução do jogo por um determinado tempo.  //

const delay = async time => {
  return await new Promise(resolve => setTimeout(resolve, time))
}

//        Função para gerar um caminho aleatório de cores.       //

const generateRandomPath = async () => {
  randomColors.push(getRandomColor(colorObj))
  score = randomColors.length
  isPathGenerating = true
  await showPath(randomColors)
}

//          Função para mostrar o caminho das cores ao jogador.         //

const showPath = async colors => {
  scoreEl.innerText = score
  // Percorrer cada cor no array.
  for (let color of colors) {
    const currentColor = document.querySelector(`.${color}`)
    // Pausar a execução por 500 ms.
    await delay(500)
    // Definir plano de fundo para nova cor.
    currentColor.style.backgroundColor = colorObj[color].new
    await delay(600)
    //  Definir plano de fundo para cor atual.
    currentColor.style.backgroundColor = colorObj[color].current
    await delay(600)
  }
  // Sinalizar que o jogo não está mais gerando caminho.
  isPathGenerating = false
}

//    Função para terminar o jogo e mostrar a pontuação final.     //

const endGame = () => {
  resultEl.innerHTML = `<span> Your Score : </span> ${score}`
  resultEl.classList.remove('hide')
  containerEl.classList.remove('hide')
  wrapperEl.classList.add('hide')
  startBtn.innerText = 'Play Again'
  startBtn.classList.remove('hide')
}

//      Função para reiniciar o jogo depois de terminar.         //

const resetGame = () => {
  score = 0
  clickCount = 0
  randomColors = []
  isPathGenerating = false
  wrapperEl.classList.remove('hide')
  containerEl.classList.add('hide')
  generateRandomPath()
}

//        Função para lidar com uma cor que está sendo clicada.     //

const handleColorClick = async e => {
  // se o caminho estiver sendo gerado no momento, ignore clique.
  if (isPathGenerating) {
    return false
  }
  // se a cor clicada estiver correta, atualize a pontuação e continue.
  if (e.target.classList.contains(randomColors[clickCount])) {
    e.target.style.backgroundColor = colorObj[randomColors[clickCount]].new
    await delay(500)
    e.target.style.backgroundColor = colorObj[randomColors[clickCount]].current
    clickCount++
    if (clickCount === score) {
      clickCount = 0
      generateRandomPath()
    }
    // se a cor clicada estiver incorreta, finalize.
  } else {
    endGame()
  }
}

// Event Listeners
startBtn.addEventListener('click', resetGame)
colorParts.forEach(color => color.addEventListener('click', handleColorClick))

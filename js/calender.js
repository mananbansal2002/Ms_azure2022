function setCurrentTimePosition() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay()
    const currentHour = currentDate.getHours()
    const currentMin = currentDate.getMinutes()
  
    // console.log({ currentDay }, { currentHour })
    const $currentTime = document.querySelector('.currentTime')
  
    const $calendar = document.querySelector('.calendar-week')
    let calendarBlockSize = $calendar.clientHeight
    let calendarInlineSize = $calendar.clientWidth
  
    const calendarTimezoneCellInlineSize = document.querySelector('.timezoneCell').clientWidth;
    calendarInlineSize = calendarInlineSize - calendarTimezoneCellInlineSize
  
    const cellInlineSize = calendarInlineSize / 7
  
  
    // console.log({ calendarBlockSize }, { calendarInlineSize })
    const calendarDayBlockSize = document.querySelector('.calendarDay').clientHeight
    calendarBlockSize = calendarBlockSize - calendarDayBlockSize
    // console.log({ calendarBlockSize })
    const cellBlockSize = calendarBlockSize / 24
    // console.log({ cellBlockSize }, { cellInlineSize })
  
    $currentTime.style.top = `${cellBlockSize * (currentHour) + calendarDayBlockSize + (cellBlockSize / 60) * currentMin}px`
    $currentTime.style.left = `${cellInlineSize * (currentDay) + calendarTimezoneCellInlineSize + 24}px`
  }
  
  window.intervalCurrentTimePosition = null
  
  
  function intervalCurrentTimePosition(interval = 1000) {
    clearInterval(window.intervalCurrentTimePosition)
    setCurrentTimePosition()
    window.intervalCurrentTimePosition = setInterval(setCurrentTimePosition, interval)
  }
  
  

  
const $taskCellList = document.querySelectorAll('.taskCell')

const $modal = document.querySelector('.modal')
const $closeModalButton = $modal.querySelector('#close-modal')
$modal.addEventListener('click', event => event.stopPropagation())
$closeModalButton.addEventListener('click', closeModal)

function openModal(x, y) {
  $modal.style.left = `${x}px`
  $modal.style.top = `${y}px`
  $modal.showModal()
}

function closeModal(event) {
  event.stopPropagation()
  $modal.close()
  removeActiveTaskCell()
}

function handleCreateTaskClick(event) {
  console.log(event)
  const x = event.pageX
  const y = event.pageY
  setActiveTaskCell(event.clientX, event.clientY)
  openModal(x, y)
}

let $selectedCell = null


function removeActiveTaskCell() {
  $selectedCell.classList.remove('is-active')
}

function setActiveTaskCell(x, y) {
  console.log({x}, {y})
  $selectedCell = document.elementFromPoint(x, y)
  $selectedCell.classList.add('is-active')
}

$taskCellList.forEach($taskCell => $taskCell.addEventListener('click', handleCreateTaskClick))
intervalCurrentTimePosition(5000)

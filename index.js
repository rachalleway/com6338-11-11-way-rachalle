const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (data) => {
  var poem = ''

  const [{title, author, lines}] = data

  //title and author should be h2 and h3
  poem +=
    makeTag(`h2`)(title) + pipe(makeTag(`em`), makeTag(`h3`))(`by ` + author)

  //create stanzas
  var joinLines = arr => arr.join(`<br>`)
  var splitLines = str => str.split(`<br><br>`)

  var makeStanzas = pipe(joinLines, splitLines)
  var makePoem = makeTag(`p`)

  var paraArray = makeStanzas(lines).map(str => makePoem(str))

  var paraString = paraArray.join(``)

  poem +=
    paraString
  
  return poem
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}

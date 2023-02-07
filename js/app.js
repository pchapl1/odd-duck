const SIDEBAR = document.querySelector('#sidebar')
const container = document.querySelector('#container')
let numRounds = 25;


// constructor for creating a product

function Product(name, fileExtension = 'jpg') {

    this.name = name,
    this.filePath = `img/${name}.${fileExtension}`, 
    this.shownCount = 0
    this.clicked = 0,
    this.displayInfo = function() {
        return `${this.name} had ${this.clicked} votes, and was shown ${this.shownCount} times.`
    }

}

let bag = new Product('bag')
let banana = new Product('banana')
let bathroom = new Product('bathroom')
let boots = new Product('boots')
let breakfast = new Product('breakfast')
let bubblegum = new Product('bubblegum')
let chair = new Product('chair')
let cthulhu = new Product('cthulhu')
let dogDuck = new Product('dog-duck')
let dragon = new Product('dragon')
let pen = new Product('pen')
let petSweep = new Product('pet-sweep')
let scissors = new Product('scissors')
let shark = new Product('shark')
let sweep = new Product('sweep', 'png')
let tauntaun = new Product('tauntaun')
let unicorn = new Product('unicorn')
let waterCan = new Product('water-can')
let wineGlass = new Product('wine-glass')
 

const images = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass];


function handleShowResults(event) {


    let ul = document.createElement('ul')

    sidebar.appendChild(ul)

    images.forEach((image) => {

        image.displayInfo()

        let li = document.createElement('li')

        li.textContent = image.displayInfo()

        ul.appendChild(li)

    })
}

function addShowResultsButton(){
    let h3 = document.getElementById('sidebar-header')

    h3.remove()
    
    let button = document.createElement('button')

    button.appendChild(document.createTextNode('Show Results'))

    sidebar.append(button)

    button.addEventListener('click', handleShowResults)

}

function handleClick(event){

    for (let i = 0; i < images.length; i++) {
        if (images[i].name === event.target.alt && numRounds > 0) {
            images[i].clicked ++
            clearPhotos()
            getImages()
        }
    }
    if (numRounds === 0) {
        removeEventListeners()
        addShowResultsButton()
    }

    numRounds -= 1


}


function removeEventListeners(){

    imgs = document.querySelectorAll('img')

    for (let i = 0; i < imgs.length; i++) {
        imgs[i].removeEventListener('click', handleClick)

    }

}


function clearPhotos(){

    for (let i = 0; i < 3; i++) {
        // remove the images
        if ( sidebar.nextSibling ) {
            sidebar.nextSibling.remove()
        }
    }
}

//display them side by side in the browser
const displayPhotos = (arr) => {

    arr.forEach((ele, idx) => {
        // get the intended div using the index of the loop
        // let div = document.getElementById(String(idx))


        let div = document.createElement('div')

        div.classList.add('image-size-div')

        sidebar.after(div)

        // create the image element
        let img = document.createElement('img')

        // set the filepath
        img.src = ele.filePath

        // set the id of the image to the ele.name
        img.alt = ele.name

        // append the image
        div.append(img)

        // add event listener to the image
        img.addEventListener('click', handleClick)

        // increment the showncount by 1
        ele.shownCount += 1
        
    })

}


// create an algorithm that will randomly generate three unique product images from the images directory
const getImages = (imageArr)=> {
    let photos = []

    imageArr = [...images]

    for (let i = 0; i < 3; i++) {
        let randomNum = Math.floor(Math.random() * imageArr.length);
        photos.push(imageArr.splice(randomNum, 1)[0]);
      }

      displayPhotos(photos)

      return photos
}


getImages(images)


// use lighthouse and go for a score of 80 or higher


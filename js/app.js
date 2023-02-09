const SIDEBAR = document.querySelector('#sidebar')
const container = document.querySelector('#container')
let numRounds = 10;
let resetNumRounds = 25;
let recentlyUsed = [];



pageLoad()

let images = getProducts()
// get images from local storage

function getProducts(){
    let products = localStorage.getItem('products')
    console.log(products)
    if (products) {

        let parsedData = JSON.parse(products)

        parsedData.forEach(product=>{
            let prod = new Product(
                product.name,
                product.filePath,
                product.shownCount,
                product.clicked
            )
            product = prod
        })

        return parsedData
    }
    return false
}


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


function resetPage(){

    // reset numRounds
    numRounds = resetNumRounds


    let getLocalStorage = localStorage.getItem('persistedData')
}


function getChartLabels(arr) {
    let labels = []
    arr.forEach((ele)=> {
        labels.push(ele.name)
    })
    return labels
}

function getProductLikes(arr) {
    let likes = []
    arr.forEach(ele=> {
        likes.push(ele.clicked)
    })
    return likes
}

function getProductViews(arr) {
    let views = []
    arr.forEach(ele=> {
        views.push(ele.shownCount)
    })
    return views
}

function createChart(){

    let div = document.createElement('div')

    let instructionDiv = document.querySelector('#instructions')
    //remove header from instruction div
    document.querySelector('#instruction-header').remove()
    div.classList.add('resultsChart')

    let paragraphDiv = document.querySelector('#paragraph')

    instructionDiv.appendChild(div)

    let productLabels = getChartLabels(images)

    let productLikes = getProductLikes(images)

    let productViews = []

    // create chart
    let ctx = document.createElement('canvas')

    div.appendChild(ctx)

    new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productLabels,
        datasets: [{
        label: '# of Votes',
        data: productLikes,
        borderWidth: 1
        },
        {
            label: '# of times shown',
            data: productLikes,
            borderWidth: 1
        }
    ],
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
    });

}

function rebaseProduct(product){
    let prod = new Product(
        product.name,
        product.filePath,
        product.shownCount,
        product.clicked
    )
    console.log(prod)
    return prod
}

function handleShowResults(event) {

    console.log('handle show results: ', images)
    let ul = document.createElement('ul')

    sidebar.appendChild(ul)

    images.forEach((image) => {

        // image.displayInfo()

        let li = document.createElement('li')

        // li.textContent = image.displayInfo()

        ul.appendChild(li)

    })

    createChart()

    let button = document.querySelector('button')
    button.remove()
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
    event.preventDefault()

    console.log('handle click: ', images)

    for (let i = 0; i < images.length; i++) {
        if (images[i].name === event.target.alt && numRounds > 0) {
            images[i].clicked ++
            clearPhotos()
            getImages(images)
            let stringifiedData = JSON.stringify(images)
            localStorage.setItem('products', stringifiedData)

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
function displayPhotos(arr){

    arr.forEach((ele, idx) => {

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

function getImages(imageArr) {
    let photos = []


    // imageArr = [...images]

    while ( photos.length < 3 && recentlyUsed.length < 6 ) {

        let randomNum = Math.floor(Math.random() * imageArr.length);

        if (!recentlyUsed.includes(randomNum)) {

            recentlyUsed.push(randomNum)

            photos.push(imageArr[randomNum])
        }
    }
    // set the list to the last 3 indexes
    recentlyUsed = recentlyUsed.slice(-3)
   

    displayPhotos(photos)

    return photos
}

// let images = getProducts()

function pageLoad(){

    let images = getProducts()

    if (images) {
        getImages(images)
    }

    if (!images) {
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
        let stringifiedData = JSON.stringify(images)

        localStorage.setItem('products', stringifiedData)

        getImages(images)

        return images
    }


}







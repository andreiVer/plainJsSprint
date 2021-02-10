const url = window.location.host;
 // I am using a self invoking function to run the code once everything is rendered. 
(()=>{
    document.getElementsByClassName('my-name')[0].textContent = "Andrei Verdes";
    document.getElementsByName('sort')[0].addEventListener('click', ()=>{
        sortCards();
    });
    document.getElementsByName('shuffle')[0].addEventListener('click', ()=>{
        shuffleCards();
    });

    let generateCard = (name, color) => {
        // I am creating an empty placeholder element.
        let helpBlock = document.createElement('div');
        
        // I am creating the card element using string literals. White spaces are trimmed at the end. 
        helpBlock.innerHTML = `
            <div class="card">
                <div class="card-color">
                </div>
                <h1>${name}</h1>
            </div>
        `.trim();
        
        /*
            I have conssidered different ways of doing the background color for the card
            mainly due to the different aspects on the different screens.
            I think giving it its own div is the simplest. 
             
        */  
        helpBlock.querySelector('.card-color').style.backgroundColor = color;

        return helpBlock;
    };

    // I expect these to come from an API.
    let getElements = new Promise((resolve)=>{
        fetch(`data/elements.json`).then( (response) =>{
            return response.json();
    
        }).then(data=>{
            resolve(data.elements);  
    
        })
    }) 


    let [cardsPannel] = document.getElementsByClassName('cards-pannel');
    
    // Initial render of the cards.
    getElements.then((elements)=>{
        updateCards(elements);
    })

  
    let updateCards = (elements) => {
            // I am using this method to update the card panel.
        let cards = document.createElement('div');

        elements.forEach(element => {
            let card = generateCard(element.name, element.color);
            cards.appendChild(card.firstChild);
        });
        cardsPannel.innerHTML = cards.innerHTML;
    };

    let shuffleCards = () => {
        getElements.then((elements)=>{

            // I will use the Fisher - Yates random algoritm. Any randomizer would work..
            for(i=0; i<=elements.length-2; i++){

                const j = Math.floor(Math.random()*(i+2));
                
                // Thank you ES6 for the array element swap shorthand.
                [elements[i], elements[j]] = [elements[j], elements[i]] 
            }

            updateCards(elements);

        })
    }

    let  sortCards = () => {
        getElements.then((elements)=>{

            // Sorting elements by their value.
            elements.sort((x, y)=>{
                return x.value - y.value;
            });
        
            updateCards(elements);
        })
    }
})();



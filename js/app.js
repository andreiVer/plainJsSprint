const url = window.location.host;
(()=>{
    document.getElementsByClassName('my-name')[0].textContent = "Andrei Verdes";
    document.getElementsByName('sort')[0].addEventListener('click', ()=>{
        sortCards();
    });
    document.getElementsByName('shuffle')[0].addEventListener('click', ()=>{
        shuffleCards();
    });

    let generateCard = (name, value, color) => {
        let helpBlock = document.createElement('div');
        helpBlock.innerHTML = `
            <div class="card">
                <div class="card-color">
                </div>
                <h1>${name}</h1>
            </div>
        `.trim();

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
    

    getElements.then((elements)=>{
        updateCards(elements);
    })

  
    let updateCards = (elements) => {
        
        let cards = document.createElement('div');

        elements.forEach(element => {
            let card = generateCard(element.name, element.value, element.color);
            cards.appendChild(card.firstChild);
        });
        cardsPannel.innerHTML = cards.innerHTML;
    };

    let shuffleCards = () => {
        getElements.then((elements)=>{
            // I  will use the Fisher - Yates algoritm.
            for(i=0; i<=elements.length-2; i++){

                const j = Math.floor(Math.random()*(i+2));
                
                [elements[i], elements[j]] = [elements[j], elements[i]] 
            }

            updateCards(elements);

        })
    }

    let  sortCards = () => {
        getElements.then((elements)=>{
            elements.sort((x, y)=>{
                return x.value - y.value;
            });
        
            updateCards(elements);
        })
    }
})();



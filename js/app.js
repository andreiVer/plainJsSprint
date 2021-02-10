const url = window.location.host;
(()=>{
    document.getElementsByClassName('my-name')[0].textContent = "Andrei Verdes";
    
    let generateCard = (name, value, color) => {
        let helpBlock = document.createElement('div');
        helpBlock.innerHTML = `
            <div class="card">
                <div class="card-color">
                </div>
                <h1>${name}</h1>
            </div>
        `.trim();

        helpBlock.firstChild.style.backgroundColor = color;
        helpBlock.querySelector('.card-color').style.backgroundColor = color;




        return helpBlock;
    };

    let getElements = new Promise((resolve)=>{
        fetch(`data/elements.json`).then( (response) =>{
            return response.json();
    
        }).then(data=>{
            resolve(data.elements);  
    
        })
    }) 


    let [cardsPannel] = document.getElementsByClassName('cards-pannel');
    
    let cards = document.createElement('div');

    getElements.then((elements)=>{
        elements.forEach(element => {
            let card = generateCard(element.name, element.value, element.color);
            cards.appendChild(card.firstChild);
        });
        cardsPannel.innerHTML = cards.innerHTML;
    })

  

    let shuffleCards = () => {

    }

    let  sortCards = () => {
        elements

    }
})();



describe('Los estudiantes monkey', () => {
    it('survives monkey', () => {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
    });
});

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const Exists = (selector, fn ,monkeys) => {
    cy.get('body').then($body => {
        if($body.find(selector).length > 0){
            fn(monkeys);
        }
        else{
            randomEvent(monkeys);
        }
    })
}

const randomClick = (monkeys) => {
    cy.get('a').then($links => {
        var link = $links.get(getRandomInt(0, $links.length));
        if(!Cypress.dom.isHidden(link)) {
            cy.wrap(link).click({force: true});
            monkeys = monkeys - 1;
        }
        cy.wait(1000);
        randomEvent(monkeys)
    });
}

const randomButtonClick = (monkeys) => {
    cy.get('button').then($buttons => {
        var button = $buttons.get(getRandomInt(0, $buttons.length));
        if(!Cypress.dom.isHidden(button)) {
            cy.wrap(button).click({force: true});
            monkeys = monkeys - 1;
        }
        cy.wait(1000);
        randomEvent(monkeys);
    });
}

const randomComboBox = (monkeys) => {
    cy.get('select').then($selects => {
        var rselect = $selects.get(getRandomInt(0, $selects.length));
        if(!Cypress.dom.isHidden(rselect)) {
            var options = rselect.children;
            options = Array.from(options).filter( option  => !option.disabled);
            console.log(options)
            var rvalue = options[getRandomInt(0, options.length)].value;
            cy.wrap(rselect).select(rvalue, {force: true});
            monkeys = monkeys - 1;
        }
        cy.wait(1000);
        randomEvent(monkeys);
    })
}

const randomText = (monkeys) => {
    cy.get('input').then($inputs => {
        var txt =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
        var input = $inputs.get(getRandomInt(0,$inputs.length));
        if(!Cypress.dom.isHidden(input)){
            cy.wrap(input).type(txt+'{enter}', {force: true});
            monkeys = monkeys - 1;
        }
        cy.wait(1000);
        randomEvent(monkeys);
    })
}

const randomFunctions = [randomText, randomClick, randomButtonClick, randomComboBox];
const selectors = ['input','a','button','select'];

const randomEvent = (monkeys) => {
    if(monkeys > 0){
        var option = getRandomInt(0,randomFunctions.length);
        Exists(selectors[option],randomFunctions[option],monkeys);
    }
}
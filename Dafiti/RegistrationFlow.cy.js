
import dafiti from "../../fixtures/RegisterDafiti.json"

const getModulo = (dividendo, divisor) => {
    return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
}

const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const getNumerosRandomicos = (total) => {
    let numbers = [];
    for (let i = 0; i < total; i++) {
        numbers[i] = getRandomNumberBetween(1, 9);
    }
    return numbers;
}


const getDigitoVerificadorCpf = (numeros = []) => {
    let digito = 0;
    let arraySize = numeros.length + 1;

    numeros.map((numero, index) => {
        digito += numero * (arraySize - index);
    });

    digito = 11 - (getModulo(digito, 11));
    return digito >= 10 ? 0 : digito;
}

const gerarCpfFake = () => {
    let numeros = getNumerosRandomicos(9);
    numeros.push(getDigitoVerificadorCpf(numeros));
    numeros.push(getDigitoVerificadorCpf(numeros));

    return numeros.join('');
}


const CpfConcat = "SreQAGuardians" + gerarCpfFake() + "@hotmail.com"


describe('Must register the user', () => {


    it('Visit the website Dafiti', () => {
        cy.clearCookies()
        cy.wait(500)
        cy.visit('https://www.dafiti.com.br')
    })
    it('Access the login modal', () => {

        cy.get('.header-login-link').click({ force: true })
    })

    it('Access the option: I want to register', () => {
        cy.get(':nth-child(2) > .accordion-link').click({ force: true })
    })
    it('Fill in the data for user registration', () => {
        cy.viewport(2000, 800)
        cy.get('[for="RegistrationForm_customer_personality_0"]').should('be.visible', 'Pessoa Física')
        cy.get('#RegistrationForm_first_name').type('SreQAGuardians')
        cy.get('#RegistrationForm_last_name').type('SreQAGuardians')
        cy.get('#RegistrationForm_email').type(CpfConcat, { parseSpecialCharSequences: false })
        cy.get('#RegistrationForm_gender').select('Masculino')
        cy.get('#RegistrationForm_tax_identification').type(gerarCpfFake())
        cy.get('#RegistrationForm_day').select('24', { force: true })
        cy.get('#RegistrationForm_day').select('24', { force: true })
        cy.get('#RegistrationForm_month').select('07', { force: true })
        cy.get('#RegistrationForm_month').select('07', { force: true })
        cy.get('#RegistrationForm_year').select('1995', { force: true })
        cy.get('#RegistrationForm_year').select('1995', { force: true })
        cy.wait(5000)
        cy.get('#form-customer-account-password').type(dafiti.senha)
        cy.wait(1000)
        cy.get('#RegistrationForm_password2').type(dafiti.senha)
        cy.get('#customer-account-create').click({ force: true })
        cy.wait(3000)


    })

})


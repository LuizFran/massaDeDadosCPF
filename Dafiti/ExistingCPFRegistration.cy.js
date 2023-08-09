
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


describe('Must perform the user registration flow with existing CPF', () => {
    beforeEach(() => {
        cy.viewport(2000, 800)
    })

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
    it('Fill in the users first and last name for registration', () => {

        cy.get('#RegistrationForm_first_name').type('Teste')
        cy.get('#RegistrationForm_last_name').type('Teste Dafiti')
    })

    it('Fill in an e-mail ', () => {

        cy.get('#RegistrationForm_email').type(CpfConcat, { parseSpecialCharSequences: false })
        cy.get('#RegistrationForm_gender').select('Masculino')

    })

    it('Fill in with a CPF already registered in the system', () => {

        cy.get('#RegistrationForm_tax_identification').type('86994911071')
    })

    it('Fill in birth details', () => {

        cy.get('#RegistrationForm_day').select('24', { force: true })
        cy.get('#RegistrationForm_day').select('24', { force: true })
        cy.get('#RegistrationForm_month').select('07', { force: true })
        cy.get('#RegistrationForm_month').select('07', { force: true })
        cy.get('#RegistrationForm_year').select('1995', { force: true })
        cy.get('#RegistrationForm_year').select('1995', { force: true })
        cy.wait(5000)
    })

    it('Once the data is filled in, then click on the register button ', () => {

        cy.get('#form-customer-account-password').type('testeqadft@22')
        cy.wait(1000)
        cy.get('#RegistrationForm_password2').type('testeqadft@22')
        cy.get('#customer-account-create').click({ force: true })
        cy.wait(3000)
    })

    it('User message with data already registered', () => {
        cy.contains('E-mail ou CPF já cadastrado(s)').should('be.visible')
    })

})
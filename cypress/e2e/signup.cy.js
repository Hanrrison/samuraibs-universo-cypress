import signup from '../support/pages/signup'
import SignupPage from '../support/pages/signup'

describe('Cadastro', function () {

    context('quando o usuário é novato', function () {

        const user = {
            name: 'Hanrrison Oliveira',
            email: 'hanrrison.dos@gmail.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {

            SignupPage.go()
            SignupPage.form(user)
            SignupPage.submit()
            SignupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })


    context('quando o email já existe', function () {
        const user = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {

            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('não deve cadastrar o usuário', function () {

            SignupPage.go()
            SignupPage.form(user)
            SignupPage.submit()
            SignupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })
    })

    context('quando a senha é muito curta', function () {

        const passwords = ['1', '2a', '123', '1234', '54321']

        beforeEach(function () {
            SignupPage.go()
        })

        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha: ' + p, function () {

                const user = {
                    name: 'Jason Friday',
                    email: 'jason@gmail.com',
                    password: p
                }

                SignupPage.form(user)
                SignupPage.submit()
            })
        })

        afterEach(function () {
            SignupPage.alertHaveText('Pelo menos 6 caracteres')
        })

    })

    context('quando não preencho nenhum dos campos', function(){

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function(){
            SignupPage.go()
            SignupPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLowerCase(), function(){
                SignupPage.alertHaveText(alert)
            })
        })

    })


})



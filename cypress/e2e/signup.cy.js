import signup from '../support/pages/signup'
import signupPage from '../support/pages/signup'

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

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

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
            cy.postUser(user)
        })

        it('não deve cadastrar o usuário', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })
    })

    context('quando o email é incorreto', function () {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123'
        }

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta', function () {

        const passwords = ['1', '2a', '123', '1234', '54321']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha: ' + p, function () {

                const user = {
                    name: 'Jason Friday',
                    email: 'jason@gmail.com',
                    password: p
                }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })

    })

    context('quando não preencho nenhum dos campos', function () {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                signupPage.alert.haveText(alert)
            })
        })

    })


})


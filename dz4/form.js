
// let nameForm = document.querySelector('.form-name')
// let phoneForm = document.querySelector('.form-phone')
// let mailForm = document.querySelector('.form-mail')

// let clickName = document.querySelector('.form-serch')


// clickName.addEventListener('submit', e => {
//     e.preventDefault()
//     filterName(document.querySelector('.form-name').value)
//     filterPhone(document.querySelector('.form-phone').value)
//     filterMail(document.querySelector('.form-mail').value)
// })

// function filterName(value) {
//     const regexp = /[а-яА - ЯёЁa-z]/
//     if (regexp.test(value)) nameForm.classList.remove('error')
//     else nameForm.classList.add('error')
// }

// function filterPhone(value) {
//     const regexp = /\d[0-9]{15}/
//     if (regexp.test(value)) phoneForm.classList.remove('error')
//     else phoneForm.classList.add('error')
// }
// function filterMail(value) {
//     const regexp = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$\s/
//     if (regexp.test(value)) mailForm.classList.remove('error')
//     else mailForm.classList.add('error')
// }


class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-я]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            mail: /^[\w.-]+@\w+\.[a-z]{2,4}$/i
        }
        this.errors = {
            name: 'Имя содержит только буквы.',
            phone: 'Телефон имеет вид +7(000)000-0000.',
            mail: 'E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.'
        }
        this.errorClass = 'error-msg'
        this.form = form
        this.valid = false
        this._validateForm()
    }
    validate(regexp, value) {
        regexp.test(value)
    }
    _validateForm() {
        //Ищем в форме все классы 'error-msg' и удаляем их
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)]
        for (let error of errors) {
            error.remove()
        }
        //добавляем в массив все инпуты 
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')]
        for (let field of formFields) {
            this._validate(field)
        }
        if (![...document.getElementById(this.form).querySelectorAll('.invalid')].length) {
            this.valid = true
        }
    }
    // 
    _validate(field) {
        if (this.patterns[field.name]) {
            if (!this.patterns[field.name].test(field.value)) {
                field.classList.add('invalid')
                this._addErrorMsg(field)
                this._watchField(field)
            }
        }
    }
    _addErrorMsg(field) {
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div>`
        field.parentNode.insertAdjacentHTML('beforeend', error)
    }
    _watchField(field) {
        field.addEventListener('input', () => {
            // console.log(field.parentNode.querySelector(this.errorClass))
            let error = field.parentNode.querySelector(`.${this.errorClass}`)
            if (this.patterns[field.name].test(field.value)) {
                field.classList.remove('invalid')
                field.classList.add('valid')
                if (error) {
                    error.remove()
                }
            } else {
                field.classList.remove('valid')
                field.classList.add('invalid')
                if (!error) {
                    this._addErrorMsg(field)
                }
            }
        })
    }
}

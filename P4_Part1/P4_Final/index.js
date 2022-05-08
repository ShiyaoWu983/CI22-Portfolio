let totalMoney = 0
function addRecord(name, money) {

    const item = `<div class="item">
                    <div>${name}</div>
                    <div>$${money}</div>
                </div>`
    document.querySelector('.bill .list').innerHTML += item
    totalMoney += parseFloat(money)
    totalDom.innerHTML = totalMoney
}

const nameDom = document.querySelector('#nameId')
const totalDom = document.querySelector('#totalId')
const integerValueDom = document.querySelector('#integerValue')
const decimalValueDom = document.querySelector('#decimalValue')

const keyButtons = document.querySelectorAll('.calculator .keyboard>div')



let numType = 'integer' // 当前输入的是整数还是小数
let operationType = ''
let prevValue = 0
let integerNum = ''
let decimalNum = ''
function setValue(i, d) {
    integerValueDom.innerHTML = i || '0'
    decimalValueDom.innerHTML = d || '00'
}

keyButtons.forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.classList.add('key-pressed')
    })
    btn.addEventListener('mouseup', () => {
        btn.classList.remove('key-pressed')
    })
    btn.addEventListener('click', e => {
        let n = btn.innerHTML
        switch (btn.dataset.type) {
            case 'num':
                if (numType == 'integer') {
                    integerNum += n
                } else if (numType == 'decimal') {
                    decimalNum += n
                }
                setValue(integerNum, decimalNum)
                break
            case 'del':
                let d = decimalValueDom.innerHTML // 小数
                let i = integerValueDom.innerHTML // 整数
                if (d == '0') {
                    if (i == '0') {

                    } else {
                        integerValueDom.innerHTML = i.substring(0, i.length - 1)
                        if (integerValueDom.innerHTML == '') {
                            integerValueDom.innerHTML = '0'
                        }
                    }
                } else {
                    decimalValueDom.innerHTML = d.substring(0, d.length - 1) //删掉最后一位
                    if (decimalValueDom.innerHTML == '') {
                        decimalValueDom.innerHTML = '0'
                    }
                }
                break
            case 'add':
                // 缓存上一个值
                prevValue = parseFloat(integerNum + '.' + decimalNum)
                operationType = 'add'

                setValue()
                integerNum = ''
                decimalNum = ''
                break
            case 'sub':
                // 缓存上一个值
                prevValue = parseFloat(integerNum + '.' + decimalNum)
                operationType = 'sub'

                setValue()
                integerNum = ''
                decimalNum = ''
                break
            case 'point':
                numType = 'decimal' // 切换小数输入
                break
            case 'eq':
                eq()
                break
            case 'ok':
                eq()

                let name = nameDom.value
                let money = integerValueDom.innerHTML + '.' + decimalValueDom.innerHTML

                if (name == '') {
                    alert("请输入明细")
                    break
                }

                addRecord(name, money)

                setValue()
                numType = 'integer' // 当前输入的是整数还是小数
                operationType = ''
                prevValue = 0
                integerNum = ''
                decimalNum = ''
                nameDom.value = ''
                break
        }
    })
})

function eq() {
    if (operationType == '') { // 此时没有任何运算
        return
    } else {
        currentValue = parseFloat(integerValueDom.innerHTML + '.' + decimalNum.innerHTML)
        let val
        if (operationType == 'add') {
            val = prevValue + currentValue + ''
        } else if (operationType == 'sub') {
            val = prevValue - currentValue + ''
        }

        let arr = val.split('.')
        if (arr.length == 1) {
            // 没有小数部分
            setValue(arr[0], '00')
        } else {
            setValue(arr[0], arr[1])
        }

        operationType = ''
    }

}
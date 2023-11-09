let fstNam = document.getElementById('first-name')
let lstNam = document.getElementById('last-name')
let countries = document.getElementById('country')
let score = document.getElementById('player-score')
let validationMasg = document.getElementById('alart')
let table = document.getElementById('player')
let rgxPattern = /[0-9]/ig
let rgxPattern2 = /[a-zA-Z]/i
let data = []
let fullDate = new Date()


function loadPlayer() {
    if (fstNam.value.trim() == "" || lstNam.value.trim() == "" || countries.value.trim() == "" || score.value.trim() == "") {
        validationMasg.innerHTML = `All fields are required`
    } else if (fstNam.value.trim().match(rgxPattern) || lstNam.value.trim().match(rgxPattern) || countries.value.trim().match(rgxPattern) || score.value.trim().match(rgxPattern2)) {
        validationMasg.innerHTML = `Please input valid value`
    } else {
        let usersData = {
            firstName: fstNam.value,
            lastName: lstNam.value,
            countryName: countries.value,
            playerScore: Number(score.value),
        }
        data.push(usersData)
        validationMasg.innerHTML = ""
    }
    sortedPlayerScore()
    addNewRowOfPlayer(data)
}


function sortedPlayerScore() {
    let sortedPlayer = data.sort((a, b) => b.playerScore - a.playerScore)

}


function addNewRowOfPlayer(playerdata) {
    table.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        let row = table.insertRow(-1)
        let cell1 = row.insertCell(0)
        let cell2 = row.insertCell(1)
        let cell3 = row.insertCell(2)
        let cell4 = row.insertCell(3)

        row.classList.add('br-bot')
        let nameNDate = document.createElement('div')
        let fullName = document.createElement('p')
        let addDate = document.createElement('p')
        nameNDate.classList.add('d-flex', 'flex-column')
        fullName.classList.add('m-0')
        addDate.classList.add('m-0', 'font-w')

        nameNDate.append(fullName)
        nameNDate.append(addDate)
        cell1.append(nameNDate)

        fullName.innerHTML = playerdata[i].firstName + " " + playerdata[i].lastName
        addDate.innerHTML = fullDate
        cell2.innerHTML = playerdata[i].countryName
        cell3.innerHTML = playerdata[i].playerScore

        let cellbtns = document.createElement('div')
        cellbtns.classList.add('d-flex', 'flex-row')
        let userdelet = document.createElement('button')
        userdelet.classList.add('bg-white', 'text-danger', 'row-btn', 'del-btn')
        userdelet.setAttribute("dataid", i)
        userdelet.type = 'button'
        let deleticon = document.createElement('i')
        deleticon.classList.add('fa-solid', 'fa-trash-can', 'del-btn')
        userdelet.append(deleticon)

        let addscore = document.createElement('button')
        addscore.setAttribute("add5", i)
        let lessscore = document.createElement('button')
        lessscore.setAttribute("less5", i)
        addscore.classList.add('bg-white', 'text-primary', 'row-btn', 'pluse-btn')
        lessscore.classList.add('bg-white', 'text-primary', 'row-btn', 'less-btn')

        addscore.innerHTML = '+5'
        lessscore.innerHTML = '-5'

        cellbtns.append(userdelet)
        cellbtns.append(addscore)
        cellbtns.append(lessscore)
        cell4.append(cellbtns)



    }

}


document.body.addEventListener("click", function (event) {

    if (event.target.classList.contains("del-btn")) {

        var x = event.target.getAttribute("dataid");
        data.splice(Number(x), 1)
        addNewRowOfPlayer(data)
    }
});

document.body.addEventListener("click", function (event) {

    if (event.target.classList.contains("pluse-btn")) {
        let y = event.target.getAttribute("add5");
        data[y].playerScore = data[y].playerScore + 5
        sortedPlayerScore()
        addNewRowOfPlayer(data)
    }
});



document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("less-btn")) {
        let z = event.target.getAttribute("less5");
        data[z].playerScore = data[z].playerScore - 5
        sortedPlayerScore()
        addNewRowOfPlayer(data)
    }
})
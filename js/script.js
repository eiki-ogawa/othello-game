class Othello {
    constructor() {
        this.board_element = document.getElementById("board");
    }

    startGame() {
        this.createBoard()
    }

    createBoard() {

        for (let i = 1; i <= 8; i++) {
            var tr = document.createElement("tr");
            for (let j = 1; j <= 8; j ++) {
                var td = document.createElement("td");
                var div = document.createElement("div");
                if (i == 3 && j == 3) {
                    div.className = "piece black";
                }
                if (i == 3 && j == 4) {
                    div.className = "piece white";
                }
                td.appendChild(div);
                tr.appendChild(td);
            }
            this.board_element.appendChild(tr);
        }
    }
}
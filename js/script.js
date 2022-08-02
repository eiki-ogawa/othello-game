class Othello {
    constructor() {
        // オセロ盤の要素（table）
        this.board_element = document.getElementById("board");
        // 手番
        this.whitch_turn = "black";
    }

    // index.html から呼ばれる
    startGame() {
        this.createBoard()
        // 初期配置
        this.put_piece(3,3)
        this.put_piece(3,4)
        this.put_piece(4,4)
        this.put_piece(4,3)

        // 盤面がクリックされたら駒を置く
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                document.getElementById(i + " " + j).addEventListener(
                    "click", (e) => this.put_piece(i, j), false
                    );
            }
        }
    }

    //ボードをセットする
    createBoard() {
        for (let i = 0; i < 8; i++) {
            var tr = document.createElement("tr");
            for (let j = 0; j < 8; j ++) {
                var td = document.createElement("td");
                var div = document.createElement("div");
                if (i == 3 && j == 3) {
                    div.className = "piece black";
                }
                if (i == 3 && j == 4) {
                    div.className = "piece white";
                }
                // idに座標を入力
                div.id = i + " " + j
                td.appendChild(div);
                tr.appendChild(td);
            }
            this.board_element.appendChild(tr);
        }
    }

    // 駒を置く
    put_piece(x, y) {
        var target_elem = document.getElementById(x + " " + y);
        target_elem.className = "piece " + this.whitch_turn;
        this.change_turn()
    }

    // 手番を変える
    change_turn() {
        if(this.whitch_turn == "black") {
            this.whitch_turn = "white";
        } else {
            this.whitch_turn = "black";
        }
    }
}
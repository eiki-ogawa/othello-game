class Othello {
    constructor() {
        // オセロ盤の要素（table）
        this.board_element = document.getElementById("board");
        // 手番
        this.whitch_turn = "black";
    }

    // 駒を指定する
    target_piece(x, y) {
        try {
            var result = document.getElementById(x + "," + y);
        } catch {
            return false;
        }
        return result
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
                this.target_piece(i, j).addEventListener(
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
                
                // idに座標を入力
                div.id = i + "," + j;
                div.className = "none";
                td.appendChild(div);
                tr.appendChild(td);
            } 
            this.board_element.appendChild(tr);
        }
    }

    // 駒を置く
    put_piece(x, y) {
        var count = this.turn_over(x, y);
        this.target_piece(x, y).className = this.whitch_turn;
        this.whitch_turn = this.change_color(this.whitch_turn);
    }

    // 駒を返す
    turn_over(x_basis, y_basis) {
        var reverse_count = 0;
        var basis_position = [x_basis, y_basis];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) continue;
                var direction = [i, j];
                var count = this.turn_piece_check(0, basis_position, direction);
                for (let k = 0; k <= count; k++) {
                    this.target_piece(x_basis + i * k, y_basis + j * k).className = this.whitch_turn;
                }
                reverse_count += count;
            }
        }
        return reverse_count;
    }

    turn_piece_check(count, basis_position, direction) {
        try {
            var next_position = [basis_position[0] + direction[0], basis_position[1] + direction[1]];
            var next_piece_color = this.target_piece(next_position[0], next_position[1]).className;
        } catch {
            return false;
        }

        if (next_piece_color == "none") {
            return 0;
        } else if (next_piece_color == this.whitch_turn){
            return count;
        } else {
            count = this.turn_piece_check(count + 1, next_position, direction);
        }
        return count;
    }

    // 白黒を変える
    change_color(target) {
        if (target == "black") {
            target = "white";
        } else {
            target = "black";
        }
        return target;
    }
}
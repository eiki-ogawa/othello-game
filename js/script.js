class Othello {
    constructor() {
        // オセロ盤の要素（table）
        this.board_element = document.getElementById("board");
        // 手番
        this.whitch_turn = "black";
        // 
        this.black_result = document.getElementById("black-result");
        this.white_result = document.getElementById("white-result");
        // 駒のカウント
        this.black_count = document.getElementById("black-count");
        this.white_count = document.getElementById("white-count");
    }

    // 駒を指定する
    target_piece(x, y) {
        try {
            var result = document.getElementById(x + "," + y);
        } catch {
            return false;
        }
        return result;
    }

    // index.html から呼ばれる
    startGame() {
        this.createBoard()
        // 初期配置
        this.put_piece(3, 4, false)
        this.put_piece(3, 3, false)
        this.put_piece(4, 3, false)
        this.put_piece(4, 4, false)

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

                // 円の追加
                if (i % 4 == 1 && j % 4 == 1) {
                    td.className = "under-right";
                }
                if (i % 4 == 2 && j % 4 == 1) {
                    td.className = "top-right";
                }
                if (i % 4 == 1 && j % 4 == 2) {
                    td.className = "under-left";
                }
                if (i % 4 == 2 && j % 4 == 2) {
                    td.className = "top-left";
                }

                tr.appendChild(td);
            } 
            this.board_element.appendChild(tr);
        }
    }

    // 駒を置く
    put_piece(x, y, check = true) {
        if (check) {
            if (this.target_piece(x, y).className == "none") {
                var count = this.turn_over(x, y);
                if (count == 0) {
                    return false
                }
                this.target_piece(x, y).className = this.whitch_turn;

                // 駒の置ける場所を数える
                var now_count_places = this.count_places();

                // ターンを変える
                this.whitch_turn = this.change_color(this.whitch_turn);
                this.turn_classname(this.whitch_turn)

                // 駒の置ける場所を数える
                var next_count_places = this.count_places();

                if (!next_count_places && now_count_places) {
                    // 置ける場所が無かったらパス
                    alert("パス");
                    // ターンを再度、変える
                    this.whitch_turn = this.change_color(this.whitch_turn);
                    this.turn_classname(this.whitch_turn)
                }
                // 数を数える
                var piece_count = this.total_piece_count();
                var black_count = piece_count[0];
                var white_count = piece_count[1];

                if (!next_count_places && !now_count_places) {
                    if (black_count < white_count) {
                        alert("白の勝ち！");
                    } else if (black_count > white_count) {
                        alert("黒の勝ち！");
                    } else {
                        alert("引き分け！");
                    }
                }

            } else {
                // クリックしたマスに既に駒が置かれている場合
                return false;
            }
        } else {
            // 駒を置く
            this.target_piece(x, y).className = this.whitch_turn;
            var black_count, white_count = this.total_piece_count()
            // ターンを変える
            this.whitch_turn = this.change_color(this.whitch_turn);
            this.turn_classname(this.whitch_turn)
        }
    }

    // 駒を返す
    turn_over(x_basis, y_basis, check = true) {
        var reverse_count = 0;
        var basis_position = [x_basis, y_basis];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) continue;
                var direction = [i, j];
                var count = this.turn_piece_check(0, basis_position, direction);
                if (check) {
                    for (let k = 1; k <= count; k++) {
                        this.target_piece(x_basis + i * k, y_basis + j * k).className = this.whitch_turn;
                    }
                }
                reverse_count += count;
            }
        }
        return reverse_count;
    }

    // 駒を返すチェックを行う
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

    // 合計の駒数を数える
    total_piece_count() {
        var black_count = 0;
        var white_count = 0;

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j ++) {
                if (this.target_piece(i, j).className == "black") {
                    black_count += 1;
                } else if (this.target_piece(i, j).className == "white") {
                    white_count += 1;
                }
            }
        }
        this.black_count.textContent = black_count;
        this.white_count.textContent = white_count;

        return [black_count, white_count];
    }

    // 駒の置ける場所を数える
    count_places() {
        var can_put = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j ++) {
                if (this.target_piece(i, j).className == "none") {
                    var count = this.turn_over(i, j, false);
                    if (count != 0) {
                        can_put.push([i, j]);
                    }
                }
            }
        }
        if (can_put.length == 0) {
            return false;
        }
        return can_put;
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

    // 手番を表示するClass名を変える
    turn_classname(color) {
        if (color == "black") {
            this.white_result.className = "result";
            this.black_result.className = "result selected";
        } else {
            this.black_result.className = "result";
            this.white_result.className = "result selected";
        }
    }
}
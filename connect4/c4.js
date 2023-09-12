const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 6;

var playerTurn = true;
var board = Array(BOARD_WIDTH).fill('')
var gameover = 0;



function playerMove(column) {
    if (!playerTurn || board[column].length >= BOARD_HEIGHT) return;
    
    updateBoard('O', column)

    manageBoardClickability(false)

    gameover = isGameOver()
    console
    if (gameover == 'O') {
        $('#game-status').html('Game Over - You win!')
        return;
    }

    // calculate next move and execute it after 1s has passed
    start = new Date()
    aiColumn = move('X', board)
    end = new Date()

    delay = Math.max(0, 1000 - (end - start))
    setTimeout(() => {
        updateBoard('X', aiColumn)

        gameover = isGameOver()
        if (gameover == 'X') {
            $('#game-status').html('Game Over - AI wins')
            return;
        }

        manageBoardClickability(true)
    }, delay);
}

// omg this name
function manageBoardClickability(canClick) {
    playerTurn = canClick;
    if (playerTurn) $('.board').removeClass('disabled')
    else $('.board').addClass('disabled')

    // update each column
    for (let i = 0; i < BOARD_WIDTH; i++) {
        if (board[i].length == BOARD_HEIGHT) {
            $(`#c${i}`).addClass('disabled')
        }
    }
}

function isGameOver() {
    // Tests winning condition
    const dirs = [[0, 1], [1, 1], [1, 0], [1, -1]];

    for (let i = 0; i < BOARD_WIDTH; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const symb = board[i][j];

            for (const [x, y] of dirs) {
                let k = 1;
                while (
                    i + k * x < 7 &&
                    j + k * y < board[i + k * x].length &&
                    j + k * y >= 0 &&
                    board[i + k * x][j + k * y] === symb
                ) {
                    k += 1;
                    if (k === 4) {
                        return symb;
                    }
                }
            }
        }
    }

    if (board.every((col) => col.length === 6)) {
        return -1;
    }

    return 0;
}

function updateBoard(symbol, column) {
    board[column] += symbol;

    const lastEmptyChild = $(`#c${column}`).children(':empty').last();
    lastEmptyChild.append($('<div>', { class : `piece ${ symbol == 'O' ? 'red' : 'yellow'}`}));

    // redraw board
}

function move(symbol, board) {
    // console.logBoard(board);
    return minimax(board, 4, true, symbol)[0]; // only return the column to drop
}

function printBoard(board) {
    let boardStr = "";
    for (let row = 5; row >= 0; row--) {
        for (let col = 0; col < 7; col++) {
            if (board[col].length > row) {
                boardStr += board[col][row] + " ";
            } else {
                boardStr += "/ ";
            }
        }
        boardStr += "\n";
    }
    console.log(boardStr);
}

function isColumnFull(board, column) {
    return board[column].length >= 6;
}

function isTerminalState(board) {
    for (let col of board) {
        if (col.length < 6) {
            return false;
        }
    }
    return true;
}

function evaluateBoard(symbol, board) {
    const dirs = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
    ];
    // score for the number of pieces along a 4
    const rewards = [0, 1, 3, 5, 100];
    let goodValue = 0;
    let badValue = 0;

    for (let i = 0; i < BOARD_WIDTH; i++) {
        for (let j = 0; j < BOARD_HEIGHT; j++) {
            for (const [x, y] of dirs) {
                let symbols = 0;
                let badSymbols = 0;
                let k = 0;

                while (i + k * x < BOARD_WIDTH && j + k * y < BOARD_HEIGHT && j + k * y >= 0 && k < 4) {
                    if (j + k * y < board[i + k * x].length) {
                        if (board[i + k * x][j + k * y] === symbol) symbols++;
                        else badSymbols++;
                    }
                    k++;
                }

                goodValue += rewards[symbols];
                badValue += rewards[badSymbols];
            }
        }
    }

    return goodValue - badValue;
}

function evaluateWindow(symbol, window) {
    const oppSymbol = symbol === "O" ? "X" : "O";
    const symbolCount = window.filter((x) => x === symbol).length;
    const oppCount = window.filter((x) => x === oppSymbol).length;
    const emptyCount =  window.filter((x) => x === ' ').length;

    if (symbolCount === 4) return 100; // BIG WIN!!
    if (symbolCount === 3 && emptyCount === 1) return 5; // good
    if (symbolCount === 2 && emptyCount === 2) return 2; // nice
    if (symbolCount === 1 && emptyCount === 3) return 1; // okay
    if (oppCount === 3 && emptyCount === 1) return -10; // BAD - opponent can win
    return 0;
}

function isValidLocation(board, col) {
    return board[col].length !== BOARD_HEIGHT;
}

function getValidLocations(board) {
    const validLocations = [];
    for (let col = 0; col < BOARD_WIDTH; col++) {
        if (isValidLocation(board, col)) {
            validLocations.push(col);
        }
    }
    return validLocations;
}

function minimax(board, depth, maximizingPlayer, symbol) {
    if (depth === 0 || isTerminalState(board)) {
        return [null, evaluateBoard(symbol, board)];
    }

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        let bestCol = null;
        for (let col = 0; col < BOARD_WIDTH; col++) {
            if (!isColumnFull(board, col)) {
                const newBoard = [...board];
                newBoard[col] += symbol;
                const [_, eval] = minimax(newBoard, depth - 1, false, symbol);
                if (eval > maxEval) {
                    maxEval = eval;
                    bestCol = col;
                }
            }
        }
        return [bestCol, maxEval];
    } else {
        let minEval = Infinity;
        let bestCol = null;
        for (let col = 0; col < BOARD_WIDTH; col++) {
            if (!isColumnFull(board, col)) {
                const newBoard = [...board];
                newBoard[col] += symbol === "O" ? "X" : "O";
                const [_, eval] = minimax(newBoard, depth - 1, true, symbol);
                if (eval < minEval) {
                    minEval = eval;
                    bestCol = col;
                }
            }
        }
        return [bestCol, minEval];
    }
}

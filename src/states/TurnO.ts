import { promptBoolean } from '../prompt';
import { TicTacToeGame } from '../TicTacToeGame';
import { TicTacToeState } from '../TicTacToeState';

export class TurnOState implements TicTacToeState {
    onEnable(game: TicTacToeGame): Promise<void> | void {
        game.printFields()
        console.info("Player O | Enter row and column: ('<R>,<C>')")
        game.handleInput()
    }

    selectField(game: TicTacToeGame, row: number, col: number): Promise<void> | void {
        if (game.getField(row, col) != " ") {
            console.info("Player O | The field is already taken")
            game.handleInput()
            return
        }
        game.setField(row, col, "O")
        if (game.getWinner() || game.isFull()) {
            game.setState(TicTacToeGame.endState)
        } else {
            game.setState(TicTacToeGame.turnXState)
        }
    }

    async exit(game: TicTacToeGame): Promise<void> {
        if (!await promptBoolean("Player O | Do you really want to quit the current game?")) {
            console.info("Player O | Enter row and column: ('<R>,<C>')")
            game.handleInput()
            return
        }
        console.info("Player O | Exit game...")
        process.exit(0)
    }

    async restart(game: TicTacToeGame): Promise<void> {
        if (!await promptBoolean("Player O | Do you really want to restart this game?")) {
            console.info("Player O | Enter row and column: ('<R>,<C>')")
            game.handleInput()
            return
        }
        console.info("Player O | Restart game...")
        game.setState(TicTacToeGame.splashState)
    }

    async surrender(game: TicTacToeGame): Promise<void> {
        if (!await promptBoolean("Player O | Do you really want to surrender?")) {
            console.info("Player O | Enter row and column: ('<R>,<C>')")
            game.handleInput()
            return
        }
        console.info("Player O | Surrender game...")
        game.setWinner("X")
        game.setState(TicTacToeGame.endState)
    }

    enter(game: TicTacToeGame): Promise<void> | void {
        game.setState(TicTacToeGame.turnXState)
    }
}
import { promptBoolean } from "../prompt";
import { TicTacToeGame } from "../TicTacToeGame"
import { TicTacToeState } from '../TicTacToeState';

export class TurnXState implements TicTacToeState {
    onEnable(game: TicTacToeGame): Promise<void> | void {
        game.printFields()
        console.info("Player X | Enter row and column: ('<R>,<C>')")
        game.handleInput()
    }

    selectField(game: TicTacToeGame, row: number, col: number): Promise<void> | void {
        if (game.getField(row, col) != " ") {
            console.info("Player O | The field is already taken")
            game.handleInput()
            return
        }
        game.setField(row, col, "X")
        if (game.getWinner() || game.isFull()) {
            game.setState(TicTacToeGame.endState)
        } else {
            game.setState(TicTacToeGame.turnOState)
        }
    }

    async exit(game: TicTacToeGame): Promise<void> {
        if (!await promptBoolean("Player X | Do you really want to quit the current game?")) {
            console.info("Player X | Enter row and column: ('<R>,<C>')")
            game.handleInput()
            return
        }
        console.info("Player X | Exit game...")
        process.exit(0)
    }

    async restart(game: TicTacToeGame): Promise<void> {
        if (!await promptBoolean("Player O | Do you really want to restart this game?")) {
            console.info("Player X | Enter row and column: ('<R>,<C>')")
            game.handleInput()
            return
        }
        console.info("Player X | Restart game...")
        game.setState(TicTacToeGame.splashState)
    }

    async surrender(game: TicTacToeGame): Promise<void> {
        if (!await promptBoolean("Player X | Do you really want to surrender?")) {
            console.info("Player X | Enter row and column: ('<R>,<C>')")
            game.handleInput()
            return
        }
        console.info("Player X | Surrender game...")
        game.setWinner("O")
        game.setState(TicTacToeGame.endState)
    }

    enter(game: TicTacToeGame): Promise<void> | void {
        game.setState(TicTacToeGame.turnOState)
    }
}

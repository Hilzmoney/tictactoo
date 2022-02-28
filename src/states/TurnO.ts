import { promptBoolean } from '../prompt';
import { TicTacToeGame } from '../TicTacToeGame';
import { TicTacToeState } from '../TicTacToeState';

export class TurnOState implements TicTacToeState {
    onEnable(game: TicTacToeGame): Promise<void> | void {
        game.printFields()
        console.log("Player O | Enter row and column: ('<R>,<C>')")
        game.handleInput()
    }

    selectField(game: TicTacToeGame, row: number, col: number): Promise<void> | void {
        game.setField(row, col, "O")
        if (game.getWinner() || game.isFull()) {
            game.setState(TicTacToeGame.endState)
        } else {
            game.setState(TicTacToeGame.turnXState)
        }
    }

    async exit(game: TicTacToeGame): Promise<void> {
        if (!await promptBoolean("Player O | Do you really want to quit the current game?")) {
            return
        }
        console.log("Player O | Exit game...")
        process.exit(0)
    }

    async restart(game: TicTacToeGame): Promise<void> {
        if (!await promptBoolean("Player O | Do you really want to restart this game?")) {
            return
        }
        console.log("Player O | Restart game...")
        game.setState(TicTacToeGame.splashState)
    }

    async surrender(game: TicTacToeGame): Promise<void> {
        if (!await promptBoolean("Player O | Do you really want to surrender?")) {
            return
        }
        console.log("Player O | Surrender game...")
        game.setWinner("X")
        game.setState(TicTacToeGame.endState)
    }

    enter(game: TicTacToeGame): Promise<void> | void {
        game.setState(TicTacToeGame.turnXState)
    }
}
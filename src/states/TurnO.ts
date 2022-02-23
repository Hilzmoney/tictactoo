import { TicTacToeGame, TicTacToeState } from "../TicTacToeGame"
import { prompt, promptNumberBetween } from "../prompt"

export class TurnOState implements TicTacToeState {
    handleTurnX(game: TicTacToeGame): void {
        throw new Error("Try to handle Player Y with but its not your turn")
    }

    async handleTurnO(game: TicTacToeGame): Promise<void> {
        game.printFields()
        let row: number
        let col: number
        while (true) {
            row = -1 + await promptNumberBetween("TicTacToe| Player O| Enter row: ", 1, 3, "The value must be between 1 and 3!")
            col = -1 + await promptNumberBetween("TicTacToe| Player O| Enter column: ", 1, 3, "The value must be between 1 and 3!")
            if (game.getField(row, col) == " ") {
                break
            }
            const input = await prompt("The field is already taken!\nEnter to continue (enter 'quit' to exit)")
            if (input.toLowerCase().includes("quit")) {
                process.exit(0)
            }
        }

        game.setField(row, col, "O")
        if (game.isOver()) {
            game.setState(TicTacToeGame.endState)
            game.handleEnd()
            return
        }
        game.setState(TicTacToeGame.turnXState)
        game.handleTurnX()
    }

    handleEnd(game: TicTacToeGame): void {
        throw new Error("Can't end game in running TurnO state")
    }

    handleSplash(game: TicTacToeGame): void {
        throw new Error("Game is already in running")
    }
}
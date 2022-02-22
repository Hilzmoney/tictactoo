import { TicTacToeGame, TicTacToeState } from "../TicTacToeGame"
import { prompt } from "../prompt"

const theWinnerIsAsciiArt: string[] = [
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "━┏┓━┏┓━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "┏┛┗┓┃┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "┗┓┏┛┃┗━┓┏━━┓━━┏┓┏┓┏┓┏┓┏━┓━┏━┓━┏━━┓┏━┓━━┏┓┏━━┓━",
    "━┃┃━┃┏┓┃┃┏┓┃━━┃┗┛┗┛┃┣┫┃┏┓┓┃┏┓┓┃┏┓┃┃┏┛━━┣┫┃━━┫━",
    "━┃┗┓┃┃┃┃┃┃━┫━━┗┓┏┓┏┛┃┃┃┃┃┃┃┃┃┃┃┃━┫┃┃━━━┃┃┣━━┃━",
    "━┗━┛┗┛┗┛┗━━┛━━━┗┛┗┛━┗┛┗┛┗┛┗┛┗┛┗━━┛┗┛━━━┗┛┗━━┛━",
]

const playerXWonAsciiArt = [
    "━┏┓━━━━━━━━┏┓━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┏┓━",
    "━┃┃━━━━━━━━┃┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┃┃━",
    "━┃┃━━━━┏━━┓┃┃━┏━━┓━┏┓━┏┓┏━━┓┏━┓━━━━┏┓┏┓━━━━┃┃━",
    "━┗┛━━━━┃┏┓┃┃┃━┗━┓┃━┃┃━┃┃┃┏┓┃┃┏┛━━━━┗╋╋┛━━━━┗┛━",
    "━┏┓━━━━┃┗┛┃┃┗┓┃┗┛┗┓┃┗━┛┃┃┃━┫┃┃━━━━━┏╋╋┓━━━━┏┓━",
    "━┗┛━━━━┃┏━┛┗━┛┗━━━┛┗━┓┏┛┗━━┛┗┛━━━━━┗┛┗┛━━━━┗┛━",
    "━━━━━━━┃┃━━━━━━━━━━┏━┛┃━━━━━━━━━━━━━━━━━━━━━━━",
    "━━━━━━━┗┛━━━━━━━━━━┗━━┛━━━━━━━━━━━━━━━━━━━━━━━",
]

const playerYWonAsciiArt = [
    "━┏┓━━━━━━━━┏┓━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┏┓━",
    "━┃┃━━━━━━━━┃┃━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┃┃━",
    "━┃┃━━━━┏━━┓┃┃━┏━━┓━┏┓━┏┓┏━━┓┏━┓━━━━┏━━┓━━━━┃┃━",
    "━┗┛━━━━┃┏┓┃┃┃━┗━┓┃━┃┃━┃┃┃┏┓┃┃┏┛━━━━┃┏┓┃━━━━┗┛━",
    "━┏┓━━━━┃┗┛┃┃┗┓┃┗┛┗┓┃┗━┛┃┃┃━┫┃┃━━━━━┃┗┛┃━━━━┏┓━",
    "━┗┛━━━━┃┏━┛┗━┛┗━━━┛┗━┓┏┛┗━━┛┗┛━━━━━┗━━┛━━━━┗┛━",
    "━━━━━━━┃┃━━━━━━━━━━┏━┛┃━━━━━━━━━━━━━━━━━━━━━━━",
    "━━━━━━━┗┛━━━━━━━━━━┗━━┛━━━━━━━━━━━━━━━━━━━━━━━",
]

export class EndState implements TicTacToeState {
    handleTurnX(game: TicTacToeGame): void {
        throw new Error("Game is not started")
    }

    handleTurnO(game: TicTacToeGame): void {
        throw new Error("Game is not started")
    }

    async handleEnd(game: TicTacToeGame): Promise<void> {
        game.printFields()
        const winner = game.getWinner()
        if (!winner) {
            if (game.isFull()) {
                console.log("TIE! No winner!")
            } else {
                throw new Error("Game end state but board is not full")
            }
        }
        if (winner === "X") {
            console.log(theWinnerIsAsciiArt.join("\n"))
            console.log(playerXWonAsciiArt.join("\n"))
        } else if (winner === "O") {
            console.log(theWinnerIsAsciiArt.join("\n"))
            console.log(playerYWonAsciiArt.join("\n"))
        }
        await prompt("TicTacToe| Press enter key to start the game")
        game.clear()
        game.setState(TicTacToeGame.splashState)
        game.handleSplash()
    }

    handleSplash(game: TicTacToeGame): void {
        throw new Error("Game is not started")
    }
}